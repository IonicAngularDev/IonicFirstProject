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
import { CartPage } from './../pages/cart/cart';
import { CheckoutPage } from './../pages/checkout/checkout';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HttpClientModule } from '@angular/common/http';
import { RestapiProvider } from '../providers/restapi/restapi';
import { FootCardComponent } from '../components/foot-card/foot-card';
import { ComponentsModule } from '../components/components.module'
import { CartProvider } from '../providers/cart/cart';

import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginpagePage,
    FrontPage,
    FooterPage,
    ProductPage,
    CartPage,
    CheckoutPage,
    ProductdetailsPage,
    //FootCardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ComponentsModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
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
    CartPage,
    CheckoutPage,
    ProductdetailsPage,
    FootCardComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestapiProvider,
    CartProvider
  ]
})
export class AppModule {}
