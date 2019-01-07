import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

const CART_KEY = 'cartItems';

/*
  Generated class for the CartProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CartProvider {

  constructor(public http: HttpClient, public storage: Storage) {
    console.log('Hello CartProvider Provider');
  }

  addToCart(productdet) {
    return this.getCartItems().then(result => {
      if (result) {
        if (!this.containsObject(productdet, result)) {
          result.push(productdet);
          return this.storage.set(CART_KEY, result);
        } else {
          let index = result.findIndex(x => x.product_id == productdet.product_id);
          let prevQuantity = parseInt(result[index].count);
          productdet.count = (prevQuantity + productdet.count);
          let currentPrice = (parseInt(productdet.totalPrice));
          productdet.totalPrice = currentPrice;
          result.splice(index, 1);
          result.push(productdet);
          return this.storage.set(CART_KEY, result);
        }

      } else {
        return this.storage.set(CART_KEY, [productdet]);
      }
    })
  }

  removeFromCart(productdet) {
    return this.getCartItems().then(result => {
      if (result) {
        var productIndex = result.indexOf(productdet);
        result.splice(productIndex, 1);
        return this.storage.set(CART_KEY, result);
      }
    })
  }

  removeAllCartItems() {
    return this.storage.remove(CART_KEY).then(res => {
      return res;
    });
  }


  containsObject(obj, list): boolean {
    if (!list.length) {
      return false;
    }

    if (obj == null) {
      return false;
    }
    var i;
    for (i = 0; i < list.length; i++) {
      if (list[i].product_id == obj.product_id) {
        return true;
      }
    }
    return false;
  }

  getCartItems() {
    return this.storage.get(CART_KEY);
  }
}
