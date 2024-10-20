import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrl: './sidenav-list.component.css',
})
export class SidenavListComponent implements OnInit, OnDestroy {
  @Output() sidenavEmitter = new EventEmitter<void>();
  isAuth!: boolean;
  subscription: Subscription | undefined;

  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.subscription = this.authService.authChange.subscribe((result) => {
      console.log(result);
      this.isAuth = result;
    });
  }
  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  sidenavbartoggle() {
    this.sidenavEmitter.emit();
  }
  onLogout() {
    this.isAuth = false;
    this.authService.logout();
    this.sidenavbartoggle();
  }
}
