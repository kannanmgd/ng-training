import { Action } from '@ngrx/store'

import { AuthActions, SET_AUTHENTICATED, SET_UNAUTHENTICATED } from './auth.action';

export interface State {
    isAuthenticated: boolean;
}

const intialState: State = {
    isAuthenticated: false
}

export function authReducer(state = intialState, action: AuthActions) {
    switch(action.type) {
        case SET_AUTHENTICATED:
            return {
                isAuthenticated: true
            };
        case SET_UNAUTHENTICATED:
            return {
                isAuthenticated: false
            };
        default: {
            return state;
        }
    }
}

export const getIsAuth = (state: State) => state.isAuthenticated;