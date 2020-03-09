import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService} from '../_services/auth.service'
// import custom validator to validate that password and confirm password fields match


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    submitted = false;

    constructor(private formBuilder: FormBuilder,private AuthService: AuthService) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            username:['',Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmedPassword: ['', Validators.required],
        }, {
          //  validator: MustMatch('password', 'confirmPassword')
        });
    }

    // convenience getter for easy access to form fields
    getf () { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;
        this.AuthService.register(this.registerForm.value);
        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        // display form values on success
        alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
    }

    onReset() {
        this.submitted = false;
        this.registerForm.reset();
    }
}