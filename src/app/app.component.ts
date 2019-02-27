import { LoginpagePage } from './../pages/loginpage/loginpage';
import { FrontPage } from './../pages/front/front';
import { Component, ViewChild } from '@angular/core';
import { Events, Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ProductPage } from './../pages/product/product';
import { MyordersPage } from './../pages/myorders/myorders';
import { ManageaccountPage } from './../pages/manageaccount/manageaccount';
import { AboutPage } from './../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { MerchandisePage } from './../pages/merchandise/merchandise';
import { GalleryPage } from './../pages/gallery/gallery';
import { Storage } from '@ionic/storage';
import { CartPage } from './../pages/cart/cart';
import { SingleproductPage } from './../pages/singleproduct/singleproduct';
import { RestapiProvider } from '../providers/restapi/restapi';
import { WishlistPage } from './../pages/wishlist/wishlist';
import { CartProvider } from "../providers/cart/cart";

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
  finalseaproduct: any = [];
  searchproduct: any = [];
  finalproductsearch: any;
  HasSearch: boolean;
  profileImage = './assets/imgs/hipster-man.jpg';
  userpimage;
  cartLength: number = 0;
  wishLength: number = 0;
  pages: Array<{title: string, component: any, name2: string}>;
  pages1: Array<{title1: string, component: any, name1: string}>;
  constructor(public platform: Platform, public statusBar: StatusBar,
    public splashScreen: SplashScreen, public events: Events,
    private storage: Storage, public restProvider: RestapiProvider, 
    private cartService: CartProvider) {
    this.initializeApp();
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: FrontPage, name2: 'home' },
      { title: 'Product Categories', component: ProductPage, name2: 'basket' },
      { title: 'Merchandise', component: MerchandisePage, name2: 'shirt' },
      { title: 'My Orders', component: MyordersPage, name2: 'cart' },
    ];

    this.pages1 = [
      { title1: 'Manage Account', component: ManageaccountPage, name1: 'settings' },
      { title1: 'About Us', component: AboutPage, name1: 'people' },
      { title1: 'Gallery', component: GalleryPage, name1: 'images' },
      { title1: 'Contact Us', component: ContactPage, name1: 'contacts' },
    ];
    //this.uname = this.navParams.get('param1');
    this.events.subscribe('user:created', (data) => { // update from login
      //console.log(data);
      //this.uemail = data.email;
      this.userName1 = data;
      this.menuclick2 = true;
      this.menuclick = false;
 });

 this.storage.get("NAME").then((val) =>
      {
        if(val)
        {
          this.userName1 = val;
          this.menuclick2 = true;
          this.menuclick = false;
        }
      });

  this.storage.get("IMAGE2").then((val2) =>
      {
        if(val2)
        {
          this.userpimage = val2;
          //console.log(this.userpimage);
          this.profileImage = `http://beegoodhoney.in/uploads/user/${this.userpimage}`;
        }
      });

      this.events.subscribe('userprofile:created', (data) => {
        this.userpimage = data;
        //this.profileImage = this.userpimage;
        this.profileImage = `http://beegoodhoney.in/uploads/user/${this.userpimage}`;
        //this.storage.set("IMAGE2", this.profileImage);
      });

      this.events.subscribe('userprofileup:created', (data) => {
        this.userpimage = data;
        this.profileImage = this.userpimage;
        //this.profileImage = `http://beegoodhoney.in/uploads/user/${this.userpimage}`;
        //this.storage.set("IMAGE2", this.profileImage);
      });
  
      this.cartService.getCart().subscribe(data => {
        //console.log(data.cart);
        this.cartLength = data.cart;
      });    

      this.storage.get("CARTNU").then((valca) =>
      {
        if(valca)
        {
		      this.cartLength = valca;
        }
      });

      this.cartService.getWish().subscribe(data => {
        //console.log(data.wish);
        this.wishLength = data.wish;
      }); 

      this.storage.get("WISHNU").then((valwi) =>
      {
        if(valwi)
        {
		      this.wishLength = valwi;
        }
      });

      this.getsearchproducts();
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
    this.nav.setRoot(LoginpagePage);
    //this.uname = this.navParams.get('param1');
  }

  logoutClicked() {
    //console.log("Logout");
    //this.authService.logout();
    //window.localStorage.removeItem("ID");
    this.storage.remove("ID").then(() => {
      this.userName1 = null;
      this.menuclick2 = false;
      this.menuclick = true;
      this.nav.setRoot(FrontPage);
    });

    this.storage.remove("NAME").then(() => {
      //this.nav.setRoot(FrontPage);
    });

    this.storage.remove("IMAGE2").then(() => {
      //this.nav.setRoot(FrontPage);
    });
    
    this.storage.remove("WISHNU").then(() => {
      this.wishLength = 0;
    });

    this.storage.remove("CARTNU").then(() => {
      //this.wishLength = 0;
      this.cartService.setCart(0);
    });

    this.profileImage = './assets/imgs/hipster-man.jpg';
  }

  aboutpage2()
{
    this.nav.setRoot(AboutPage);
}

contactpage2()
{
    this.nav.setRoot(ContactPage);
}

gallerypage2()
{
    this.nav.setRoot(GalleryPage);
}

frontpage2()
{
    this.nav.setRoot(FrontPage);
}

cardpage2()
{
    this.nav.setRoot(CartPage);
}

wishpage2()
{
    this.nav.setRoot(WishlistPage);
}

hasSearchnot()
{
    this.HasSearch = !this.HasSearch;
}

getsearchproducts()
  {
    this.restProvider.getproductsforsearch()
      .then(data => {
      this.searchproduct = data;
      this.finalseaproduct = this.searchproduct.msg;
      //console.log(this.finalseaproduct);
      });
  }


setSearchProducts(searchbar) {
  this.finalproductsearch = [];

  var query = searchbar.target.value;
  if (query.trim() == '') {
    return;
  }

  this.finalproductsearch = this.finalseaproduct.filter((value)=> {
    if (value.product_name.toLowerCase().indexOf(query.toLowerCase()) > -1) {
      return true;
    }
    return false;
  });
}

showProductDetails(item)
{
   //console.log(item);
   this.nav.setRoot(SingleproductPage,
    {
      product: item
    });
    this.HasSearch = !this.HasSearch;
}
}
