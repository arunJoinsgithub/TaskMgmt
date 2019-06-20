import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppComponent } from './app.component';
import { ProjectComponent } from './project/project.component';
import { TaskComponent } from './task/task.component';
import { LogoffComponent } from './logoff/logoff.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './_guards/auth.guard';
import { GoogleChartComponent } from 'angular-google-charts';
import { MytaskComponent } from './mytask/mytask.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent ,canActivate: [AuthGuard] },
  { path: '', component: LoginComponent },
  { path: 'project', component: ProjectComponent ,canActivate: [AuthGuard] },
  { path: 'task', component: TaskComponent, canActivate: [AuthGuard] } ,
  { path: 'logOff', component:LogoffComponent },
  { path: 'forgetpassword', component:ForgetpasswordComponent } ,
  { path: 'profile', component:ProfileComponent ,canActivate: [AuthGuard] },
  { path: 'profile', component:UserProfileComponent ,canActivate: [AuthGuard] }, 
  { path: 'mytask', component:MytaskComponent } ,
  { path: 'chart', component:GoogleChartComponent }   
  
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
