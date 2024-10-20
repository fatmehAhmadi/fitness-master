import { Component, OnInit } from '@angular/core';
import { TrainingService } from './training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrl: './training.component.css',
})
export class TrainingComponent implements OnInit {
  getRunningExercise() {
    throw new Error('Method not implemented.');
  }
  isTrainStart: boolean = false;
  constructor(private trainingService: TrainingService) {}

  ngOnInit() {
    console.log('initialized');

    this.trainingService.exerciseChanged.subscribe((selectedExcer) => {
      console.log('subscribeed');

      if (selectedExcer !== null) {
        console.log(
          'exercise is selected so it can show current training component'
        );

        this.isTrainStart = true;
      } else {
        this.isTrainStart = false;

        console.log(
          'exercise is not selected yet, its showing new-training component'
        );
      }
    });
  }
}
