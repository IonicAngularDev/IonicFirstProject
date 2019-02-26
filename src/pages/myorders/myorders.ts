import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { RestapiProvider } from '../../providers/restapi/restapi';
import { CancelorderPage } from './../cancelorder/cancelorder';
/**
 * Generated class for the MyordersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-myorders',
  templateUrl: 'myorders.html',
})
export class MyordersPage {
  userhas: boolean = false;
  usernot:  boolean = true;
  userhasorder: boolean = false;
  newuserid: any;
  userord: any;
  m: any = [];
  ordernum: any = [];
  order_id: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private storage: Storage, public restProvider: RestapiProvider,
    public modalCtrl: ModalController, public loadingCtrl: LoadingController) {
    this.GetUsername();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyordersPage');
  }

  public GetUsername(){
    let loader = this.loadingCtrl.create({
      content: "Wait.."
    });
    loader.present();
      this.storage.get("ID").then((val) =>
      {
        if(val)
        {
        this.newuserid = val;
        this.usernot = false;
        this.restProvider.getorderdetails(val)
           .then(data => {
            this.userord = data;
            //console.log(this.userord.msg);
            for(var i in this.userord.msg)
            {
             this.m = this.userord.msg[i].order;

             for(var k in this.m)
             {
              console.log(this.m[k].order_no);
              this.ordernum = this.m[k].order_no;
              this.order_id = this.m[k].id;
             }
            }

            if(this.userord.msg['0'].order.length != 0)
            {
              //console.log(0);
              this.userhasorder = true;
            }
            else
            {
              //console.log(1);
              this.userhas = true;
            }
         });
        }
      });
      loader.dismiss();
  }

 orderform($oid,$upid)
 {
  console.log($oid);
  console.log($upid);
  let profileModal = this.modalCtrl.create(CancelorderPage, {orderno: $oid, orderid: $upid});
  profileModal.onDidDismiss(() => {
  });
  profileModal.present();
 }
}
