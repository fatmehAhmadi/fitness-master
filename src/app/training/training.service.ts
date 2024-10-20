import { Injectable } from '@angular/core';
import { Exercise } from './exercise.model';
import { Subject, map } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  private availableExercises: Exercise[] = [];
  private exercise: Exercise;
  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  finishedExChanged = new Subject<Exercise[]>();
  private selectedExercises: Exercise[] = [
    {
      id: 's',
      name: 'string',
      duration: 2,
      calories: 3,
      date: new Date(),
      state: 'completed',
    },
    {
      id: 's',
      name: 'strinnng',
      duration: 2,
      calories: 3,
      date: new Date(),
      state: 'completed',
    },
    {
      id: 'syy',
      name: 'stringgg',
      duration: 2,
      calories: 3,
      date: new Date(),
      state: 'completed',
    },
    {
      id: 'sfgh',
      name: 'sssstring',
      duration: 2,
      calories: 3,
      date: new Date(),
      state: 'completed',
    },
    {
      id: 'ssss',
      name: 'striiiing',
      duration: 2,
      calories: 3,
      date: new Date(),
      state: 'completed',
    },
  ];

  constructor(private db: AngularFirestore) {}

  fetchAvailableExercises() {
    this.db
      .collection('exercises')
      .snapshotChanges()
      .pipe(
        map((docArray) => {
          return docArray.map((doc) => {
            return {
              id: doc.payload.doc.id,
              name: (doc.payload.doc.data() as any).name,
              duration: (doc.payload.doc.data() as any).duration,
              calories: (doc.payload.doc.data() as any).calories,
            };
          });
        })
      )
      .subscribe((exer: Exercise[]) => {
        this.availableExercises = exer;
        this.exercisesChanged.next([...this.availableExercises]);
      });
  }

  startExercise(selectedId: string) {
    console.log('startExercise service');

    this.exercise = this.availableExercises.find((ex) => selectedId === ex.id)!;
    console.log('selected Exercise', { ...this.exercise });
    this.exerciseChanged.next({ ...this.exercise });
    console.log('selected Exercise has been snet to training component.ts');
  }

  getRunningExercise(): any {
    return { ...this.exercise };
  }

  compeleteExercise() {
    this.addDataToDatabase({
      ...this.exercise,
      date: new Date(),
      state: 'completed',
    });
    this.exercise = null;
    this.exerciseChanged.next(null);
    console.log('completed: ', this.selectedExercises);
  }

  cancelExercise(progress: number) {
    this.addDataToDatabase({
      ...this.exercise,
      date: new Date(),
      state: 'canceled',
      duration: this.exercise.duration * (progress / 100),
      calories: this.exercise.calories * (progress / 100),
    });
    this.exercise = null;
    this.exerciseChanged.next(null);
    console.log('canceled: ', this.selectedExercises);
  }

  fetchCompeletedExercise() {
    this.db
      .collection('finishedExercises')
      .valueChanges()
      .subscribe((exer: Exercise[]) => {
        console.log(exer);
        this.finishedExChanged.next([...exer]);
      });
  }

  private addDataToDatabase(finishedExercise: Exercise) {
    this.db.collection('finishedExercises').add(finishedExercise);
  }
}
