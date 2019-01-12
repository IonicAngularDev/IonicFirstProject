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

  constructor(public http: HttpClient) {
    console.log('Hello RestapiProvider Provider');
    //this.token = "";
  }


  getUsers(credentials, type) {
    var headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Accept','application/json');
    headers.append('Access-Control-Allow-Credentials','true');
    headers.append('Content-Type','application/json');
    headers.append('Access-Control-Allow-Headers','Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
    return this.http.post(apiUrl + type, credentials, {headers: headers});
}


  // getUsers(endpoint: string, body: any, reqOpts?: any) {
  //   return this.http.post(this.url + '/' + endpoint, body, reqOpts);
  // }

  // getUsers(credentials, type) {
  //   return new Promise((resolve, reject) => {
  //     var headers = new HttpHeaders();
  //     headers.append('Access-Control-Allow-Origin' , '*');
  //     headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
  //     headers.append('Accept','application/json');
  //     headers.append('Content-Type','application/json');

  //   //  let headers = new HttpHeaders({
  //   //     'Accept': 'application/json',
  //   //     'Access-Control-Allow-Origin' : 'http://localhost:8100',
  //   //     'Access-Control-Allow-Methods' : 'POST',
  //   //     'Access-Control-Allow-Headers' : 'Content-Type; Authorization',
  //   //     'Content-Type': 'application/json; charset=utf-8',
  //   //     'Access-Control-Allow-Credentials' : 'true',
  //   //     'Authorization': 'Bearer ' + this.token,
  //   //  });

  // // this.http.post(apiUrl + type, JSON.stringify(credentials), {headers: headers})
  // //   .subscribe((res: Response) => {
  // //       resolve(res);
  // //     }, (err) => {
  // //         reject(err);
  // //       });

  //       // return this.http
  //       //   .post(apiUrl + type, JSON.stringify(credentials), {headers: headers})
  //       //   .map((res: Response) => res.json());
  //   });
  // }

  // fnCallApi(methodTYpe='POST',paramObj={}){

  // }



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

  // getUsers(credentials, type) {
  //     var headers = new Headers();
  //     headers.append('Access-Control-Allow-Origin' , '*');
  //     headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
  //     headers.append('Accept','application/json');
  //     headers.append('content-type','application/json');

  //     return this.http.post(apiUrl + type, JSON.stringify(credentials), {headers: headers});

  // }

}
