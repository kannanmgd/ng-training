import { Action } from "@ngrx/store";
import { Excercise } from "./excecise.model";

export const SET_AVAILABLE_TRAININGS = '[Training] Set Available Training';
export const SET_FINISHED_TRAININGS = '[Auth] Set Finished Training';
export const START_TRAININGS = '[Training] Start Training';
export const STOP_TRAININGS = '[Training] Stop Training';

export class SetAvailableTrainings implements Action {
    readonly type = SET_AVAILABLE_TRAININGS;

    constructor(public payload: Excercise[]) {}
}

export class SetFinishedTrainings implements Action {
    readonly type = SET_FINISHED_TRAININGS;

    constructor(public payload: Excercise[]) {}
}

export class StartTrainings implements Action {
    readonly type = START_TRAININGS;

    constructor(public payload: string) {}
}


export class StopTrainings implements Action {
    readonly type = STOP_TRAININGS;
}

export type TrainingActions = 
SetAvailableTrainings
 | SetFinishedTrainings 
 | StartTrainings
 | StopTrainings;
