import { Routes } from '@angular/router';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { AddResultAdminComponent } from './pages/add-result-admin/add-result-admin.component';
import { UpdateResultAdminComponent } from './pages/update-result-admin/update-result-admin.component';
import { DeleteResultAdminComponent } from './pages/delete-result-admin/delete-result-admin.component';
import { ErrorComponent } from './pages/error/error.component';

export const routes: Routes = [
    {
        path:"",
        component:WelcomeComponent
    },
    {
        path:"login",
        component:LoginComponent
    },
    {
        path:"signup",
        component:SignupComponent
    },
    {
        path:"home",
        component:HomeComponent
    },

    {
        path:"add-result",
        component:AddResultAdminComponent
    },
    // app-routing.module.ts
{
  path: 'update-result',
  component: UpdateResultAdminComponent
},
{
  path: 'delete-result',
  component: DeleteResultAdminComponent
},

    {
        path:"**",
        component:ErrorComponent
    }
];
