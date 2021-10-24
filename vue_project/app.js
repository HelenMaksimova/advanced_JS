const baseAPIUrl = 'http://localhost:8000';
const APIUrls = {
    getGoods: '/goods.json',
    getBasket: '/basket-goods.json',
    api: '/api'
};


Vue.component(
    'goods-item',
    {
        props: ['item'],
        template:
            `<div class="goods-item">
            <div class="goods-item-container">
                <h3>{{ item.product_name }}</h3>
                <p>{{ item.price }} $</p>
            </div>
            <blue-button @click="$emit('add', item)">Добавить</blue-button>
            </div>`
    }
);

Vue.component('basket-card',
    {
        template:
            `<div class="basket-card">
                <blue-button @click="$emit('view')">Закрыть</blue-button>
                <slot></slot>
            </div>`
    });

Vue.component('basket-item',
    {
        props: ['item'],
        template:
            `<div class="basket-item">
                <p>{{ item.product_name }}</p>
                <p>{{ item.quantity }}</p>
                <p>{{ item.price }} $</p>
                <p>{{ totalPrice }} $</p> 
                <blue-button @click="$emit('remove', item.id)">Удалить</blue-button>               
            </div>`,
        computed: {
            totalPrice: function () {
                return this.item.price * this.item.quantity | 0
            }
        }
    });

Vue.component(
    'blue-button',
    {
        template: `<button class="blue-button" @click="$emit('click', $event.target.click)">
                      <slot></slot>
                  </button>`
    }
);

Vue.component(
    'blue-search',
    {
        props: ['value'],
        template:
            `<input 
            class="blue-input" 
            v-bind:value="value" 
            v-on:input="$emit('input', $event.target.value)">`
    }
);

const service = function (url, method, data) {
    const initData = {method: method};
    if (data) {
        initData.body = data;
    }
    if (method === 'PATCH' || method === 'DELETE') {
        initData.headers = {'Content-type': 'application/json'}
    }
    return fetch(url, {...initData})
        .then((response) => {
            return response.json()
        })
}

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
