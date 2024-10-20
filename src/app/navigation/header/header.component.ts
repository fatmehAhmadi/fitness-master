import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuth!: boolean;
  subscription: Subscription | undefined;
  @Output() headerEmitter = new EventEmitter<void>();

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.subscription = this.authService.authChange.subscribe((result) => {
      console.log(result);
      this.isAuth = result;
    });
  }
  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  toolbartoggle() {
    this.headerEmitter.emit();
  }
  onLogout() {
    this.isAuth = false;
    this.authService.logout();
  }
}
