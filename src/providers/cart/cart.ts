import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

const CART_KEY = 'cartItems';
const WISH_KEY = 'wishItems';

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

  addToWishlist(productwishdet) {
    return this.getWishItems().then(result => {
      if (result) {
        if (!this.containsObject(productwishdet, result)) {
          result.push(productwishdet);
          return this.storage.set(WISH_KEY, result);
        } else {
          //let index = result.findIndex(x => x.id == productwishdet.id);
          // let prevQuantity = parseInt(result[index].count);
          // productwishdet.count = (prevQuantity + productwishdet.count);
          // let currentPrice = (parseInt(productwishdet.totalPrice));
          // productwishdet.totalPrice = currentPrice;
          //result.splice(index, 1);
          result.push(productwishdet);
          return this.storage.set(WISH_KEY, result);
        }

      } else {
        return this.storage.set(WISH_KEY, [productwishdet]);
      }
    })
  }

  // removeFromCart(productdet) {
  //   return this.getCartItems().then(result => {
  //     if (result) {
  //       var productIndex = result.indexOf(productdet);
  //       result.splice(productIndex, 1);
  //       return this.storage.set(CART_KEY, result);
  //     }
  //   })
  // }

  removeFromCart(productdet) {
    //console.log(productdet);
    return this.getCartItems().then(result => {
      if (result && result.length) {
        const newList = result.filter(el => el.product_id !== productdet.product_id);
        return this.storage.set(CART_KEY, newList);
      }
    })
  }

  removeFromWish(productdet) {
    //console.log(productdet);
    return this.getWishItems().then(result => {
      if (result && result.length) {
        const newList = result.filter(el => el.id !== productdet.id);
        return this.storage.set(WISH_KEY, newList);
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

  getWishItems() {
    return this.storage.get(WISH_KEY);
  }
}
