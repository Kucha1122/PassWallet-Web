import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { MainComponent } from './components/main/main.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  { path: '',   redirectTo: '/dashboard', pathMatch: 'full', canActivate: [AuthGuard]},
  { path: 'dashboard', component: MainComponent, pathMatch: 'full',
    children: [
      {path: 'dashboard', component: MainComponent}
    ], canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
