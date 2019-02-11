import { WishlistPage } from './../pages/wishlist/wishlist';
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
import { MyordersPage } from './../pages/myorders/myorders';
import { ProductdetailsPage } from './../pages/productdetails/productdetails';
import { CartPage } from './../pages/cart/cart';
import { CheckoutPage } from './../pages/checkout/checkout';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RegisterPage } from './../pages/register/register';
import { ForgetpasswordPage } from './../pages/forgetpassword/forgetpassword';
import { ManageaccountPage } from './../pages/manageaccount/manageaccount';
import { AboutPage } from './../pages/about/about';
import { BlogPage } from './../pages/blog/blog';
import { ContactPage } from './../pages/contact/contact';
import { HttpClientModule } from '@angular/common/http';
import { RestapiProvider } from '../providers/restapi/restapi';
import { FootCardComponent } from '../components/foot-card/foot-card';
import { ComponentsModule } from '../components/components.module'
import { CartProvider } from '../providers/cart/cart';
import { IonicStorageModule } from '@ionic/storage';
import { FormsModule } from '@angular/forms';
import { SingleproductPage } from './../pages/singleproduct/singleproduct';
import { MerchandisePage } from './../pages/merchandise/merchandise';
import { GalleryPage } from './../pages/gallery/gallery';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { ShippingPage } from './../pages/shipping/shipping';
import { CancelorderPage } from './../pages/cancelorder/cancelorder';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginpagePage,
    FrontPage,
    FooterPage,
    ProductPage,
    RegisterPage,
    MyordersPage,
    AboutPage,
    WishlistPage,
    ManageaccountPage,
    ForgetpasswordPage,
    BlogPage,
    ContactPage,
    CartPage,
    CheckoutPage,
    ProductdetailsPage,
    SingleproductPage,
    MerchandisePage,
    GalleryPage,
    ShippingPage,
    CancelorderPage
    //FootCardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ComponentsModule,
    FormsModule,
    IonicImageViewerModule,
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
    RegisterPage,
    MyordersPage,
    AboutPage,
    WishlistPage,
    BlogPage,
    ContactPage,
    ManageaccountPage,
    ForgetpasswordPage,
    ProductPage,
    SingleproductPage,
    CartPage,
    CheckoutPage,
    ProductdetailsPage,
    FootCardComponent,
    MerchandisePage,
    GalleryPage,
    ShippingPage,
    CancelorderPage
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
