import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AcessoComponent } from './components/acesso/acesso.component';
import { BannerComponent } from './components/acesso/banner/banner.component';
import { CadastroComponent } from './components/acesso/cadastro/cadastro.component';
import { LoginComponent } from './components/acesso/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AddPostComponent } from './components/home/add-post/add-post.component';
import { PostsComponent } from './components/home/posts/posts.component';
import { AppRoutingModule } from './app-routing.module';
import {ProgressoService} from './services/progresso.service';
import {AuthService} from './services/auth.service';
import {DatabaseService} from './services/database.service';
import {AuthGuard} from './guards/auth.guard';
import {DialogModule} from 'primeng/dialog'
import {ButtonModule} from 'primeng/button'

@NgModule({
  declarations: [
    AppComponent,
    AcessoComponent,
    BannerComponent,
    CadastroComponent,
    LoginComponent,
    HomeComponent,
    AddPostComponent,
    PostsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    DialogModule,
    ButtonModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    DatabaseService,
    ProgressoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
