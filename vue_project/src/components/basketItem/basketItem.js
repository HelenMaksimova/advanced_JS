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
