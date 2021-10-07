'use strict'

class GoodsItem {
    constructor({ id_product, product_name = 'Product', price = 0 }) {
        this.id_product = id_product;
        this.product_name = product_name
        this.price = price;
    }

    render() {
        return (
            `<div class="main__goods-item">
            <div class="main__goods-item-container">
                <h3>${this.product_name}</h3>
                <p>${this.price} \$</p>
            </div>
            <button>Добавить</button>
            </div>`
        );
    }
}

class GoodsList {
    constructor(makeGetRequest, url) {
        this.goods = [];
        this.getGoods(makeGetRequest, url);
    }

    getGoods(makeGetRequest, url) {
        makeGetRequest(url).then(
            (response) => {
                this.goods = response;
                this.render()
            },
            (error) => {
                console.log(error)
            }
        )
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
