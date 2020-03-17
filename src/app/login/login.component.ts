import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';
import {TokenStorageService} from '../_services/token-storage.service'


@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthService,
        private tockenstorage : TokenStorageService
    ) { 
        // redirect to home if already logged in
        if (this.tockenstorage.getToken()) { 
            authenticationService.sendIsConnectedObservabel();
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
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
                  this.router.navigate([this.returnUrl]);
                  this.authenticationService.sendIsConnectedObservabel()
                },
                error => {
                    this.error = error;
                    this.loading = false;
                    this.authenticationService.clearIsConnectedObservabel()
                });
    }
}


