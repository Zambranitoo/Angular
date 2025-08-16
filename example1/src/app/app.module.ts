import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';
import { ProductListComponent } from './product/product-list/product-list.component';
import { FormsModule } from '@angular/forms';
import { StarComponent } from './product/product-list/star/star.component';


import { registerLocaleData } from '@angular/common';
import localEn from '@angular/common/locales/en';
import { ImagePipe } from './shared/image.pipe'

registerLocaleData(localEn, 'en-US');

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    StarComponent,
    ImagePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxBootstrapIconsModule.pick(allIcons),
    FormsModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'en-US'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
