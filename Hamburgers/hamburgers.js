'use strict'

class Hamburger {
    constructor(size, staffing) {
        this.size = size;
        this.staffing = staffing;
        this.toppings = [];
    }

    getSize() {
        return this.size.name;
    }

    changeSize(size) {
        this.size = size;
    }

    getStaffing() {
        return this.staffing.name;
    }

    changeStaffing(staffing) {
        this.staffing = staffing;
    }

    getToppings() {
        return this.toppings.map(item => item.name).join(', ')
    }

    addTopping(topping) {
        this.toppings.push(topping);
    }

    removeTopping(topping) {
        const idx = this.toppings.indexOf(topping);
        if (idx !== -1) {
            this.toppings.splice(idx, 1);
        }
    }

    getTotalCalories() {
        return [...this.toppings, this.size, this.staffing].reduce((acc, item) => acc + item.calories, 0);
    }

    getTotalPrice() {
        return [...this.toppings, this.size, this.staffing].reduce((acc, item) => acc + item.price, 0);
    }

}

// Наследование делать не стала, здесь по сути просто объекты размера, начинки и добавки с одинаковыми полями,
// но без каких либо методов. Может я не права, но пока не вижу смысла усложнять.
// Реализация программы простая, в лоб. Не стала делать один слушатель событий на все элементы, их тут немного,
// просто на каждый повесила свой слушатель. Динамическую генерацию начального html тоже делать не стала,
// только метод прорисовки информации по гамбургеру))
// Надеюсь, оформление кода стало чуть лучше. $ перед именами переменных для обозначения, что это дом-элемент,
// подсмотрела у предыдущего преподавателя по JS, не знаю, насколько это допустимо, но удобно.

const sizes = [
    { name: 'маленький', value: 'small', price: 50, calories: 20 },
    { name: 'большой', value: 'large', price: 100, calories: 40 }
];

const staffings = [
    { name: 'сыр', value: 'cheese', price: 10, calories: 20 },
    { name: 'салат', value: 'salad', price: 20, calories: 5 },
    { name: 'картофель', value: 'potato', price: 15, calories: 10 }
];

const toppings = [
    { name: 'приправы', value: 'spices', price: 15, calories: 0 },
    { name: 'майонез', value: 'souse', price: 20, calories: 5 }
];


const hamburger = new Hamburger( sizes[0], staffings[0] );

const $sizeSelect = document.querySelector('#size-select');
const $staffingSelect = document.querySelector('#staffing-select');
const $toppingSelect = document.querySelector('#topping-select-add');
const $toppingAddButton = document.querySelector('#topping-add-button');
const $toppingRemoveButton = document.querySelector('#topping-remove-button');
const $infoContainer = document.querySelector('.container-info');

const drawInfo = () => {
    $infoContainer.innerHTML = '';
    $infoContainer.insertAdjacentHTML(
        'beforeend',
        `<p>Размер: ${ hamburger.getSize() }</p>
            <p>Начинка: ${ hamburger.getStaffing() }</p>
            <p>Добавки: ${ hamburger.getToppings() }</p>
            <p>Стоимость: ${ hamburger.getTotalPrice() }</p>
            <p>Калорийность: ${ hamburger.getTotalCalories() }</p>`
    );
}

const changeHamburgerSize = () => {
    const newSize = sizes
        .find(item => item.value === $sizeSelect.options[$sizeSelect.selectedIndex].value);
    hamburger.changeSize(newSize);
    drawInfo()
}

const changeHamburgerStaffing = () => {
    const newStaffing = staffings
        .find(item => item.value === $staffingSelect.options[$staffingSelect.selectedIndex].value);
    hamburger.changeStaffing(newStaffing);
    drawInfo();
}

const addHamburgerTopping = () => {
    const newTopping = toppings
        .find(item => item.value === $toppingSelect.options[$toppingSelect.selectedIndex].value);
    hamburger.addTopping(newTopping);
    drawInfo();
}

const removeHamburgerTopping = () => {
    const newTopping = toppings
        .find(item => item.value === $toppingSelect.options[$toppingSelect.selectedIndex].value);
    hamburger.removeTopping(newTopping);
    drawInfo();
}

$sizeSelect.addEventListener('change', changeHamburgerSize);
$staffingSelect.addEventListener('change', changeHamburgerStaffing);
$toppingAddButton.addEventListener('click', addHamburgerTopping);
$toppingRemoveButton.addEventListener('click', removeHamburgerTopping);

drawInfo();
