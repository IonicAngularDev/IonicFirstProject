import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, ModalController } from 'ionic-angular';
import { CartProvider } from '../../providers/cart/cart';
import { Storage } from '@ionic/storage';
import { SingleproductPage } from '../singleproduct/singleproduct';
import { NotifyproductPage } from '../notifyproduct/notifyproduct';
import { RestapiProvider } from '../../providers/restapi/restapi';

@IonicPage()
@Component({
  selector: 'page-productdetails',
  templateUrl: 'productdetails.html',
})
export class ProductdetailsPage {
  detailsp: any = [];
  pdeta: any = [];
  items: Object[] = [];
  itemsInCart: Object[] = [];
  selectProduct: any;
  //heart_clicked: boolean;
  totalPrice: any;
  productCount: number = 1;
  //count: number = 1;
  SelectedSize:any;
  cartItems: any[];
  noproducts: boolean = false;
  nosize: boolean = true;
  isenabled: boolean = false;
  hassizenot: boolean = false;
  outofstockp: boolean;
  uemail2: string;
  //onWishlist:boolean = true;
  hassize:boolean = true;
  responseEdit: any;
  userpro: any;
  uproducts: any;
  public isDisabled: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  private cartService: CartProvider, public toastCtrl: ToastController,
  private storage: Storage, private alertCtrl: AlertController, 
  public modalCtrl: ModalController, public restProvider: RestapiProvider) {
    this.detailsp = this.navParams.get('productdet');
    // this.pdeta.forEach(product => product.count = 1);
    this.pdeta = this.detailsp.msg;
    this.pdeta.forEach(product => product.count = 1);
    //this.pdeta.forEach(product => product.heart_clicked = true);
    //console.log(this.detailsp);
    //console.log(this.detailsp.msg["0"].out_of_stock);
    //console.log(this.detailsp.msg.length);
    if(this.detailsp.msg.length === 0)
    {
      this.noproducts = true;
    }

    if(this.detailsp.msg.length != 0)
    {
      if(this.detailsp.msg["0"].product_size === undefined)
      {
        //console.log(11);
        this.nosize = false;
        this.isenabled = true;
        this.hassize = false;
        this.hassizenot = true;
      }
    }

  //   if(this.detailsp.msg.length != 0)
  //   {
  //   for(var k in this.detailsp.msg)
  //   {
  //     //this.outofstockp[k] = false;
  //     console.log(this.detailsp.msg[k].out_of_stock);
  //     if(this.detailsp.msg[k].out_of_stock === "1")
  //     {
  //       this.outofstockp = true;
  //       this.hassize = false;
  //       this.hassizenot = false;
  //     }
  //   }
  // }

    if (this.navParams.get("productdet")) {
      window.localStorage.setItem('ProductdetailsPage', JSON.stringify(this.navParams.get("productdet")));
    }

    this.storage.get("EMAIL2").then((val) =>
    {
      if(val)
      {
         this.uemail2 = val;
         //console.log(this.uemail2);
      }
    });

  }

  ionViewDidEnter(){
    this.getSingleProduct();
  }

  // valueChanged(event) {
  //   this.isenabled = true;
  // }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductdetailsPage');
    this.selectProduct = this.navParams.get("productdet");
    this.cartService.getCartItems().then((val) => {
      this.cartItems = val;
    })
  }

  getSingleProduct() {
    if (window.localStorage.getItem('productdet') != 'undefined') {
      this.selectProduct = JSON.parse(window.localStorage.getItem('productdet'))
    }
  }
  showDetails(detailsp)
  {
     //console.log(detailsp);
     this.navCtrl.push(SingleproductPage,
      {
        product: detailsp
      });
  }

  addToCart(detailsp) {
    console.log(detailsp);
    var productPrice = this.productCount * parseInt(detailsp.product_actual_price);
    let cartProduct = {
      product_id: detailsp.id,
      name: detailsp.product_name,
      image: detailsp.image,
      count: detailsp.count,
      max_quantity: detailsp.max_quantity,
      //heart_clicked: detailsp.heart_clicked,
      psize: detailsp.SelectedSize,
      disprice: detailsp.product_price,
      discountp: detailsp.discount,
      ditailspro: detailsp.product_details,
      productPrice: this.productCount * parseInt(detailsp.product_actual_price),
      totalPrice: productPrice,
    };
    //console.log(cartProduct);
    //this.presentToast(productdet.product_name);

    this.cartService.addToCart(cartProduct).then((val) => {
      //console.log(val.length);
      this.cartService.setCart(val.length);
      //this.presentToast(cartProduct.name);
    });

  }

addtocartnew(detailsp)
{
this.storage.get("ID").then((val) =>
    {
      if(val)
      { 
        if(detailsp.SelectedSize)
        {
          let usercartnewdetails = {
            user_id: val,
            product_id: detailsp.id,
            size: detailsp.SelectedSize,
          };
          this.restProvider.usercartproducts(usercartnewdetails, 'user_cart/'+detailsp.id+'/'+val+'/'+detailsp.SelectedSize).subscribe((data) => {
            //console.log(data);
            if (data) {
              console.log("One");
              this.restProvider.getusercartproducts(val)
              .then(data => {
             this.userpro = data;
             this.uproducts = this.userpro.msg.ucart_products
             //console.log(this.userpro.msg.ucart_products);
             //console.log(this.userpro.msg.total_cart_products);
             //console.log(this.userpro.msg.total_amt);
             this.cartService.setCart(this.userpro.msg.total_cart_products);
	           });
              this.responseEdit = data;
              console.log(this.responseEdit.msg);
              if (this.responseEdit.status === 'success') {
                this.presentToast(detailsp.product_name);
              }
              else{
                this.presentToasterror();
              }
            }
          });
        }
        else
        {
          let usercartnewdetails = {
            user_id: val,
            product_id: detailsp.id,
          };
          this.restProvider.usercartproducts(usercartnewdetails, 'user_cart/'+detailsp.id+'/'+val).subscribe((data) => {
            //console.log(data);
            if (data) {
              console.log("Two");
              this.restProvider.getusercartproducts(val)
              .then(data => {
             this.userpro = data;
             this.uproducts = this.userpro.msg.ucart_products
             //console.log(this.userpro.msg.ucart_products);
             //console.log(this.userpro.msg.total_cart_products);
             //console.log(this.userpro.msg.total_amt);
             this.cartService.setCart(this.userpro.msg.total_cart_products);
	           });
              this.responseEdit = data;
              console.log(this.responseEdit.msg);
              if (this.responseEdit.status === 'success') {
                this.presentToast(detailsp.product_name);
              }
              else{
                this.presentToasterror();
              }
            }
          });
        }
      }
    });
}
   
  presentToast(name: any) {
    let toast = this.toastCtrl.create({
      message: `${name} has been added to cart`,
      showCloseButton: true,
      closeButtonText: 'OK',
      duration: 1500,
    });

    toast.onDidDismiss(() => {
      //this.navCtrl.push(CartPage);
    });
    toast.present();
  }

  presentToasterror() {
    let toast = this.toastCtrl.create({
      message: `Product Cannot added to cart. Limit Exceeded.`,
      showCloseButton: true,
      closeButtonText: 'OK',
      duration: 1500,
    });

    toast.onDidDismiss(() => {
      //this.navCtrl.push(CartPage);
    });
    toast.present();
  }

  decreaseProductCount(product) {
    if(typeof product.count === 'undefined') {
       product.count = 1;
    }
    if (product.count > 1) {
      product.count--;
    }
  }

  incrementProductCount(product) {
    //console.log(product.max_quantity);
    if(product.max_quantity > product.count)
    {
      if(typeof product.count === 'undefined') {
        product.count = 1;
     }
     product.count++;
    }
    else
    {
      product.count = product.max_quantity;
      this.presentMaxToast();
    }
  }

  presentMaxToast() {
    let toast = this.toastCtrl.create({
      message: `You have reached at the max quantity limit of the product.`,
      showCloseButton: false,
      duration: 2200,
    });

    toast.onDidDismiss(() => {
    });
    toast.present();
  }


  toggleOnWishlist(product){
    this.storage.get("ID").then((val) =>
    {
      if(val)
      {
        if (!product.onWishlist) {
          this.cartService.addToWishlist(product).then(val => {
            this.cartService.setWish(val.length);
            this.presentWishToast(product.product_name);
          });
        } else {
          this.cartService.removeFromWish(product).then(val => {
            this.cartService.setWish(val.length);
            this.presentWishToastRemove(product.product_name);
          });
        }
        product.onWishlist = !product.onWishlist;
      }
      else
      {
        this.presentAlert();
      }
    });
  }

  // toggleOnWishlist1(product){
  //   this.storage.get("ID").then((val) =>
  //   {
  //     if(val)
  //     {
  //       //console.log(this.detailsp.msg["0"].id);

  //       for(let user of this.detailsp.msg) {
  //         console.log(user.id);
  //         if(user.id == product) {
  //             user.onWishlist = true;
  //             this.cartService.addToWishlist(product).then(val => {
  //               this.presentWishToast(product.product_name);
  //             });
  //           }
  //        }
  //     }
  //     else
  //     {
  //       this.presentAlert();
  //     }
  //   });
  // }

  // toggleOnWishlist2(product){
  //   this.storage.get("ID").then((val) =>
  //   {
  //     if(val)
  //     {
  //       for(let user of this.detailsp.msg) {
  //         if(user.id == product) {
  //             user.onWishlist = false;
  //             this.cartService.removeFromWish(product).then(val => {
  //               this.presentWishToastRemove(product.product_name);
  //             });
  //           }
  //        }
  //     }
  //     else
  //     {
  //       this.presentAlert();
  //     }
  //   });
  // }


  presentWishToast(name: any) {
    let toast = this.toastCtrl.create({
      message: `${name} has been added to wishlist`,
      showCloseButton: true,
      closeButtonText: 'OK',
      duration: 2000,
      //dismissOnPageChange: true,
    });

    toast.onDidDismiss(() => {
    });
    toast.present();
    //this.isDisabled = true;

    // setTimeout(() => {
    //   toast.dismiss();
    //   console.log("called dismiss");
    //   this.isDisabled = false;
    // }, 2000);
  }

  presentWishToastRemove(name: any) {
    let toast = this.toastCtrl.create({
      message: `${name} has been removed to wishlist`,
      showCloseButton: true,
      duration: 1100,
      closeButtonText: 'OK'
    });

    toast.onDidDismiss(() => {
      //this.navCtrl.push(WishlistPage);
    });
    toast.present();
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Please Login For Wishlist',
      buttons: ['Dismiss']
    });
    alert.present();
  }

  toggleOnSize(psize){
    psize.onSize = !psize.onSize;
  }
  
  notifymeprod($pnewid)
  {
    //console.log($pnewid)
    this.storage.get("ID").then((val) =>
    {
      if(val)
      {
        console.log(val);
        let profileModal2 = this.modalCtrl.create(NotifyproductPage, {usid: val, proid: $pnewid, usemail: this.uemail2});
        profileModal2.onDidDismiss(() => {
        this.navCtrl.setRoot(ProductdetailsPage, 
          {
            productdet : this.detailsp
          });
      });
      profileModal2.present();
      }
      else
      {
        this.presentAlert2();
      }
    });
  }

  presentAlert2() {
    let alert = this.alertCtrl.create({
      title: 'Please Login For Product Notify',
      buttons: ['Dismiss']
    });
    alert.present();
  }
}
