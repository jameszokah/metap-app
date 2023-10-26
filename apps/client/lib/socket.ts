import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === 'production' ? undefined : 'https://miniature-trout-5r5qvrqqjgqf746g-3000.app.github.dev'
// 'http://localhost:3000'

// 'https://miniature-trout-5r5qvrqqjgqf746g-4000.app.github.dev/';

export const socket = io(URL!,{

  withCredentials: true,
  reconnectionDelay: 10000, // defaults to 1000
  reconnectionDelayMax: 10000 // defaults to 5000
});
