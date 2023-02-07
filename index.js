class Good {
    constructor (gId, gName, gDescription, gSizes, gPrice, gAvailable = true) {
        this.id = gId;
        this.name = gName;
        this.decription = gDescription;
        this.sizes = gSizes;
        this.price = gPrice;
        this.available = gAvailable;
    }
    setAvailable (newAvailable) {
        if (this.available != newAvailable) {
            this.available = newAvailable;
        }
    }
}

class GoodsList {
    #goods
    constructor () {
        this.#goods = [];
        this.filter = /Футболка/gi;
        this.sortPrice = false;
        this.sortDir = false;
    }
    get list () {
        let filteredGoods = this.#goods.filter(good => good.name.match(this.filter)).filter(filteredGood => filteredGood.available === true);
        if (this.sortPrice === true && this.sortDir === true) {
            return filteredGoods.sort((a, b) => a.price - b.price);
        } else if (this.sortPrice === true && this.sortDir === false) {
            return filteredGoods.sort((a, b) => b.price - a.price);
        }
        return filteredGoods
    }
    add (product) {
        if (this.#goods[0] == undefined) {
            this.#goods.push(product);
        } else {
            let counter = 0;
            for (let index = 0; index < this.#goods.length; index++) {
                if (this.#goods[index] == product) {
                    counter++;
                    break;
                }
            }
            if (counter == 0) {
                this.#goods.push(product);
            }
        }
    }
    remove (productId) {
        if (this.#goods[0] != undefined) {
            for (let index = 0; index < this.#goods.length; index++) {
                if (this.#goods[index].id == productId) {
                    this.#goods.splice(index, 1);
                    break;
                }
            }
        }
    }
}

class BasketGood extends Good {
    constructor (gId, gName, gDescription, gSizes, gPrice, gAvailable, goodAmount) {
        super(gId, gName, gDescription, gSizes, gPrice, gAvailable);
        this.amount = goodAmount;
    }
}

class Basket {
    constructor () {
        this.goods = [];
    }
    get totalAmount () {
        if (this.goods[0] != undefined) {
            let goodsAmount = this.goods.reduce((sum, item) => sum + item.amount, 0);
            return goodsAmount
        } else {
            return 'Корзина пуста'
        }
    }
    get totalSum () {
        if (this.goods[0] != undefined) {
            let goodsSum = 0;
            this.goods.forEach(item => goodsSum += item.price*item.amount);
            return goodsSum
        } else {
            return 'Корзина пуста'
        }
    }
    add (good, amount) {
        let counter = 0
        for (let index = 0; index < this.goods.length; index++) {
            if (this.goods[index].id == good.id) {
                this.goods[index].amount += amount;
                counter++;
            }
        }
        if (counter == 0) {
            const newGood = new BasketGood(good.id, good.name, good.description, good.size, good.price, good.available, amount);
            this.goods.push(newGood);
        }
    }
    remove (good, amount) {
        this.goods.forEach((item, index) => {
            if (item.id == good.id && item.amount - amount >= 1) {
                item.amount -= amount;
            } else if (item.id == good.id && item.amount - amount < 1) {
                this.goods.splice(index, 1);
            }
        })
    }
    clear () {
        this.goods = [];
    }
    removeUnavailable () {
        this.goods = this.goods.filter(good => good.available === true);
    }
}


const a = new Good(983465, 'Футболка белая', 'Классическая белая футболка с коротким рукавом', ['M', 'L', 'XL'], 5);
const b = new Good(37834, 'Футболка чёрная', 'Классическая чёрная футболка с коротким рукавом', ['M', 'L', 'XL'], 6);
const c = new Good(211566, 'Спортивные брюки', 'Комфортные брюки для занятий спортом', ['M', 'L', 'XL'], 9);
const d = new Good(387582, 'Спортивный топ', 'Женский топ для занятий спортом', ['S', 'M', 'L'], 10);
const e = new Good(983465, 'Кроссовки', 'Кроссовки с демпфирующей подошвой', [39, 41, 43, 45], 5);
const productList = new GoodsList();
const basket = new Basket();

productList.add(a);
productList.add(b);
productList.add(c);
productList.add(d);
productList.add(e);
productList.add(e); //Проверка обработки дублей
productList.remove(211566);

console.log('Список товаров с фильтром по футболкам:\n');
console.log(productList.list);
console.log('-------');

productList.filter = /\W/gi;
console.log('Список товаров без конкретного фильтра:\n');
console.log(productList.list);
console.log('-------');

productList.sortPrice = true;
console.log('Список товаров с сортировкой по убыванию цены:\n');
console.log(productList.list);
console.log('-------');

productList.sortDir = true;
console.log('Список товаров с сортировкой по возрастанию цены:\n');
console.log(productList.list);
console.log('-------');

productList.filter = /брюки/gi;
console.log('Список товаров с ненайденным товаром:\n');
console.log(productList.list);
console.log('-------');

basket.add(a, 7);
basket.add(c, 15);
basket.add(d, 3);

console.log('Данные по корзине:\n');
console.log(basket.totalAmount);
console.log(basket.totalSum);
console.log('-------');

basket.add(a, 5);
console.log('Данные по корзине с увеличенным кол-вом товара:\n');
console.log(basket.totalAmount);
console.log(basket.totalSum);
console.log('-------');

basket.remove(d, 1);
console.log('Данные по корзине с уменьшенным кол-вом товара:\n');
console.log(basket.totalAmount);
console.log(basket.totalSum);
console.log('-------');

basket.remove(d, 2);
console.log('Данные по корзине с удалённым товаром:\n');
console.log(basket.totalAmount);
console.log(basket.totalSum);
console.log('-------');

basket.clear();
console.log('Данные по пустой корзине:\n');
console.log(basket.totalAmount);
console.log(basket.totalSum);
console.log('-------');

basket.add(a, 7);
basket.add(c, 15);
basket.add(d, 3);
c.available = false;
console.log('Данные по корзине с недоступным товаром:\n');
console.log(basket.totalAmount);
console.log(basket.totalSum);
console.log('-------');