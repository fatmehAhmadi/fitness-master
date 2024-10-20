import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UiService } from '../../shared/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit, OnDestroy {
  isloading: boolean = false;
  loadingStateSubs: Subscription;

  constructor(private authService: AuthService, private uiService: UiService) {}
  ngOnInit() {
    this.loadingStateSubs = this.uiService.loadingState.subscribe(
      (isloadign) => {
        this.isloading = isloadign;
      }
    );
  }
  onSubmit(form: NgForm) {
    console.log(form);

    this.authService.register({
      email: form.value.email,
      password: form.value.password,
    });
  }
  ngOnDestroy() {
    this.loadingStateSubs.unsubscribe();
  }
}
