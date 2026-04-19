import { Routes } from '@angular/router';
import { AssignmentListComponent } from './assignment-list/assignment-list.component';

export const routes: Routes = [
   { path: '', redirectTo: '/home', pathMatch: 'full' },
   {path: '/home' , component: AssignmentListComponent}


];
