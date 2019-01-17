import { LoginpagePage } from './../pages/loginpage/loginpage';
import { FrontPage } from './../pages/front/front';
import { Component, ViewChild } from '@angular/core';
import { Events, Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//import { HomePage } from '../pages/home/home';
//import { ListPage } from '../pages/list/list';
import { ProductPage } from '../pages/product/product';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  //@ViewChild(NavController) navctrl: NavController;
  menuclick: boolean = true;
  menuclick2: boolean = false;
  rootPage: any = FrontPage;
  uemail: string;
  userName1: string;
  pages: Array<{title: string, component: any, name2: string}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public events: Events) {
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

    //this.uname = this.navParams.get('param1');
    this.events.subscribe('user:created', (data) => { // update from login
      //console.log(data);
      //this.uemail = data.email;
      this.userName1 = data;
      this.menuclick2 = true;
      this.menuclick = false;
 });

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

  loginpage2()
  {
    this.nav.push(LoginpagePage);
    //this.uname = this.navParams.get('param1');
  }

  logoutClicked() {
    console.log("Logout");
    //this.authService.logout();
    this.nav.setRoot(FrontPage);
    this.userName1 = null;
    this.menuclick2 = false;
    this.menuclick = true;
  }

}
