import { Injectable } from '@angular/core';
import { 
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router 
} from '@angular/router';

import { Logger } from '../logger.service';
import { AuthenticationService } from './authentication.service';

import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

import { AngularFireAuth } from 'angularfire2/auth';
import { NotifyService } from '../notify.service';

const log = new Logger('AuthenticationGuard');

@Injectable()
export class AuthenticationGuard implements CanActivate {

  constructor(private router: Router,
              private auth: AuthenticationService,
              private notify: NotifyService) { }

  canActivate( 
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {

    return this.auth.user.pipe(
      take(1),
      map(user => !!user),
      tap(loggedIn => {
        if (!loggedIn) {
          console.log('access denied');
          log.debug('Not authenticated, redirecting...');
          this.notify.update('You must be logged in!', 'error');
          this.router.navigate(['/login']);
        }
      })
    );
  }

}
