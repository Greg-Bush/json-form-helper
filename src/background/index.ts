import { ExtensionMessage, Message } from '@webext-core/messaging';
import { localExtStorage } from '@webext-core/storage';
import isNil from 'lodash.isnil';
import { Requests, onMessage } from '../messaging';
import { Type } from './types';

async function handler<T extends Type>(message: Message<Requests, T> & ExtensionMessage) {
    const { data, type } = message
    if (!isNil(data)) {
        await localExtStorage.setItem(message.type, data)
    }
    return await localExtStorage.getItem(type);
}

onMessage('resume', handler)
onMessage('error', handler)
