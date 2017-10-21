import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import pages
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: []
    },
    {
        path: '**', // For error 404
        component: HomeComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
