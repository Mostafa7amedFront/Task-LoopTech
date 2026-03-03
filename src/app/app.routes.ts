import { Routes } from '@angular/router';
import { authGuard } from './Core/guards/auth.guard';
import { isAuthGuard } from './Core/guards/is-auth.guard';

export const routes: Routes = [
    {
    path:'' ,
    pathMatch:'full',
    redirectTo:'products'

    },
  {
        path: 'products',
        loadComponent: () => import('./Pages/products/products').then(m => m.Products),
    },
    {
        path: 'home',
        loadComponent: () => import('./Pages/home/home').then(m => m.Home),
    },
    {
        path: 'login',
        loadComponent: () => import('./Pages/Auth/login/login').then(m => m.Login),
    },

    {
        path: '**',
        redirectTo: 'home'
    }
];
