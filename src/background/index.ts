import { ExtensionMessage, Message } from '@webext-core/messaging';
import { Requests, onMessage } from '../messaging';
import store from './store';
import { State, Type } from './types';

function handler<T extends Type>(message: Message<Requests, T> & ExtensionMessage) {
    const { data, type } = message
    if (data !== null) {
        store.dispatch({ type: message.type, payload: message.data })
    }
    const state = store.getState() as State
    return state[type]
}

onMessage('resume', handler)
onMessage('error', handler)

onMessage('rehydrated', message => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(true as const)
        }, 1500)
    })
})