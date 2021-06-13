import { createFeatureSelector, createSelector } from '@ngrx/store'

import { TrainingActions, SET_AVAILABLE_TRAININGS, SET_FINISHED_TRAININGS, START_TRAININGS, STOP_TRAININGS } from './training.action';
import { Excercise } from './excecise.model';
import * as fromRoot from '../app.reducer';

export interface TrainingState {
    availableExercies: Excercise[];
    finishedExercies: Excercise[];
    activeTraining: Excercise;
}

export interface State extends fromRoot.State {
    training: TrainingState
}

const intialState: TrainingState = {
    availableExercies: [],
    finishedExercies: [],
    activeTraining: null
}

export function trainingReducer(state = intialState, action: TrainingActions) {
    switch (action.type) {
        case SET_AVAILABLE_TRAININGS:
            return {
                ...state,
                availableExercies: action.payload
            };
        case SET_FINISHED_TRAININGS:
            return {
                ...state,
                finishedExercies: action.payload
            };
        case START_TRAININGS:
            return {
                ...state,
                activeTraining: { ...state.availableExercies.find(ex => ex.id === action.payload) }
            };
        case STOP_TRAININGS:
            return {
                ...state,
                activeTraining: null
            };
        default: {
            return state;
        }
    }
}

export const geTrainingState = createFeatureSelector<TrainingState>('training');

export const getAvailableExercises = createSelector(geTrainingState, (state: TrainingState) => state.availableExercies);
export const getFinishedExercises = createSelector(geTrainingState, (state: TrainingState) => state.finishedExercies);
export const getActiveTraining = createSelector(geTrainingState, (state: TrainingState) => state.activeTraining);
export const getIsTraining = createSelector(geTrainingState, (state: TrainingState) => state.activeTraining != null);
