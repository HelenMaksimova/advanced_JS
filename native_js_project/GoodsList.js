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
        this.filteredGoods = []
        this.getGoods(makeGetRequest, url);
    }

    getGoods(makeGetRequest, url) {
        makeGetRequest(url).then(
            (response) => {
                this.goods = response;
                this.filteredGoods = response;
                this.render()
            },
            (error) => {
                console.log(error)
            }
        )
    }

    filterGoods(value) {
        const regexp =new RegExp(value, 'i');
        this.filteredGoods = this.goods.filter(good => regexp.test(good.product_name));
        this.render();
    }

    getTotalPrice () {
        return this.goods.reduce((acc, item) => acc + (item.price || 0), 0);
    }

    render() {
        const htmlInsert = this.filteredGoods.map(good => {
            const goodItem = new GoodsItem(good);
            return goodItem.render();
        }).join('');
        const content = document.querySelector('.main__goods-list');
        content.innerHTML = '';
        content.insertAdjacentHTML('afterbegin', htmlInsert);
    }
}

export default GoodsList;
