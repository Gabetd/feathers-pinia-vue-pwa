import { pinia } from './main'
import { createPiniaClient } from 'feathers-pinia'
import {feathers} from '@feathersjs/feathers'
import authentication from '@feathersjs/authentication-client'
import socketio from '@feathersjs/socketio-client'
import io from 'socket.io-client'

const socket = io(import.meta.env.VITE_FV_URL, {
    transports: ['websocket'],
    reconnectionDelay: import.meta.env.DEV ? 60 : 1000
  })
  // Initialize our Feathers client application through Socket.io
  const feathersClient = feathers()
  feathersClient.configure(socketio(socket))
  feathersClient.configure(authentication())

export const api = createPiniaClient(feathersClient, { 
    pinia, 
    idField: 'id',
    // optional
    ssr: false,
    whitelist: [],
    paramsForServer: [],
    skipGetIfExists: true,
    customSiftOperators: {},
    // setupInstance(data) {
    //   return data
    // },
    // customizeStore(defaultStore) {
    //   return {}
    // },
    services: {},
  })