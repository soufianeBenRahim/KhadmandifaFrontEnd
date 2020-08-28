import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';
import {TokenStorageService} from '../_services/token-storage.service'
import { UserService } from '../_services/user.service';
import { IAppUser } from '../Model/User';


@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';
     username :String = '';

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthService,
        private tockenstorage : TokenStorageService,
        private userService : UserService
    ) { 
        // redirect to home if already logged in
        console.log("constructor tocken  : "+this.tockenstorage.getToken());
        if (this.tockenstorage.getToken()) { 
            console.log(" has tocken : "+this.tockenstorage.getToken());
            authenticationService.sendIsConnectedObservabel();
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        console.log(" on init login  : ");
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.loginForm.value)
            .pipe(first())
            .subscribe(
                data => {
                  let jwt=data.headers.get('Authorization');
                  this.tockenstorage.saveToken(jwt);
                  console.log('data '+data);
                  console.log('user connectee '+this.f.username.value);
                
                  this.userService.getUserByName(this.f.username.value)
                  .subscribe(
                      dataUser => {
                          console.log('user getUserByName '+dataUser);
                          let appuser= dataUser ;
                        this.tockenstorage.saveUser(appuser);
                        console.log('user connectee '+this.f.username.value);
                        console.log('data user '+appuser);
                        this.router.navigate([this.returnUrl]);
                        this.authenticationService.sendIsConnectedObservabel()
                      },
                      error => {
                        this.error = error;
                        this.loading = false;
                        this.authenticationService.clearIsConnectedObservabel()
                      });

                },
                error => {
                    this.error = error;
                    this.loading = false;
                    this.authenticationService.clearIsConnectedObservabel()
                });
            
    }
}


