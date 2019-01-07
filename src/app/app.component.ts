import { FrontPage } from './../pages/front/front';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { ProductPage } from '../pages/product/product';
import { LoginpagePage } from '../pages/loginpage/loginpage';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = FrontPage;

  pages: Array<{title: string, component: any, name2: string}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: FrontPage, name2: 'home' },
      { title: 'Product Categories', component: ProductPage, name2: 'basket' },
      { title: 'Merchandise', component: ProductPage, name2: 'man' },
      { title: 'My Orders', component: ProductPage, name2: 'cart' },
      // { title: 'About Us', component: FrontPage, name2: 'people' },
      // { title: 'Blog', component: ProductPage, name2: 'create' },
      // { title: 'Contact Us', component: LoginpagePage, name2: 'contacts' },
      // { title: 'Login/Sign Up', component: LoginpagePage, name2: 'log-in' },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
