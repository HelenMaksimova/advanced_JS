'use strict'

import GoodsList from "./GoodsList.js";
import BasketList from "./BasketList.js";

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

const $searchButton = document.querySelector('.header__button-search');
const $searchInput = document.querySelector('.header__input-search');

$searchButton.addEventListener('click',(event) => {
    const value = $searchInput.value;
    goodsList.filterGoods(value);
});
