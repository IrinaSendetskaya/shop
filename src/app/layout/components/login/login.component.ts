import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  message: string;
  private unsubscribe: Subject<void> = new Subject();

  constructor(public authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.setMessage();
  }
  ngOnDestroy() {
    console.log('[takeUntil ngOnDestroy]');
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  onLogin() {
    this.message = 'Trying to log in ...';
    this.authService
      .login()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        () => {
          this.setMessage();
          if (this.authService.isLoggedIn) {
            const redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/admin';
            this.router.navigate([redirect]);
          }
        },
        err => console.log(err),
        () => console.log('[takeUntil] complete')
      );
  }

  onLogout() {
    this.authService.logout();
    this.setMessage();
  }

  private setMessage() {
    this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
  }

}
