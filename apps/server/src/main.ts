#!/usr/bin/env node

process.title = 'metap server';

/**
 * integrating mediasoup server with a node.js application
 */

/* Please follow mediasoup installation requirements */
/* https://mediasoup.org/documentation/v3/mediasoup/installation/ */
import express, { Request, Response } from 'express'
const app = express()

import https from 'https'
import fs from 'fs'
import path from 'path'
import cors from 'cors'
// const __dirname = import.meta.resolve()

import { Server } from 'socket.io'

import * as mediasoup from 'mediasoup'
import { Transport } from 'mediasoup/node/lib/types';



const devUrl = 'https://miniature-trout-5r5qvrqqjgqf746g-4200.app.github.dev'
const corsOptions ={
  origin: devUrl,
  credentials:true,            //access-control-allow-credentials:true
  // optionSuccessStatus:200

}
app.use(cors())
app.use(express.json())

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
res.setHeader("Access-Control-Allow-Credentials", "true")
next()
})

app.get('/', (req: Request, res: Response) => {

    res.setHeader('Access-Control-Allow-Origin', '*')
    res.json({
      query: req.params
    })
}
)


const PORT = process.env.PORT || 3000;

const [key, cert] = [
    fs.readFileSync('/workspaces/metap-app/apps/server/src/certs/key.pem', 'utf-8'),
    fs.readFileSync('/workspaces/metap-app/apps/server/src/certs/cert.pem', 'utf-8'),
]

// /workspaces/metap-app/apps/server/src/certs/cert.pem

// SSL cert for HTTPS access
const options = {
    key,
    cert,
}

const httpsServer = https.createServer(options, app)
httpsServer.listen(PORT, () => {
    console.log(`listening on port:  https://localhost:${PORT}`);
})

// socket.io server
const io = new Server(httpsServer, {
    cors: {
        origin:
        devUrl,
        // 'https://miniature-trout-5r5qvrqqjgqf746g-4200.app.github.dev',
        // 'http://localhost:4200',

        credentials: true,
        // allowedHeaders: ['Access-Control-Allow-Origin: http://localhost:4200'],
        allowedHeaders: ['Access-Control-Allow-Origin: https://miniature-trout-5r5qvrqqjgqf746g-4200.app.github.dev'],
        // methods: ['GET', 'POST'],

    },
})

io.engine.on("initial_headers", (headers, req) => {
  headers["Access-Control-Allow-Origin"] = "*";
});


io.engine.on("connection_error", (err) => {
  console.log(err.code);     // 3
  console.log(err.message);  // "Bad request"
  console.log(err.context);  // { name: 'TRANSPORT_MISMATCH', transport: 'websocket', previousTransport: 'polling' }
});

// socket.io namespace (could represent a room?)
// const connections = io('/mediasoup')

/**
 * Worker
 * |-> Router(s)
 *     |-> Producer Transport(s)
 *         |-> Producer
 *     |-> Consumer Transport(s)
 *         |-> Consumer
 **/
let worker
const rooms = {} // { roomName1: { Router, rooms: [ sicketId1, ... ] }, ...}
const peers = {} // { socketId1: { roomName1, socket, transports = [id1, id2,] }, producers = [id1, id2,] }, consumers = [id1, id2,], peerDetails }, ...}
let transports = [] // [ { socketId1, roomName1, transport, consumer }, ... ]
let producers = [] // [ { socketId1, roomName1, producer, }, ... ]
let consumers = [] // [ { socketId1, roomName1, consumer, }, ... ]

const createWorker = async() => {
    worker = await mediasoup.createWorker({
        rtcMinPort: 2000,
        rtcMaxPort: 2020,
    })
    console.log(`worker pid ${worker.pid}`)

    worker.on('died', error => {
        // This implies something serious happened, so kill the application
        console.error('mediasoup worker has died')
        setTimeout(() => process.exit(1), 2000) // exit in 2 seconds
    })

    return worker
}

// We create a Worker as soon as our application starts
worker = createWorker()

// This is an Array of RtpCapabilities
// https://mediasoup.org/documentation/v3/mediasoup/rtp-parameters-and-capabilities/#RtpCodecCapability
// list of media codecs supported by mediasoup ...
// https://github.com/versatica/mediasoup/blob/v3/src/supportedRtpCapabilities.ts
const mediaCodecs = [{
        kind: 'audio',
        mimeType: 'audio/opus',
        clockRate: 48000,
        channels: 2,
    },
    {
        kind: 'video',
        mimeType: 'video/VP8',
        clockRate: 90000,
        parameters: {
            'x-google-start-bitrate': 1000,
        },
    },
]

io.on('connection', async socket => {
    console.log(socket.id)
    socket.emit('connection-success', {
        socketId: socket.id,
    })

    const removeItems = (items, socketId, type) => {
        items.forEach(item => {
            if (item.socketId === socket.id) {
                item[type].close()
            }
        })
        items = items.filter(item => item.socketId !== socket.id)

        return items
    }

    socket.on('disconnect', () => {
        // do some cleanup
        console.log('peer disconnected')
        consumers = removeItems(consumers, socket.id, 'consumer')
        producers = removeItems(producers, socket.id, 'producer')
        transports = removeItems(transports, socket.id, 'transport')

        const peer = peers[socket.id]
        const roomName = peer?.roomName || ''
        delete peers[socket.id]

        // remove socket from room
        rooms[roomName] = {
            router: rooms[roomName]?.router,
            peers: rooms[roomName]?.peers.filter(socketId => socketId !== socket.id)
        }
    })

    socket.on('joinRoom', async({ roomName }, callback) => {
        // create Router if it does not exist
        // const router1 = rooms[roomName] && rooms[roomName].get('data').router || await createRoom(roomName, socket.id)
        const router1 = await createRoom(roomName, socket.id)

        peers[socket.id] = {
            socket,
            roomName, // Name for the Router this Peer joined
            transports: [],
            producers: [],
            consumers: [],
            peerDetails: {
                name: '',
                isAdmin: false, // Is this Peer the Admin?
            }
        }

        // get Router RTP Capabilities
        const rtpCapabilities = router1.rtpCapabilities

        // call callback from the client and send back the rtpCapabilities
        callback({ rtpCapabilities })
    })

    const createRoom = async(roomName, socketId) => {
        // worker.createRouter(options)
        // options = { mediaCodecs, appData }
        // mediaCodecs -> defined above
        // appData -> custom application data - we are not supplying any
        // none of the two are required
        let router1
        let peers = []
        if (rooms[roomName]) {
            router1 = rooms[roomName].router
            peers = rooms[roomName].peers || []
        } else {
            router1 = await worker.createRouter({ mediaCodecs, })
        }

        console.log(`Router ID: ${router1.id}`, peers.length)

        rooms[roomName] = {
            router: router1,
            peers: [...peers, socketId],
        }

        return router1
    }

    // socket.on('createRoom', async (callback) => {
    //   if (router === undefined) {
    //     // worker.createRouter(options)
    //     // options = { mediaCodecs, appData }
    //     // mediaCodecs -> defined above
    //     // appData -> custom application data - we are not supplying any
    //     // none of the two are required
    //     router = await worker.createRouter({ mediaCodecs, })
    //     console.log(`Router ID: ${router.id}`)
    //   }

    //   getRtpCapabilities(callback)
    // })

    // const getRtpCapabilities = (callback) => {
    //   const rtpCapabilities = router.rtpCapabilities

    //   callback({ rtpCapabilities })
    // }

    // Client emits a request to create server side Transport
    // We need to differentiate between the producer and consumer transports
    socket.on('createWebRtcTransport', async({ consumer }, callback) => {
        // get Room Name from Peer's properties
        const roomName = peers[socket.id].roomName

        // get Router (Room) object this peer is in based on RoomName
        const router = rooms[roomName].router


        await createWebRtcTransport(router).then(
            (transport: Transport) => {
                callback({
                    params: {
                        id: transport.id,
                        // iceParameters: transport.iceParameters,
                        // iceCandidates: transport.iceCandidates,
                        // dtlsParameters: transport.dtlsParameters,
                    }
                })

                // add transport to Peer's properties
                addTransport(transport, roomName, consumer)
            },
            error => {
                console.log(error)
            })
    })

    const addTransport = (transport, roomName, consumer) => {

        transports = [
            ...transports,
            { socketId: socket.id, transport, roomName, consumer, }
        ]

        peers[socket.id] = {
            ...peers[socket.id],
            transports: [
                ...peers[socket.id].transports,
                transport.id,
            ]
        }
    }

    const addProducer = (producer, roomName) => {
        producers = [
            ...producers,
            { socketId: socket.id, producer, roomName, }
        ]

        peers[socket.id] = {
            ...peers[socket.id],
            producers: [
                ...peers[socket.id].producers,
                producer.id,
            ]
        }
    }

    const addConsumer = (consumer, roomName) => {
        // add the consumer to the consumers list
        consumers = [
            ...consumers,
            { socketId: socket.id, consumer, roomName, }
        ]

        // add the consumer id to the peers list
        peers[socket.id] = {
            ...peers[socket.id],
            consumers: [
                ...peers[socket.id].consumers,
                consumer.id,
            ]
        }
    }

    socket.on('getProducers', callback => {
        //return all producer transports
        const { roomName } = peers[socket.id]

        let producerList = []
        producers.forEach(producerData => {
            if (producerData.socketId !== socket.id && producerData.roomName === roomName) {
                producerList = [...producerList, producerData.producer.id]
            }
        })

        // return the producer list back to the client
        callback(producerList)
    })

    const informConsumers = (roomName, socketId, id) => {
        console.log(`just joined, id ${id} ${roomName}, ${socketId}`)
            // A new producer just joined
            // let all consumers to consume this producer
        producers.forEach(producerData => {
            if (producerData.socketId !== socketId && producerData.roomName === roomName) {
                const producerSocket = peers[producerData.socketId].socket
                    // use socket to send producer id to producer
                producerSocket.emit('new-producer', { producerId: id })
            }
        })
    }

    const getTransport = (socketId) => {
        const [producerTransport] = transports.filter(transport => transport.socketId === socketId && !transport.consumer)
        return producerTransport.transport
    }

    // see client's socket.emit('transport-connect', ...)
    socket.on('transport-connect', ({ dtlsParameters }) => {
        console.log('DTLS PARAMS... ', { dtlsParameters })

        getTransport(socket.id).connect({ dtlsParameters })
    })

    // see client's socket.emit('transport-produce', ...)
    socket.on('transport-produce', async({ kind, rtpParameters, appData }, callback) => {
        // call produce based on the prameters from the client
        const producer = await getTransport(socket.id).produce({
            kind,
            rtpParameters,
        })

        // add producer to the producers array
        const { roomName } = peers[socket.id]

        addProducer(producer, roomName)

        informConsumers(roomName, socket.id, producer.id)

        console.log('Producer ID: ', producer.id, producer.kind)

        producer.on('transportclose', () => {
            console.log('transport for this producer closed ')
            producer.close()
        })

        // Send back to the client the Producer's id
        callback({
            id: producer.id,
            producersExist: producers.length > 1 ? true : false
        })
    })

    // see client's socket.emit('transport-recv-connect', ...)
    socket.on('transport-recv-connect', async({ dtlsParameters, serverConsumerTransportId }) => {
        console.log(`DTLS PARAMS: ${dtlsParameters}`)
        const consumerTransport = transports.find(transportData => (
            transportData.consumer && transportData.transport.id == serverConsumerTransportId
        )).transport
        await consumerTransport.connect({ dtlsParameters })
    })

    socket.on('consume', async({ rtpCapabilities, remoteProducerId, serverConsumerTransportId }, callback) => {
        try {

            const { roomName } = peers[socket.id]
            const router = rooms[roomName].router
            const consumerTransport = transports.find(transportData => (
                transportData.consumer && transportData.transport.id == serverConsumerTransportId
            )).transport

            // check if the router can consume the specified producer
            if (router.canConsume({
                    producerId: remoteProducerId,
                    rtpCapabilities
                })) {
                // transport can now consume and return a consumer
                const consumer = await consumerTransport.consume({
                    producerId: remoteProducerId,
                    rtpCapabilities,
                    paused: true,
                })

                consumer.on('transportclose', () => {
                    console.log('transport close from consumer')
                })

                consumer.on('producerclose', () => {
                    console.log('producer of consumer closed')
                    socket.emit('producer-closed', { remoteProducerId })

                    consumerTransport.close([])
                    transports = transports.filter(transportData => transportData.transport.id !== consumerTransport.id)
                    consumer.close()
                    consumers = consumers.filter(consumerData => consumerData.consumer.id !== consumer.id)
                })

                addConsumer(consumer, roomName)

                // from the consumer extract the following params
                // to send back to the Client
                const params = {
                    id: consumer.id,
                    producerId: remoteProducerId,
                    kind: consumer.kind,
                    rtpParameters: consumer.rtpParameters,
                    serverConsumerId: consumer.id,
                }

                // send the parameters to the client
                callback({ params })
            }
        } catch (error) {
            console.log(error.message)
            callback({
                params: {
                    error: error
                }
            })
        }
    })

    socket.on('consumer-resume', async({ serverConsumerId }) => {
        console.log('consumer resume')
        const { consumer } = consumers.find(consumerData => consumerData.consumer.id === serverConsumerId)
        await consumer.resume()
    })
})

const createWebRtcTransport = async(router) => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async(resolve, reject) => {
        try {
            // https://mediasoup.org/documentation/v3/mediasoup/api/#WebRtcTransportOptions
            const webRtcTransport_options = {
                listenIps: [{
                    ip: '0.0.0.0', // replace with relevant IP address
                    announcedIp: '10.0.0.115',
                }],
                enableUdp: true,
                enableTcp: true,
                preferUdp: true,
            }

            // https://mediasoup.org/documentation/v3/mediasoup/api/#router-createWebRtcTransport
            const transport = await router.createWebRtcTransport(webRtcTransport_options)
            console.log(`transport id: ${transport.id}`)

            transport.on('dtlsstatechange', dtlsState => {
                if (dtlsState === 'closed') {
                    transport.close()
                }
            })

            transport.on('close', () => {
                console.log('transport closed')
            })

            resolve(transport)

        } catch (error) {
            reject(error)
        }
    })
}
