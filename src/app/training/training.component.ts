import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { TrainingService } from './training.service';


@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit, OnDestroy {
  ongoingTraining = false;
  exerciseSubscription: Subscription

  constructor(
    private _trainingService: TrainingService
  ) { }

  ngOnInit(): void {
    this.exerciseSubscription = this._trainingService.excerciseChanged.subscribe(exercise => {
      if (exercise) {
        this.ongoingTraining = true
      } else {
        this.ongoingTraining = false;
      }
    })
  }

  ngOnDestroy () {
    if (this.exerciseSubscription) {
      this.exerciseSubscription.unsubscribe();
    }
  }

}
