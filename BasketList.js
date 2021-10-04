'use strict'

//Пока что без использования id, методов подгрузки с сервера, принадлежности пользователю и т.д., потому что не понятно,
// какой будет функционал и какая планируется реализация

class BasketItem {
    constructor({ title = 'Product', price = 0 }, quantity = 1, discount = 1) {
        this.title = title;
        this.price = price;
        this.quantity = quantity;
        this.discount = discount;
    }

    getTotalSum() {
        return this.price * this.quantity
    }

    getDiscountedTotalSum() {
        return this.price * this.quantity * this.discount
    }

    increaseQuantity(value = 1) {
        this.quantity += value
    }

    decreaseQuantity(value = 1) {
        this.quantity = (this.quantity >= value) ? this.quantity - value : 0
    }

    setDiscount(discount) {
        this.discount = discount
    }

    discountPrice() {
        return this.price * this.discount;
    }

    render() {
        // Позже здесь будет разметка
    }

}

class BasketList {
    constructor() {
        this.basketItems = []
    }

    addBasketItem(basketItem) {
        this.basketItems.push(basketItem)
    }

    removeBasketItem(basketItem) {
        const idx = this.basketItems.indexOf(basketItem);
        if (idx !== -1) {
            this.basketItems.splice(idx, 1);
        }
    }

    getTotalGoodsQuantity() {
        return this.basketItems.reduce((acc, item) => acc + item.quantity, 0)
    }

    getTotalItemsQuantity() {
        return this.basketItems.length
    }

    getTotalPrice() {
        return this.basketItems.reduce((acc, item) => acc + item.getTotalSum(), 0)
    }

    getDiscountedTotalPrice() {
        return this.basketItems.reduce((acc, item) => acc + item.getDiscountedTotalSum(), 0)
    }

    setDiscount(discount) {
        this.basketItems.forEach(item => { item.discount = discount })
    }

    render() {
        // Позже здесь будет разметка
    }

    // ещё здесь может быть метод получения элементов корзины с сервера в том или ином виде.

}

export default BasketList;