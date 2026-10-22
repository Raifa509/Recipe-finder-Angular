import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../services/api-service';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  //create a group
  registerForm: FormGroup
  api = inject(ApiService)
  router = inject(Router)
  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      username: ["", [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],

    })

  }

  register() {
    if (this.registerForm.valid) {
      const username = this.registerForm.value.username
      const email = this.registerForm.value.email
      const password = this.registerForm.value.password
      this.api.registerApi({ username, email, password }).subscribe({
        next: (res: any) => {
          alert(`Welcome ${res.username},Please login to explore more!!!`)
          this.router.navigateByUrl('/login')
          this.registerForm.reset()
        },
        error: (reason: any) => {
          alert(reason.error)
          this.registerForm.reset()
        }
      })
    }
    else {
      alert('Invalid')
    }
  }
}
