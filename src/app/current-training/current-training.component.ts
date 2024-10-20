import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { TrainingService } from '../training/training.service';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  interval: any;
  @Output() popupEvent = new EventEmitter();
  constructor(
    public dialog: MatDialog,
    private trainingService: TrainingService
  ) {}

  ngOnInit() {
    this.startOrResume();
  }
  startOrResume() {
    console.log(
      'duration ',
      this.trainingService.getRunningExercise().duration
    );
    const onePercentPerSecond =
      this.trainingService.getRunningExercise().duration / 100;
    console.log('onePercentPerSecond', onePercentPerSecond);

    this.interval = setInterval(() => {
      this.progress += 1;
      if (this.progress >= 100) {
        this.trainingService.compeleteExercise();
        clearInterval(this.interval);
      }
    }, 1000);
  }

  stop() {
    clearInterval(this.interval);
    let openDialog = this.dialog.open(DialogComponent, {
      data: { progress: this.progress },
    });
    openDialog.afterClosed().subscribe((result) => {
      if (result == 'true') {
        this.trainingService.cancelExercise(this.progress);
      } else {
        this.startOrResume();
      }
    });
  }
}
