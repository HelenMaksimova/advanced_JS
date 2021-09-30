'use strict'

const goods = [
    {title: 'Shirt', price: 150},
    {title: 'Socks', price: 50},
    {title: 'Jacket', price: 350},
    {title: 'Shoes', price: 250},
    {},
    {title: 'T-Shirt', price: 200},
    {title: 'Coat', price: 500},
    {title: 'Scarf', price: 100},
    {title: 'Skirt', price: 300},
    {title: 'Pants'},
    {title: 'Pajamas', price: 180},
    {title: 'Boots', price: 450},
    {title: 'Suit', price: 600},
    {title: 'Jeans', price: 280},
    {}
];

const renderGoodsItem = ({title = 'Product', price = 0}) => {
    return `<div class="main__goods-item">
            <div class="main__goods-item-container">
                <h3>${title}</h3>
                <p>${price} \$</p>
            </div>
            <button>Добавить</button>
            </div>`;
};

// * Мы присвоили в innerHTML массив строк. По умолчанию массив при выводе преобразуется в строку с
// разделителем в виде запятой. Чтобы этого избежать, можно использовать метод join и указать
// необходимый разделитель. Кроме того, насколько мне известно использование innerHTML считается
// не слишком хорошей практикой и лучше использовать insertAdjacentHTML - он более оптимизирован.

const renderGoodsList = (list) => {
    document.querySelector('.main__goods-list')
        .insertAdjacentHTML('afterbegin', list.map((good) => renderGoodsItem(good)).join(''))
}

renderGoodsList(goods);
