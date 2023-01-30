import { PlaceholderDirective } from './../shared/placeholder/placeholder.directive';
import { AuthResponseData, AuthService } from './auth.service';
import { Component, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { AlertComponent } from '../shared/alert/alert.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  private sub: Subscription;
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;

  constructor(private authService: AuthService, private router: Router) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) return;
    this.isLoading = true;

    let authObs: Observable<AuthResponseData>;

    if (this.isLoginMode) {
      authObs = this.authService.login(form.value.email, form.value.password);
    } else {
      authObs = this.authService.singup(form.value.email, form.value.password);
    }

    authObs.subscribe({
      next: (res) => {
        console.log(res);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      error: (errMsg) => {
        this.error = errMsg;
        this.showErrorAlert(errMsg);
        this.isLoading = false;
      },
    });

    form.reset();
  }

  onHandleError() {
    this.error = null;
  }

  private showErrorAlert(message: string) {
    // const alertCmp = new AlertComponent(); not correct
    const hostVwContainerRef = this.alertHost.viewContainerRef;
    hostVwContainerRef.clear();

    const cmpRef = hostVwContainerRef.createComponent(AlertComponent);
    cmpRef.instance.message = message;
    this.sub = cmpRef.instance.close.subscribe(() => {
      this.sub.unsubscribe();
      hostVwContainerRef.clear();
    });
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }
}
