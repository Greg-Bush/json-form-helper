import { PayloadAction } from '@reduxjs/toolkit';
import { Payload, State, Type } from './types';

const initialState: State = {}

export default function reducer<T extends Type>(state = initialState, { type, payload }: PayloadAction<Payload<T>, T>) {
    return {
        ...state,
        [type]: payload
    }
}