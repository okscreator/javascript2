const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

function makeGETRequest(url) {
    return new Promise((resolve, reject) => {
        const xhr = window.XMLHttpRequest ? new window.XMLHttpRequest() : new window.ActiveXObject('Microsoft.XMLHTTP');

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                const response = JSON.parse(xhr.responseText);
                if (xhr.status !== 200) reject(response);
                resolve(response);
            }
        };

        xhr.onerror = function (e) {
            reject(e);
        };

        xhr.open('GET', url);
        xhr.send();
    });
}

var btnBasket = document.getElementsByClassName('cartButton')[0];
var btnOrder = document.getElementsByClassName('btnOrder')[0];


class goodsItem {
    constructor(product_name, price) {
        this.product_name = product_name;
        this.price = price;
        this.quantity = 1;
    }

    render() {
        return `<div class="goodsItem">
        <h3>${this.product_name}</h3>
        <p>Цена: ${this.price} руб.</p>
        <p>Количество: ${this.quantity} шт.</p>
        <button class="btnOrder" type="button">Заказать</button>
        </div>`;
    }
}

class GoodsList {
    constructor(container = '.container') {
        this.container = container;
        this.goods = [];
    }

    totalPrice() {
        return this.goods.reduce((total, good) => {
            if (!good.price) return total;
            return total += good.price;
        }, 0);
    }

    async fetchGoods() {
        try {
            this.goods = await makeGETRequest(`${API_URL}/catalogData.json`);
            console.log(this.goods);
            return this.goods;
        } catch (e) {
            console.error(e);
            throw new Error(e);
        }
    }

    render() {
        let listHtml = "";
        this.goods.forEach(good => {
            const goodItem = new goodsItem(good.product_name, good.price);
            listHtml += goodItem.render();
        })

        document.querySelector('.goodsList').innerHTML = listHtml;
    }

    totalCartPrice() {
        let totalPrice = document.getElementsByClassName('totalPrice')[0];
        let sum = 0;
        var btnClose = '<button class="closeButton" type="button" onclick="closeBasket()">X</button>';
        this.goods.forEach(good => {
            sum += good.price;
        });

        totalPrice.innerHTML = `Cуммарная стоимость всех товаров ${sum} рублей.${btnClose}`;

    }

}

//Класс корзина
class Cart extends GoodsList {
    async add(good) {
        try {
            const { result } = await makeGETRequest(`${BASE_URL}/addToBasket.json`);
            if (!result) {
                throw new Error('Ошибка добавления');
            }
            this.goods.push(good);
            console.log(this.goods);
        } catch (e) {
            throw new Error(e);
        }
    }
    remove(id) {
        if (!id) {
            // clean cart
            return;
        }
    }
    update(id, good) { }
}

//Класс элемента корзины
class CartItem extends goodsItem {
    constructor(product_name, price, count = 1) {
        super(product_name, price);
        this.count = count;
    }
}

const cart = new Cart();
const list = new GoodsList('.goods-list', cart);
list.fetchGoods().then(() => {
    list.render();
    list.totalCartPrice();
    btnBasket.addEventListener('click', renderPrice);
});

var renderPrice = () => {
    list.totalCartPrice();
    totalPrice.style.display = 'block';
}

var closeBasket = () => {
    totalPrice.style.display = 'none'
};