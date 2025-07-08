import React from "react";
import { BASE_URL, POST_ADD_CART_API, POST_ADD_WISHLIST_API } from "./ApiConfig";

export const PostApiFetch = async (URL, formData) => {
  // console.log(BASE_URL + URL, formData)
    return await fetch(BASE_URL + URL, {
      method: "POST",
      headers: {
        Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
      },
      body: formData,
    }).then((response) => {
      const statusCode = response.status;
      // console.log('statusCode',response, statusCode);
      const data = response.json();
      return Promise.all([statusCode, data]);
    });
  };

  export const GetApiFetch = async (URL, params = "") => {
    return await fetch(BASE_URL + URL + params, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    }).then((response) => {
      const statusCode = response.status;
      const data = response.json();
      return Promise.all([statusCode, data]);
    });
  };

  export const TrimString = (str, length) => {
    if (str.length > length) {
      return str.substr(0, length) + '...';
    } else {
      return str;
    }
  }
  // ========================================================
  export const addToCart = async (productsid, quantity, customersId, sessionId, shopNow, productAttriId) => {
    const formData = new FormData();
    formData.append('products_id', productsid);
    formData.append('quantity', quantity);
    formData.append('customers_id', customersId);
    formData.append('session_id', sessionId);
    formData.append('shopNow', shopNow);
    formData.append('prod_attributeids', productAttriId);
  
  
    return await fetch(BASE_URL + POST_ADD_CART_API, {
      method: "POST",
      body: formData,
    }).then((response) => {
      const statusCode = response.status;
      const data = response.json();
      return Promise.all([statusCode, data]);
    });
  }
  // ========================================================
  export const addToWishlist   = async ( customersId, productsId, priceId) => {
    const formData = new FormData();
    formData.append('customers_id', customersId);
    formData.append('products_id', productsId);
    formData.append('products_attributes_prices_id', priceId);
  
    return PostApiFetch(POST_ADD_WISHLIST_API, formData)
      .then(([status, response]) => {
        // console.log("addToCart => "+status, response);
        if (status == 200) {
          var wishlistData = null
          if (response.status == true) {
            var wishlistData = response
            return Promise.all([wishlistData]);
          } else {
            return Promise.all([wishlistData]);
          }
        }
      })
  }