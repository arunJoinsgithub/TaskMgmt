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

const routes: Routes = [
  
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', component: LoginComponent },
  { path: 'project', component: ProjectComponent },
  { path: 'task', component: TaskComponent } ,
  { path: 'LogOff', component:LogoffComponent },
  { path: 'forgetpassword', component:ForgetpasswordComponent } ,
  { path: 'profile', component:ProfileComponent }  
  
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
