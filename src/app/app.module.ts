import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

//Components
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/user/register/register.component';
import { LoginComponent } from './components/user/login/login.component';
import { ForgotPasswordComponent } from './components/user/forgot-password/forgot-password.component';
import { VerifyMailComponent } from './components/user/verify-mail/verify-mail.component';
import { HomeComponent } from './components/home/home.component';
import { LogoutComponent } from './components/user/logout/logout.component';

//Material
import { MatMenuModule } from '@angular/material/menu'; 
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { MatIconModule } from '@angular/material/icon';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDialogModule } from '@angular/material/dialog'; 

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ForgotPasswordComponent,
    VerifyMailComponent,
    HomeComponent,
    LogoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    //Material
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    NgbModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
