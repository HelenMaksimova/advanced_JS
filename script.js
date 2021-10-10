'use strict'

import GoodsList from "./GoodsList.js";
import BasketList from "./BasketList.js";

// из-за заглушек пока что всё делается через метод GET.
// Функции для POST и DELETE добавлю, как только будет реальный API

function makeGetRequest(url) {
    return new Promise((resolve, reject) => {
        let xhr = (window.XMLHttpRequest) ?
            new XMLHttpRequest() :
            new ActiveXObject("Microsoft.XMLHTTP");
        xhr.open('GET', url, true);
        xhr.send();
        xhr.onload = () => {
            if (+xhr.status === 200) {
                resolve(JSON.parse(xhr.responseText))
            } else {
                reject(xhr.statusText)
            }
        }
    });
}

const BASE_API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const API_URLS = {
    getGoods: '/catalogData.json',
    getBasket: '/getBasket.json',
    addBasketItem: '/addToBasket.json',
    removeBasketItem: '/deleteFromBasket.json'
}

const goodsList = new GoodsList(makeGetRequest, BASE_API_URL + API_URLS.getGoods);
const basket = new BasketList(makeGetRequest, BASE_API_URL + API_URLS.getBasket);

basket.addBasketItemToServer(makeGetRequest, BASE_API_URL + API_URLS.addBasketItem);
basket.removeBasketItemFromServer(makeGetRequest, BASE_API_URL + API_URLS.removeBasketItem);
