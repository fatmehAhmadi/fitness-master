import { MatTableDataSource } from '@angular/material/table';
import { TrainingService } from './../training/training.service';
import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Exercise } from '../training/exercise.model';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrl: './past-training.component.css',
})
export class PastTrainingComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = [
    'name',
    'duration',
    'calories',
    'date',
    'state',
  ];
  dataSource = new MatTableDataSource<Exercise>();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  private finishedExSubs: Subscription;

  constructor(private trainingService: TrainingService) {}
  ngOnDestroy() {
    this.finishedExSubs.unsubscribe();
  }

  ngOnInit() {
    this.finishedExSubs = this.trainingService.finishedExChanged.subscribe(
      (exer: Exercise[]) => {
        this.dataSource.data = exer;
      }
    );

    this.trainingService.fetchCompeletedExercise();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
