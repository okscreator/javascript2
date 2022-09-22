var btnBasket = document.getElementById('basketBtn');
//Так и не понял почему getElementByClassName не работает ;(

class goodsItem {
    constructor(title, price) {
        this.title = title;
        this.price = price;
    }

    render() {
        return `<div class="goodsItem"><h3>${this.title}</h3><p>${this.price}</p></div>`;
    }

}

class GoodsList {
    constructor() {
        this.goods = [];
    }

    fetchGoods() {
        this.goods = [
            { title: 'Shirt', price: 150 },
            { title: 'Socks', price: 50 },
            { title: 'Jacket', price: 350 },
            { title: 'Shoes', price: 250 },
            { title: 'Shirt', price: 150 },
            { title: 'Socks', price: 50 },
            { title: 'Jacket', price: 350 },
            { title: 'Shoes', price: 250 },
            { title: 'Shirt', price: 150 },
            { title: 'Socks', price: 50 },
            { title: 'Jacket', price: 350 },
            { title: 'Shoes', price: 250 },
        ];
    }

    render() {
        let listHtml = "";
        this.goods.forEach(good => {
            const goodItem = new goodsItem(good.title, good.price);
            listHtml += goodItem.render();
        })

        document.querySelector('.goodsList').innerHTML = listHtml;
    }

    //Метод, определяющий суммарную стоимость всех товаров
    totalCartPrice() {
        let totalPrice = document.getElementById('totalPrice');
        let sum = 0;
        this.goods.forEach(good => {
            sum += good.price;
        });
        totalPrice.innerText = `Cуммарная стоимость всех товаров ${sum} рублей.`;
    }
}

//Класс корзина
class Cart {
    constructor() {
        this.goods = [];
    }

    render() {
        let listHtml = '';
        let goodsList = document.getElementById('totalPrice');

        this.goods.forEach((goodsItem, render) => {
            listHtml += goodsItem.render(render);
        });
        goodsList.innerHTML = listHtml;

        this.totalCartPrice();
    }

    //метод добавления товара в корзину
    addItemToCart(product) {
    }

    //метод выхода из корзины и продолжения покупок
    continuePurchases() {
    }

    //Метод для вывода итоговой суммы корзины
    totalCartPrice() {
    }

}

//Класс элемента корзины
class CartItem {
    constructor() {
        this.goods = [];
    }

    //Метод удаления товара из корзины
    deleteItemFromCart(product) {
    }

    //Метод изменения количества товара в корзине
    quantityItemFromCart(product) {
    }

}

var renderPrice = () => {
    const total = new GoodsList();
    total.fetchGoods();
    total.totalCartPrice();
    totalPrice.style.display = 'block';
}

const list = new GoodsList();
list.fetchGoods();
list.render();
btnBasket.addEventListener('click', renderPrice);