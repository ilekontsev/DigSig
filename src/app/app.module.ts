import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SignatureComponent } from './components/signature/signature.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './shared/components/header/header.component';
import { MaterialModule } from './modules/material/material.module';
import { DialogSignComponent } from './components/dialogs/dialog-sign/dialog-sign.component';
import { DialogCheckComponent } from './components/dialogs/dialog-check/dialog-check.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { FormsModule } from '@angular/forms';
import {  HttpClientModule, HTTP_INTERCEPTORS,  } from '@angular/common/http';
import { AuthInterceptorService } from './interceptors/auth.Interceptor';
import { PublicKeyComponent } from './components/public-key/public-key.component';
import { GenerateKeyComponent } from './components/dialogs/generate-key/generate-key.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    SignatureComponent,
    LoginComponent,
    NotFoundComponent,
    HeaderComponent,
    DialogSignComponent,
    DialogCheckComponent,
    PublicKeyComponent,
    GenerateKeyComponent,
  ],
  imports: [
    NgxDropzoneModule,
    MaterialModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
