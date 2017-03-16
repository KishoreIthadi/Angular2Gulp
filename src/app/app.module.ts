import { NgModule, enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './aboutus/aboutus.component';
import { ContactUsComponent } from './contactus/contactus.component';

import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { MainComponent } from './layout/main/maincontent.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/Home', pathMatch: 'full' },
  { path: 'Home', component: HomeComponent },
  { path: 'ContactUs', component: ContactUsComponent },
  { path: 'AboutUs', component: AboutUsComponent },
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full'
  },
];

//enableProdMode();

@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(appRoutes)],
  declarations: [HomeComponent, AppComponent, AboutUsComponent, ContactUsComponent,
    HeaderComponent, FooterComponent, MainComponent],
  bootstrap: [AppComponent]
})

export class AppModule { }