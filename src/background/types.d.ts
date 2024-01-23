import { Types } from '../messaging/types';
import { RequestsMap } from '../messaging';

export type Type = Types

export type Payload<T extends Type> = RequestsMap[T]

export type State = Partial<{
    [T in Type]: Payload<T>
}>