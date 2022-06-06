import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from '../../components/user/register/register.component';
import { LoginComponent } from '../../components/user/login/login.component';
import { ModuleWithProviders } from '@angular/compiler/src/core';

const routes: Routes = [
  {
    path: 'user',
    children: [
      { path: 'register', component: RegisterComponent, pathMatch: 'full' },
      { path: 'login', component: LoginComponent, pathMatch: 'full' }
    ]
  }
]

export const userRouting: ModuleWithProviders = RouterModule.forChild(routes);