import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import {Http, Headers} from '@angular/http';
//import { HttpModule } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import { Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout'

/*
  Generated class for the RestapiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
let apiUrl = 'http://beegoodhoney.in/HoneyApi/';

@Injectable()
export class RestapiProvider {

  token:any;
  //url: string = 'http://192.168.1.10/honeybee/HoneyApi';
  apiUrl2 = 'http://beegoodhoney.in/HoneyApi/getproducts/';
  apiUrl3 = 'http://beegoodhoney.in/HoneyApi/category';
  apiUrl4 = 'http://beegoodhoney.in/HoneyApi/count_sold_item';
  apiUrl5 = 'http://beegoodhoney.in/HoneyApi/Merchand_category';
  apiUrl6 = 'http://beegoodhoney.in/HoneyApi/MerchandiseProducts/';
  apiUrl7 = 'http://beegoodhoney.in/HoneyApi/Userdashboard/';
  apiUrl8 = 'http://beegoodhoney.in/HoneyApi/get_all_products';
  apiUrl11 = apiUrl+'about';
  // apiUrl11 = 'http://192.168.1.3/BGH/HoneyApi/about';
  apiUrl12 = apiUrl+'gallery_images';
  apiUrl13 = apiUrl+'contactus';
  apiUrl14 = apiUrl+'get_all_states';
  apiUrl15 = apiUrl+'get_state_cities/';
  apiUrl16 = apiUrl+'get_address/';
  apiUrl20 = apiUrl+'remove_address/';
  apiUrl22 = apiUrl+'shopping_cart/';
  apiUrl31 = apiUrl+'RemovecartProduct/';
  apiUrl33 = apiUrl+'OrderDetail/';
  apiUrl34 = apiUrl+'OrderDetailById/';
  constructor(public http: HttpClient) {
    console.log('Hello RestapiProvider Provider');
    //this.token = "";
  }


  getUsers(credentials, type) {
    var headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Accept','application/json');
    headers.append('Content-Type','application/json');
    headers.append('Access-Control-Allow-Credentials','true');
    headers.append('Access-Control-Allow-Headers','Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

    let v = new FormData();
    for(var k in credentials)v.append(k,credentials[k]);
    return this.http.post(apiUrl + type, v, {headers: headers});
}

getregisterUsers(credentials, type) {
  var headers = new HttpHeaders();
  headers.append('Access-Control-Allow-Origin' , '*');
  headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
  headers.append('Accept','application/json');
  headers.append('Content-Type','application/json');
  headers.append('Access-Control-Allow-Credentials','true');
  headers.append('Access-Control-Allow-Headers','Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

  //console.log(credentials);
  let v = new FormData();
  for(var k in credentials)v.append(k,credentials[k]);
  return this.http.post(apiUrl + type, v, {headers: headers});
}

getregisterpassword(credentials, type) {
  var headers = new HttpHeaders();
  headers.append('Access-Control-Allow-Origin' , '*');
  headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
  headers.append('Accept','application/json');
  headers.append('Content-Type','application/json');
  headers.append('Access-Control-Allow-Credentials','true');
  headers.append('Access-Control-Allow-Headers','Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

  //console.log(credentials);
  let v = new FormData();
  for(var k in credentials)v.append(k,credentials[k]);
  return this.http.post(apiUrl + type, v, {headers: headers});
}

  getproductdetails($id) {
    //console.log($id);
    return new Promise(resolve => {

      var headers = new HttpHeaders();
      headers.append('Access-Control-Allow-Origin' , '*');
      headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
      headers.append('Accept','application/json');
      headers.append('content-type','application/json');

    this.http.get(this.apiUrl2+$id, {headers: headers}).subscribe(data => {
      resolve(data);},
    err => {
    console.log(err);
    });
    });
  }

  getorderdetails($oid) {
    //console.log($oid);
    return new Promise(resolve => {

      var headers = new HttpHeaders();
      headers.append('Access-Control-Allow-Origin' , '*');
      headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
      headers.append('Accept','application/json');
      headers.append('content-type','application/json');

    this.http.get(this.apiUrl33+$oid, {headers: headers}).subscribe(data => {
      resolve(data);},
    err => {
    console.log(err);
    });
    });
  }

  getmerchproductdetails($imd) {
    //console.log($id);
    return new Promise(resolve => {

      var headers = new HttpHeaders();
      headers.append('Access-Control-Allow-Origin' , '*');
      headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
      headers.append('Accept','application/json');
      headers.append('content-type','application/json');

    this.http.get(this.apiUrl6+$imd, {headers: headers}).subscribe(data => {
      resolve(data);},
    err => {
    console.log(err);
    });
    });
  }

  getproductcategories()
  {
    return new Promise(resolve => {

      var headers = new HttpHeaders();
      headers.append('Access-Control-Allow-Origin' , '*');
      headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
      headers.append('Accept','application/json');
      headers.append('content-type','application/json');

    this.http.get(this.apiUrl3, {headers: headers}).subscribe((data: Response) => {
      resolve(data);},
    err => {
    console.log(err);
    });
    });
  }

  getcount()
  {
    return new Promise(resolve => {

      var headers = new HttpHeaders();
      headers.append('Access-Control-Allow-Origin' , '*');
      headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
      headers.append('Accept','application/json');
      headers.append('content-type','application/json');

    this.http.get(this.apiUrl4, {headers: headers}).subscribe((data: Response) => {
      resolve(data);},
    err => {
    console.log(err);
    });
    });
  }

  getmerchcat()
  {
    return new Promise(resolve => {

      var headers = new HttpHeaders();
      headers.append('Access-Control-Allow-Origin' , '*');
      headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
      headers.append('Accept','application/json');
      headers.append('content-type','application/json');

    this.http.get(this.apiUrl5, {headers: headers}).subscribe((data: Response) => {
      resolve(data);},
    err => {
    console.log(err);
    });
    });
  }

  getproductsforsearch()
  {
    return new Promise(resolve => {

      var headers = new HttpHeaders();
      headers.append('Access-Control-Allow-Origin' , '*');
      headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
      headers.append('Accept','application/json');
      headers.append('content-type','application/json');

    this.http.get(this.apiUrl8, {headers: headers}).subscribe((data: Response) => {
      resolve(data);},
    err => {
    console.log(err);
    });
    });
 }

 getaboutus()
  {
    return new Promise(resolve => {

      var headers = new HttpHeaders();
      headers.append('Access-Control-Allow-Origin' , '*');
      headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
      headers.append('Accept','application/json');
      headers.append('content-type','application/json');

    this.http.get(this.apiUrl11, {headers: headers}).subscribe((data: Response) => {
      resolve(data);},
    err => {
    console.log(err);
    });
    });
 }

 getgallery()
  {
    return new Promise(resolve => {

      var headers = new HttpHeaders();
      headers.append('Access-Control-Allow-Origin' , '*');
      headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
      headers.append('Accept','application/json');
      headers.append('content-type','application/json');

    this.http.get(this.apiUrl12, {headers: headers}).subscribe((data: Response) => {
      resolve(data);},
    err => {
    console.log(err);
    });
    });
 }
 getcontact()
  {
    return new Promise(resolve => {

      var headers = new HttpHeaders();
      headers.append('Access-Control-Allow-Origin' , '*');
      headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
      headers.append('Accept','application/json');
      headers.append('content-type','application/json');

    this.http.get(this.apiUrl13, {headers: headers}).subscribe((data: Response) => {
      resolve(data);},
    err => {
    console.log(err);
    });
    });
 }

 getstates()
  {
    return new Promise(resolve => {

      var headers = new HttpHeaders();
      headers.append('Access-Control-Allow-Origin' , '*');
      headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
      headers.append('Accept','application/json');
      headers.append('content-type','application/json');

    this.http.get(this.apiUrl14, {headers: headers}).subscribe((data: Response) => {
      resolve(data);},
    err => {
    console.log(err);
    });
    });
 }

 getcities($cid)
  {
    return new Promise(resolve => {

      var headers = new HttpHeaders();
      headers.append('Access-Control-Allow-Origin' , '*');
      headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
      headers.append('Accept','application/json');
      headers.append('content-type','application/json');

    this.http.get(this.apiUrl15+$cid, {headers: headers}).subscribe((data: Response) => {
      resolve(data);},
    err => {
    console.log(err);
    });
    });
 }

 getshipping($sid)
  {
    return new Promise(resolve => {

      var headers = new HttpHeaders();
      headers.append('Access-Control-Allow-Origin' , '*');
      headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
      headers.append('Accept','application/json');
      headers.append('content-type','application/json');

    this.http.get(this.apiUrl16+$sid, {headers: headers}).subscribe((data: Response) => {
      resolve(data);},
    err => {
    console.log(err);
    });
    });
 }

 addshipping(credentials, type) {
  var headers = new HttpHeaders();
  headers.append('Access-Control-Allow-Origin' , '*');
  headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
  headers.append('Accept','application/json');
  headers.append('Content-Type','application/json');
  headers.append('Access-Control-Allow-Credentials','true');
  headers.append('Access-Control-Allow-Headers','Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

  //console.log(credentials);
  let v = new FormData();
  for(var k in credentials)v.append(k,credentials[k]);
  return this.http.post(apiUrl + type, v, {headers: headers});
}

editUpshipping(credentials, type) {

  var headers = new HttpHeaders();
  headers.append('Access-Control-Allow-Origin' , '*');
  headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
  headers.append('Accept','application/json');
  headers.append('Content-Type','application/json');
  headers.append('Access-Control-Allow-Credentials','true');
  headers.append('Access-Control-Allow-Headers','Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

  //console.log(credentials);
  //console.log(type);
  let v = new FormData();
  for(var k in credentials)v.append(k,credentials[k]);
  return this.http.post(apiUrl + type, v, {headers: headers});
}

removeshipping($sid)
  {
    return new Promise(resolve => {

      var headers = new HttpHeaders();
      headers.append('Access-Control-Allow-Origin' , '*');
      headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
      headers.append('Accept','application/json');
      headers.append('content-type','application/json');

    this.http.get(this.apiUrl20+$sid, {headers: headers}).subscribe((data: Response) => {
      resolve(data);},
    err => {
    console.log(err);
    });
    });
 }

 cancelorderf(credentials, type) {

  var headers = new HttpHeaders();
  headers.append('Access-Control-Allow-Origin' , '*');
  headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
  headers.append('Accept','application/json');
  headers.append('Content-Type','application/json');
  headers.append('Access-Control-Allow-Credentials','true');
  headers.append('Access-Control-Allow-Headers','Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

  //console.log(credentials);
  //console.log(type);
  let v = new FormData();
  for(var k in credentials)v.append(k,credentials[k]);
  return this.http.post(apiUrl + type, v, {headers: headers});
}

updatepassworduser(credentials, type) {

  var headers = new HttpHeaders();
  headers.append('Access-Control-Allow-Origin' , '*');
  headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
  headers.append('Accept','application/json');
  headers.append('Content-Type','application/json');
  headers.append('Access-Control-Allow-Credentials','true');
  headers.append('Access-Control-Allow-Headers','Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

  //console.log(credentials);
  //console.log(type);
  let v = new FormData();
  for(var k in credentials)v.append(k,credentials[k]);
  return this.http.post(apiUrl + type, v, {headers: headers});
}

updateprofileimg(credentials, type) {

  var headers = new HttpHeaders();
  headers.append('Access-Control-Allow-Origin' , '*');
  headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
  headers.append('Accept','application/json');
  headers.append('Content-Type','application/json');
  headers.append('Access-Control-Allow-Credentials','true');
  headers.append('Access-Control-Allow-Headers','Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

  //console.log(credentials);
  //console.log(type);
  let v = new FormData();
  for(var k in credentials)v.append(k,credentials[k]);
  return this.http.post(apiUrl + type, credentials, {headers: headers});
}

submitcontactform(credentials, type) {

  var headers = new HttpHeaders();
  headers.append('Access-Control-Allow-Origin' , '*');
  headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
  headers.append('Accept','application/json');
  headers.append('Content-Type','application/json');
  headers.append('Access-Control-Allow-Credentials','true');
  headers.append('Access-Control-Allow-Headers','Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

  //console.log(credentials);
  //console.log(type);
  let v = new FormData();
  for(var k in credentials)v.append(k,credentials[k]);
  return this.http.post(apiUrl + type, v, {headers: headers});
}

submitnotifyproductform(credentials, type) {

  var headers = new HttpHeaders();
  headers.append('Access-Control-Allow-Origin' , '*');
  headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
  headers.append('Accept','application/json');
  headers.append('Content-Type','application/json');
  headers.append('Access-Control-Allow-Credentials','true');
  headers.append('Access-Control-Allow-Headers','Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

  //console.log(credentials);
  //console.log(type);
  let v = new FormData();
  for(var k in credentials)v.append(k,credentials[k]);
  return this.http.post(apiUrl + type, v, {headers: headers});
}

sendpaymentdetails(credentials, type) {
  var headers = new HttpHeaders();
  headers.append('Access-Control-Allow-Origin' , '*');
  headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
  headers.append('Accept','application/json');
  headers.append('Content-Type','application/json');
  headers.append('Access-Control-Allow-Credentials','true');
  headers.append('Access-Control-Allow-Headers','Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

  console.log(credentials);
  console.log(type);
  let v = new FormData();
  for(var k in credentials)v.append(k,credentials[k]);
  return this.http.post(apiUrl + type, credentials, {headers: headers});
}

usercartproducts(credentials, type) {
  var headers = new HttpHeaders();
  headers.append('Access-Control-Allow-Origin' , '*');
  headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
  headers.append('Accept','application/json');
  headers.append('Content-Type','application/x-www-form-urlencoded');
  headers.append('Access-Control-Allow-Credentials','true');
  headers.append('Access-Control-Allow-Headers','Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

  console.log(credentials);
  console.log(type);
  let v = new FormData();
  for(var k in credentials)v.append(k,credentials[k]);
  return this.http.post(apiUrl + type, v, {headers: headers});
}

getusercartproducts($upid)
  {
    return new Promise(resolve => {

      var headers = new HttpHeaders();
      headers.append('Access-Control-Allow-Origin' , '*');
      headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
      headers.append('Accept','application/json');
      headers.append('content-type','application/json');

    this.http.get(this.apiUrl22+$upid, {headers: headers}).subscribe((data: Response) => {
      resolve(data);},
    err => {
    console.log(err);
    });
    });
 }

 removeuserproduct($ruid)
  {
    return new Promise(resolve => {

      var headers = new HttpHeaders();
      headers.append('Access-Control-Allow-Origin' , '*');
      headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
      headers.append('Accept','application/json');
      headers.append('content-type','application/json');

    this.http.get(this.apiUrl31+$ruid, {headers: headers}).subscribe((data: Response) => {
      resolve(data);},
    err => {
    console.log(err);
    });
    });
 }

 updatecartproductsquan(credentials, type) {
  var headers = new HttpHeaders();
  headers.append('Access-Control-Allow-Origin' , '*');
  headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
  headers.append('Accept','application/json');
  headers.append('Content-Type','application/x-www-form-urlencoded');
  headers.append('Access-Control-Allow-Credentials','true');
  headers.append('Access-Control-Allow-Headers','Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

  console.log(credentials);
  console.log(type);
  let v = new FormData();
  for(var k in credentials)v.append(k,credentials[k]);
  return this.http.post(apiUrl + type, v, {headers: headers});
}

getorderdetailsnew($roid, $usid)
  {
    return new Promise(resolve => {

      var headers = new HttpHeaders();
      headers.append('Access-Control-Allow-Origin' , '*');
      headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
      headers.append('Accept','application/json');
      headers.append('content-type','application/json');

    this.http.get(this.apiUrl34+$roid+'/'+$usid, {headers: headers}).subscribe((data: Response) => {
      resolve(data);},
    err => {
    console.log(err);
    });
    });
 }

}
