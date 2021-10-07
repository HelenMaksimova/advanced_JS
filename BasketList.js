'use strict'

//Пока что без использования id, методов подгрузки с сервера, принадлежности пользователю и т.д., потому что не понятно,
// какой будет функционал и какая планируется реализация

class BasketItem {
    constructor({id_product, product_name = 'Product', price = 0, quantity = 1}) {
        this.id_product = id_product;
        this.product_name = product_name;
        this.price = price;
        this.quantity = quantity;
    }

    getTotalSum() {
        return this.price * this.quantity
    }

    increaseQuantity(value = 1) {
        this.quantity += value
    }

    decreaseQuantity(value = 1) {
        this.quantity = (this.quantity >= value) ? this.quantity - value : 0
    }

    render() {
        // Позже здесь будет разметка
    }

}

class BasketList {
    constructor(makeGetRequest, url) {
        this.amount = 0;
        this.countGoods = 0;
        this.basketItems = [];
        this.getBasket(makeGetRequest, url)
    }

    getBasket(makeGetRequest, url) {
        makeGetRequest(url).then(
            (response) => {
                (
                    { amount: this.amount, countGoods: this.countGoods, contents: this.basketItems } = response
                );
                console.log(
                    `Корзина: общая цена: ${this.amount}; общее количество: ${this.countGoods};`,
                    'список товаров: ', this.basketItems);
                this.render();
            },
            (error) => {
                console.log(error);
            }
        )
    }

    // Заготовка, из-за заглушек
    addBasketItemToServer(makePostRequest, url) {
        makePostRequest(url).then(
            (response) => {
                console.log('Добавление товара на сервер: ', response);
            },
            (error) => {
                console.log(error);
            }
        )
    }

    // Заготовка, из-за заглушек
    removeBasketItemFromServer(makeDeleteRequest, url) {
        makeDeleteRequest(url).then(
            (response) => {
                console.log('Удаление товара с сервера: ', response);
            },
            (error) => {
                console.log(error);
            }
        )
    }

    addBasketItem(basketItem) {
        this.basketItems.push(basketItem);
    }

    removeBasketItem(id) {
        this.basketItems = this.basketItems.filter(item => item.id_product !== id)
    }

    getTotalGoodsQuantity() {
        return this.basketItems.reduce((acc, item) => acc + item.quantity, 0);
    }

    getTotalItemsQuantity() {
        return this.basketItems.length;
    }

    getTotalPrice() {
        return this.basketItems.reduce((acc, item) => acc + item.getTotalSum(), 0);
    }

    render() {
        // Позже здесь будет разметка
    }

}

export default BasketList;
