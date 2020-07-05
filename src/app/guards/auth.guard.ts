import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FlashMessagesService } from 'angular2-flash-messages';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private flashMessage: FlashMessagesService
  ) {}

  canActivate(): Observable<boolean> {
    return this.afAuth.authState
      .pipe(map(auth => {
        if(!auth) {
          this.router.navigate(['/']);
          this.flashMessage.show('You are neither authenticated nor authorized for this action! Please Signin/Register to continue...', {
            cssClass: 'alert-danger', timeout: 5000
          });
          return false;
        }
        else {
          return true;
        }
      }));
  }
}
