'use strict'

class Hamburger {
    constructor(size, staffing) {
        this.size = size;
        this.staffing = staffing;
        this.toppings = [];
    }

    changeSize(size) {
        this.size = size;
    }

    changeStaffing(staffing) {
        this.staffing = staffing;
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

const sizes = [
    { name: 'small', price: 50, calories: 20 },
    { name: 'large', price: 100, calories: 40 }
];

const staffings = [
    { name: 'cheese', price: 10, calories: 20 },
    { name: 'salad', price: 20, calories: 5 },
    { name: 'potato', price: 15, calories: 10 }
];

const toppings = [
    { name: 'spices', price: 15, calories: 0 },
    { name: 'souse', price: 20, calories: 5 }
];


const hamburger = new Hamburger(sizes[0], staffings[0]);

const $sizeSelect = document.querySelector('#size-select')
const $staffingSelect = document.querySelector('#staffing-select')
const $toppingSelect = document.querySelector('#topping-select-add')

const changeHamburgerSize = () => {
    let newSize = sizes.find(item => item.name === $sizeSelect.options[$sizeSelect.selectedIndex].value)
    hamburger.changeSize(newSize)
    console.log(hamburger.size)
}

const changeHamburgerStaffing = () => {
    let newStaffing = staffings.find(item => item.name === $staffingSelect.options[$staffingSelect.selectedIndex].value);
    hamburger.changeStaffing(newStaffing);
    console.log(hamburger.staffing);
}

$sizeSelect.addEventListener('change', changeHamburgerSize);
$staffingSelect.addEventListener('change', changeHamburgerStaffing);