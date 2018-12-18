import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginpagePage } from '../pages/loginpage/loginpage';
import { FrontPage } from './../pages/front/front';
import { FooterPage } from './../pages/footer/footer';
import { ProductPage } from './../pages/product/product';
import { ProductdetailsPage } from './../pages/productdetails/productdetails';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HttpClientModule } from '@angular/common/http';
import { RestapiProvider } from '../providers/restapi/restapi';
import { FootCardComponent } from '../components/foot-card/foot-card';
import { ComponentsModule } from '../components/components.module'


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginpagePage,
    FrontPage,
    FooterPage,
    ProductPage,
    ProductdetailsPage,
    //FootCardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ComponentsModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginpagePage,
    FrontPage,
    FooterPage,
    ProductPage,
    ProductdetailsPage,
    FootCardComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestapiProvider
  ]
})
export class AppModule {}
