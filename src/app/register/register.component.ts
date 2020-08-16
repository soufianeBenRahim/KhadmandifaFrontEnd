import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService} from '../_services/auth.service'
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
// import custom validator to validate that password and confirm password fields match


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    submitted = false;

    constructor(private formBuilder: FormBuilder,private AuthService: AuthService,private router:Router) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            username:['',Validators.required],
            password:           ['', [Validators.required, Validators.minLength(6)]],
            confirmedPassword:  ['', [Validators.required, Validators.minLength(6)]],
            typeUser: ['', Validators.required],
            gender: ['', Validators.required],
            email: ['', Validators.required]

        }, {
           // validator: MustMatch('password', 'confirmPassword')
        });
    }

    // convenience getter for easy access to form fields
    getf () { return this.registerForm.controls; }

    onSubmit() {
        if (this.registerForm.invalid) {
            alert('donnees invalides!! :-)');
            return;
        }
        this.submitted = true;
        this.AuthService.register(this.registerForm.value).pipe(first())
        .subscribe(
            data => {

                this.router.navigate(['/login']);
            },
            error => {
                console.log(error.message);
                console.log('erreur');
            });;
        // stop here if form is invalid


        // display form values on success
        alert('SUCCESS!! :-)');
    }

    onReset() {
        this.submitted = false;
        this.registerForm.reset();
    }
}