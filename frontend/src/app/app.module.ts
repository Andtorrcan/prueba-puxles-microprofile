import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HttpConfigInterceptor } from './services/interceptor/interceptor.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SweetAlert2Module.forRoot(),
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
