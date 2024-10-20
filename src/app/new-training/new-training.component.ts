import {
  Component,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { TrainingService } from '../training/training.service';
import { Exercise } from '../training/exercise.model';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, Subscription, map } from 'rxjs';
import { log } from 'console';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrl: './new-training.component.css',
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  @Output() startTrain = new EventEmitter<void>();
  exercises: Exercise[];
  exercisesSubscription: Subscription;

  constructor(
    private training: TrainingService,
    private db: AngularFirestore
  ) {}

  ngOnInit() {
    console.log('db firebaseeeeeeee');
    this.exercisesSubscription = this.training.exercisesChanged.subscribe(
      (exer) => {
        this.exercises = exer;
      }
    );
    this.training.fetchAvailableExercises();

    console.log(
      this.db
        .collection('exercises')
        .valueChanges()
        .subscribe((changes) => {
          console.log(changes);
        })
    );
  }

  ngOnDestroy() {
    this.exercisesSubscription.unsubscribe();
  }

  starttrain(form: NgForm) {
    console.log(form);
    console.log('seleted', form.value.selectExercise);
    this.training.startExercise(form.value.selectExercise);
  }
}
