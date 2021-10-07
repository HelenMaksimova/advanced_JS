'use strict'

class GoodsItem {
    constructor({ title = 'Product', price = 0 }) {
        this.title = title;
        this.price = price;
    }

    render() {
        return (
            `<div class="main__goods-item">
            <div class="main__goods-item-container">
                <h3>${this.title}</h3>
                <p>${this.price} \$</p>
            </div>
            <button>Добавить</button>
            </div>`
        );
    }
}

class GoodsList {
    constructor() {
        this.goods = [];
        this.getGoods();
        this.render();
    }

    getGoods() {
        this.goods = [
            { title: 'Shirt', price: 150 },
            { title: 'Socks', price: 50 },
            { title: 'Jacket', price: 350 },
            { title: 'Shoes', price: 250 },
            { },
            { title: 'T-Shirt', price: 200 },
            { title: 'Coat', price: 500 },
            { title: 'Scarf', price: 100 },
            { title: 'Skirt', price: 300 },
            { title: 'Pants' },
            { title: 'Pajamas', price: 180 },
            { title: 'Boots', price: 450 },
            { title: 'Suit', price: 600 },
            { title: 'Jeans', price: 280 },
            { }
        ];
    }

    // Вообще, чтобы посчитать общую стоимость товаров, неплохо бы учесть их количество.
    // Но пока что в ТЗ количество не упоминалось, поэтому вот так, просто сумма цен.
    getTotalPrice () {
        return this.goods.reduce((acc, item) => acc + (item.price || 0), 0);
    }

    render() {
        const htmlInsert = this.goods.map(good => {
            const goodItem = new GoodsItem(good);
            return goodItem.render();
        }).join('');
        document.querySelector('.main__goods-list').insertAdjacentHTML('afterbegin', htmlInsert);
    }
}

export default GoodsList;
