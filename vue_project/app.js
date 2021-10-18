const GOODS = [
    { title: 'Shirt', price: 150, quantity: 1 },
    { title: 'Socks', price: 50, quantity: 2 },
    { title: 'Jacket', price: 350, quantity: 1 },
    { title: 'Shoes', price: 250, quantity: 4 },
    { title: 'T-Shirt', price: 200, quantity: 2 },
    { title: 'Coat', price: 500, quantity: 1 },
    { title: 'Scarf', price: 100, quantity: 1 },
    { title: 'Skirt', price: 300, quantity: 3 },
    { title: 'Pants', price: 500, quantity: 1 },
    { title: 'Pajamas', price: 180, quantity: 5 },
    { title: 'Boots', price: 450, quantity: 1 },
    { title: 'Suit', price: 600, quantity: 1 },
    { title: 'Jeans', price: 280, quantity: 2 },
];

Vue.component(
    'goods-item',
    {
        props: ['item'],
        template:
            `<div class="goods-item">
            <div class="goods-item-container">
                <h3>{{ item.title }}</h3>
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
                <p>{{ item.title }}</p>
                <p>{{ item.quantity }}</p>
                <p>{{ item.price }} $</p>
                <p>{{ totalPrice }} $</p>                
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
    data: {
        goods: GOODS,
        basketGoods: GOODS,
        filteredGoods: GOODS,
        basketVision: false,
        searchLine: '',
    },
    methods: {
        filterGoods: function () {
            this.filteredGoods = this.goods.filter(({title}) => {
                return new RegExp(this.searchLine, 'i').test(title);
            });
        },
        viewBasket: function () {
            this.basketVision = !this.basketVision
        }
    }
});
