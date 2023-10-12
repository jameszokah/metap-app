import * as mediasoup from 'mediasoup';
import Logger from '../logger/Logger';
import type { AppData, Producer, Router, Transport, Worker } from 'mediasoup/node/lib/types';
import { config } from '../config/config';

export declare interface MediaAppData extends AppData {

    worker?: Map<string, any> | mediasoup.types.Worker<MediaAppData>;
    routers?: Map<string, any>;
    transports?: Map<string, any>;
    producers?: Map<string, any>;
    consumers?: Map<string, any>;
    dataProducers?: Map<string, any>;
    dataConsumers?: Map<string, any>;

}

/**
 * Launch as many mediasoup Workers as given in the configuration file.
 */
export async function runMediasoupWorkers(mediasoupWorkers: Map<number, any>) {

    const logger = new Logger()
	mediasoup.observer.on('newworker', (worker: Worker<MediaAppData>) =>
	{
		worker.appData.routers = new Map();
		worker.appData.transports = new Map();
		worker.appData.producers = new Map();
		worker.appData.consumers = new Map();
		worker.appData.dataProducers = new Map();
		worker.appData.dataConsumers = new Map();

		worker.observer.on('close', () =>
		{
			// not needed as we have 'died' listiner below
			logger.debug('worker closed [worker.pid:%d]', worker.pid);
		});

		worker.observer.on('newrouter', (router: Router<MediaAppData>) =>
		{
			router.appData.transports = new Map();
			router.appData.producers = new Map();
			router.appData.consumers = new Map();
			router.appData.dataProducers = new Map();
			router.appData.dataConsumers = new Map();
			router.appData.worker = worker;
			worker.appData.routers.set(router.id, router);

			router.observer.on('close', () =>
			{
				worker.appData.routers.delete(router.id);
			});

			router.observer.on('newtransport', (transport: Transport<MediaAppData>) =>
			{
				transport.appData.producers = new Map();
				transport.appData.consumers = new Map();
				transport.appData.dataProducers = new Map();
				transport.appData.dataConsumers = new Map();
				transport.appData.router = router;
				router.appData.transports.set(transport.id, transport);

				transport.observer.on('close', () =>
				{
					router.appData.transports.delete(transport.id);
				});

				transport.observer.on('newproducer', (producer: Producer<MediaAppData>) =>
				{
					producer.appData.transport = transport;
					transport.appData.producers.set(producer.id, producer);
					router.appData.producers.set(producer.id, producer);
					worker.appData.producers.set(producer.id, producer);

					producer.observer.on('close', () =>
					{
						transport.appData.producers.delete(producer.id);
						router.appData.producers.delete(producer.id);
						worker.appData.producers.delete(producer.id);
					});
				});

				transport.observer.on('newconsumer', (consumer) =>
				{
					consumer.appData.transport = transport;
					transport.appData.consumers.set(consumer.id, consumer);
					router.appData.consumers.set(consumer.id, consumer);
					worker.appData.consumers.set(consumer.id, consumer);

					consumer.observer.on('close', () =>
					{
						transport.appData.consumers.delete(consumer.id);
						router.appData.consumers.delete(consumer.id);
						worker.appData.consumers.delete(consumer.id);
					});
				});

				transport.observer.on('newdataproducer', (dataProducer) =>
				{
					dataProducer.appData.transport = transport;
					transport.appData.dataProducers.set(dataProducer.id, dataProducer);
					router.appData.dataProducers.set(dataProducer.id, dataProducer);
					worker.appData.dataProducers.set(dataProducer.id, dataProducer);

					dataProducer.observer.on('close', () =>
					{
						transport.appData.dataProducers.delete(dataProducer.id);
						router.appData.dataProducers.delete(dataProducer.id);
						worker.appData.dataProducers.delete(dataProducer.id);
					});
				});

				transport.observer.on('newdataconsumer', (dataConsumer) =>
				{
					dataConsumer.appData.transport = transport;
					transport.appData.dataConsumers.set(dataConsumer.id, dataConsumer);
					router.appData.dataConsumers.set(dataConsumer.id, dataConsumer);
					worker.appData.dataConsumers.set(dataConsumer.id, dataConsumer);

					dataConsumer.observer.on('close', () =>
					{
						transport.appData.dataConsumers.delete(dataConsumer.id);
						router.appData.dataConsumers.delete(dataConsumer.id);
						worker.appData.dataConsumers.delete(dataConsumer.id);
					});
				});
			});
		});
	});

	const { numWorkers } = config.mediasoup;

	logger.info('running %d mediasoup Workers...', numWorkers);

	const { logLevel, logTags, rtcMinPort, rtcMaxPort } = config.mediasoup.worker;
	const portInterval = Math.floor((rtcMaxPort - rtcMinPort) / numWorkers);

	for (let i = 0; i < numWorkers; i++)
	{
		const worker = await mediasoup.createWorker(
			{
				logLevel,
				logTags,
				rtcMinPort : rtcMinPort + (i * portInterval),
				rtcMaxPort : i === numWorkers - 1 ? rtcMaxPort
					: rtcMinPort + ((i + 1) * portInterval) - 1
			});

		worker.on('died', () =>
		{
			logger.error(
				'mediasoup Worker died, exiting  in 2 seconds... [pid:%d]', worker.pid);

			setTimeout(() => process.exit(1), 2000);
		});

		mediasoupWorkers.set(worker.pid, worker);
	}
}
