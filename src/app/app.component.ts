import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { IUser } from './models/user/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent {
  public token: string | null;
  public user: IUser | null;

  constructor(private userService: UserService,) {
    this.token = localStorage.getItem('token');
    this.user = null;
  }

  ngOnInit(): void {
    this.userService.get(this.token).subscribe(
      (response) => {
        if (response) {
          this.user = response.user;
        }
      },
      (error) => {
        console.log(error)
      }
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    location.reload();
  }
}
