import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MaterialModule } from './material.module';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { TrainingComponent } from './training/training.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import {
  MaterialPersianDateAdapter,
  PERSIAN_DATE_FORMATS,
} from './persian-date-adapter';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { HeaderComponent } from './navigation/header/header.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingComponent } from './past-training/past-training.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { DialogComponent } from './current-training/dialog/dialog.component';
import { TranslationPipe } from './translation.pipe';
import { PersianDatePipe } from './persian-date.pipe';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { PersianPaginatior } from './translate-Pagination';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environment/environment';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AuthService } from './auth/auth.service';
import { TrainingService } from './training/training.service';
import { UiService } from './shared/ui.service';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    TrainingComponent,
    SidenavListComponent,
    HeaderComponent,
    NewTrainingComponent,
    PastTrainingComponent,
    CurrentTrainingComponent,
    DialogComponent,
    TranslationPipe,
    PersianDatePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: PersianPaginatior },
    provideClientHydration(),
    provideAnimationsAsync(),
    {
      provide: DateAdapter,
      useClass: MaterialPersianDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: PERSIAN_DATE_FORMATS },
    AuthService,
    TrainingService,
    UiService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
