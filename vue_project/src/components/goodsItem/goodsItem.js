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