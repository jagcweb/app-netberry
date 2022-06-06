import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { homeRouting } from './routes/home/home-routes';
import { userRouting } from './routes/user/user-routes';

@NgModule({
  imports: [
    [
      homeRouting,
      userRouting
    ],
    CommonModule
  ],
  exports: [
    RouterModule,
  ],
  declarations: []
})
export class AppRoutingModule {}
