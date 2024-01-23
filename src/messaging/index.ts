import { ResumeSchema } from '@kurone-kito/jsonresume-types';
import { defineExtensionMessaging } from '@webext-core/messaging';
import { Types } from './types';

export interface RequestsMap {
    resume: ResumeSchema,
    error: unknown
}

export type Requests = {
    [key in Types]: (data: RequestsMap[key] | undefined) => RequestsMap[key];
} & {
    rehydrated(): true;
}

export const { sendMessage, onMessage } = defineExtensionMessaging<Requests>();
