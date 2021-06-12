import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Subject, Subscription } from "rxjs";
import { map } from "rxjs/operators";
import { error } from "selenium-webdriver";
import { UIService } from "../shared/ui.service";

import { Excercise } from "./excecise.model";

@Injectable()
export class TrainingService {
    excerciseChanged = new Subject<Excercise>();
    exercisesChanged = new Subject<Excercise[]>();
    finishedExercisesChanged = new Subject<Excercise[]>();
    private availableExcercise: Excercise[];
    private runningExcercise: Excercise;
    private fbSubs: Subscription[] = []

    constructor(
        private db: AngularFirestore,
        private uiService: UIService
    ) { }

    fetchAVailableExcercises() {
        this.uiService.loadingStateChanged.next(true)
        this.fbSubs.push(this.db
            .collection('availableExercises')
            .snapshotChanges()
            .pipe(map(docArray => {
                // throw (new Error)
                return docArray.map(doc => {
                    return {
                        id: doc.payload.doc.id,
                        ...doc.payload.doc.data() as {}
                    };
                });
            }))
            .subscribe((exercises: Excercise[]) => {
                this.uiService.loadingStateChanged.next(false)
                this.availableExcercise = exercises;
                this.exercisesChanged.next([...this.availableExcercise]);
            },
            error => {
                this.uiService.loadingStateChanged.next(false);
                this.uiService.showSnackbar('Fetching Exercises failed, please try again later', null, 3000);
                this.exercisesChanged.next(null)
            })
        );
    }

    startExcercise(selectedId: string) {
        this.runningExcercise = this.availableExcercise.find(ex => ex.id === selectedId);
        this.excerciseChanged.next({ ...this.runningExcercise })
    }

    completeExercise() {
        this.addDataToDatabase({
            ...this.runningExcercise,
            date: new Date(),
            state: 'completed'
        });
        this.runningExcercise = null;
        this.excerciseChanged.next(null);
    }

    cancelExercise(progress: number) {
        this.addDataToDatabase({
            ...this.runningExcercise,
            duration: this.runningExcercise.duration * (progress / 100),
            calories: this.runningExcercise.calories * (progress / 100),
            date: new Date(),
            state: 'cancelled'
        });
        this.runningExcercise = null;
        this.excerciseChanged.next(null);
    }

    getRunningExercise() {
        return { ...this.runningExcercise }
    }

    fetchCompletedOrCancelledExercises() {
        this.fbSubs.push(this.db.collection('finishedExercises')
            .valueChanges()
            .subscribe((exercises: Excercise[]) => {
                this.finishedExercisesChanged.next(exercises);
            })
        );
    }

    cancelSubbscriptions() {
        this.fbSubs.forEach(sub => sub.unsubscribe());
    }

    private addDataToDatabase(exercise: Excercise) {
        this.db.collection('finishedExercises').add(exercise);
    }
}