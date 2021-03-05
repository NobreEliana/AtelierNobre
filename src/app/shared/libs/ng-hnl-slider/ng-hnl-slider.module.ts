import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutingModule } from 'src/app/core/router/routing.module';

import { SliderComponent } from './slider/slider.component';
import { BannerComponent } from './banner/banner.component';

@NgModule({
  imports: [
    CommonModule,
    RoutingModule
  ],
  declarations: [SliderComponent, BannerComponent],
  exports: [SliderComponent]
})
export class NgHnlSliderModule { }
