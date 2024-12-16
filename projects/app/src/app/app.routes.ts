import { Routes } from '@angular/router';
import { LoginComponent } from './area/authorization/login/login.component';
import { RegisterComponent } from './area/authorization/register/register.component';

export const routes: Routes = [
//   {
//     path: 'dashboard',
//     component: DashboardComponent,
//     canActivate: [AuthGuard],
//   },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];