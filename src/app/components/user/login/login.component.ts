import { Component, OnInit } from '@angular/core'
import { IUser } from 'src/app/models/user/user.model'
import { UserService } from 'src/app/services/user/user.service'
import { FormGroup, FormControl } from '@angular/forms'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  public status: string | null;
  public token: string | null;
  public loginForm: FormGroup;

  constructor(private userService: UserService, private router: Router) {
    this.status = null;
    this.token = localStorage.getItem('token');
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    });
  }

  ngOnInit(): void {
    if(this.token){
      this.router.navigate(['/']);
    }
  }

  get loginFormControl() {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    const user: IUser = this.loginForm.value
    this.userService.login(user).subscribe(
      (response) => {
        if (response) {
          localStorage.setItem('token', response.token);
          location.reload();
        }

        this.status = 'Estas credenciales no son correctas!';
      },
      (error) => {
        console.log(error)
      }
    );
  }
}
