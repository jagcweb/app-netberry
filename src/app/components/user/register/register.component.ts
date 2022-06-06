import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/models/user/user.model';
import { UserService } from 'src/app/services/user/user.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {
  public status: string | null;

  public registerForm: FormGroup;

  constructor(private userService: UserService, private router: Router) {
    this.status = null;

    this.registerForm = new FormGroup({
      name: new FormControl(''),
      surname: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl('')
    });
  }

  ngOnInit(): void {}

  get registerFormControl() {
    return this.registerForm.controls;
  }

  onSubmit(): void {
    const user: IUser = this.registerForm.value
    this.userService.create(user).subscribe(
      (response) => {
        if (response) {
          this.router.navigate(['/user/login']);
        }

        this.status = 'Error al crear el usuario!';
      },
      (error) => {
        console.log(error)
      }
    );
  }
}
