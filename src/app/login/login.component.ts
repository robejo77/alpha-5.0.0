import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Logger, I18nService, AuthenticationService } from '@app/core';

const log = new Logger('Login');

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  version: string = environment.version;
  error: string;
  loginForm: FormGroup;
  isLoading = false;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private i18nService: I18nService,
              private auth: AuthenticationService) {
    this.createForm();
  }

  ngOnInit() { }

  // login() {
  //   this.isLoading = true;
  //   this.auth.login(this.loginForm.value)
  //     .pipe(finalize(() => {
  //       this.loginForm.markAsPristine();
  //       this.isLoading = false;
  //     }))
  //     .subscribe(credentials => {
  //       log.debug(`${credentials.username} successfully logged in`);
  //       this.router.navigate(['/'], { replaceUrl: true });
  //     }, error => {
  //       log.debug(`Login error: ${error}`);
  //       this.error = error;
  //     });
  // }

  /// Social Login


  async signInWithGoogle() {
    await this.auth.googleLogin();
    return await this.afterSignIn();
  }

  private afterSignIn() {
    // Do after login stuff here, such router redirects, toast messages, etc.
    log.debug(`successfully logged in`);
    this.router.navigate(['/'], { replaceUrl: true });
  }



  setLanguage(language: string) {
    this.i18nService.language = language;
  }

  get currentLanguage(): string {
    return this.i18nService.language;
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      remember: true
    });
  }

}
