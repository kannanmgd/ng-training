import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UIService } from 'src/app/shared/ui.service';

import { Excercise } from '../excecise.model';
import { TrainingService } from '../training.service';


@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  excercises: Excercise[];
  isLoading = true;
  private exerciseSubvscription: Subscription;
  private loadingSubscription: Subscription
  constructor(
    private _trainingService: TrainingService,
    private uiService: UIService
  ) { }

  ngOnInit(): void {
    this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(isLoading => {
      this.isLoading = isLoading
    })
    this.exerciseSubvscription = this._trainingService.exercisesChanged.subscribe(exercises => {
      this.excercises = exercises;
    });
    this.fetchExercises();
  }

  fetchExercises() {
    this._trainingService.fetchAVailableExcercises()
  }

  onStartTraining(form: NgForm) {
    this._trainingService.startExcercise(form.value.exercise);
  }

  ngOnDestroy() {
    if (this.exerciseSubvscription) {
    this.exerciseSubvscription.unsubscribe()
    }
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
  }

}
