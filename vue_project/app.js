const baseAPIUrl = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const APIUrls = {
    getGoods: '/catalogData.json',
    getBasket: '/getBasket.json',
    addBasketItem: '/addToBasket.json',
    removeBasketItem: '/deleteFromBasket.json'
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
            <blue-button>Добавить</blue-button>
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
                <blue-button>Удалить</blue-button>               
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

const app = new Vue({
    el: '#app',
    mounted: function () {
        fetch(baseAPIUrl + APIUrls.getGoods)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                this.goods = data;
                this.filteredGoods = data;
                this.basketGoods = data;
            })
            .catch((error) => {
                console.log(error)
            })
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
            this.filteredGoods = this.goods.filter(({ product_name }) => {
                return new RegExp(this.searchLine, 'i').test(product_name);
            });
        },
        viewBasket: function () {
            this.basketVision = !this.basketVision
        }
    }
});
