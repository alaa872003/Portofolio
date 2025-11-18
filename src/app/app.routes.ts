import { Routes } from '@angular/router';
import { Layout } from './layout/layout';
import { Home } from './layout/home/home';
import { About } from './layout/about/about';
import { ContactUs } from './layout/contact-us/contact-us';
import { Project } from './layout/project/project';
import { Skill } from './layout/skill/skill';
import { NotFound } from './not-found/not-found';
import { Dashboard } from './dashboard/dashboard';
import { DashboardHome } from './dashboard/dashboard-home/dashboard-home';
import { DashboardAbout } from './dashboard/dashboard-about/dashboard-about';
import { DashboardContact } from './dashboard/dashboard-contact/dashboard-contact';
import { DashboardProject } from './dashboard/dashboard-project/dashboard-project';
import { DashboardSkill } from './dashboard/dashboard-skill/dashboard-skill';

export const routes: Routes = [
    {path:'', component:Layout, children:[
 {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'home',component:Home},
    {path:'about',component:About},
    {path:'contact',component:ContactUs},
    {path:'project',component:Project},
    {path:'skill',component:Skill},
   ]},
     {path:"dashboard",component:Dashboard,children:[
         {path:'',redirectTo:'home',pathMatch:'full'},
        {path:'home',component:DashboardHome},
        {path:'about',component:DashboardAbout},
        {path:'contact',component:DashboardContact},
        {path:'project',component:DashboardProject},
        {path:'skill',component:DashboardSkill},
    ]},
   {path:'**', component:NotFound},
];
