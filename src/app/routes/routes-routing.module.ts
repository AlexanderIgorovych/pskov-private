import {Routes} from '@angular/router';


const appRoutes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {path: '', loadChildren: 'app/pages/auth/auth.module#AuthModule'},
  {path: 'system', loadChildren: 'app/pages/system/system.module#SystemModule'}
];

export const routing = appRoutes;
