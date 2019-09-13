import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { routing } from './routes-routing.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routing)
  ],
  exports: [RouterModule]
})
export class RoutesModule { }
