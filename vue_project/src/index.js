import { service } from "./commonFunctions";
import{baseAPIUrl, APIUrls} from "./constants";
import * as components from './components';

const app = new Vue({
    el: '#app',
    mounted: function () {
        service(baseAPIUrl + APIUrls.getGoods, 'GET')
            .then((data) => {
                this.goods = data;
                this.filteredGoods = data;
            })
            .catch((error) => {
                console.log(error)
            });
        service(baseAPIUrl + APIUrls.getBasket, 'GET')
            .then((data) => {
                this.basketGoods = data;
            })
            .catch((error) => {
                console.log(error)
            });
    },
    data: {
        goods: [],
        filteredGoods: [],
        basketGoods: [],
        basketVision: false,
        searchLine: ''
    },
    methods: {
        filterGoods: function () {
            this.filteredGoods = this.goods.filter(({product_name}) => {
                return new RegExp(this.searchLine, 'i').test(product_name);
            });
        },
        viewBasket: function () {
            this.basketVision = !this.basketVision
        },
        addBasketItem: function (item) {
            service(baseAPIUrl + APIUrls.api, 'PATCH', JSON.stringify(item))
                .then((response) => {
                    this.basketGoods = response
                });
        },
        deleteBasketItem: function (id) {
            service(baseAPIUrl + APIUrls.api, 'DELETE', JSON.stringify({id: id}))
                .then((response) => {
                    this.basketGoods = response
                });
        }
    }
});
