import { Routes } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { SourcesComponent } from './views/sources/sources.component';
import { MediaComponent } from './views/media/media.component';
import { TasksComponent } from './views/tasks/tasks.component'
import { AddSourceComponent } from './views/add-source/add-source.component'
import { SourceComponent } from './views/source/source.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'sources',
        component: SourcesComponent
    },
    {
        path: 'sources/add',
        component: AddSourceComponent
    },
    {
        path: 'sources/:id',
        component: SourceComponent
    },
    {
        path: 'media',
        component: MediaComponent
    },
    {
        path: 'tasks',
        component: TasksComponent
    }
];
