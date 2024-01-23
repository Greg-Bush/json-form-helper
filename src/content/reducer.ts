import { Action } from '@reduxjs/toolkit';

const initialState: {
} = {}

export type State = typeof initialState

export default function reducer(state = initialState, action: Action) {
    switch (action.type) {
        default:
            return state
    }
}