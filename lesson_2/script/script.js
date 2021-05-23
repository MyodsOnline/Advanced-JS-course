// добавим title в header
let $header = document.getElementsByTagName('header')[0];
$header.insertAdjacentHTML('afterbegin', `<h1 class="header_title">e_Shop</h1>`)
let $main = document.getElementById('main_section');
let $header_btn = document.getElementById('header_button');

// отрисовка товара
class GoodsItem{
    constructor (title, price, img, promo, id){
        this.title = title;
        this.price = price;
        this.img = img;
        this.promo = promo;
        this.id = id;
    }
    render() {
        return `
        <div id="${this.id}" class="goods-item ${this.promo == true ? "promo" : ""}">
            <img class="item_img" src="./img/${this.img}" alt="item_image"></img>
            <h3>${this.title}</h3>
            <p class="item_price">${this.price == undefined ? 'нет в наличии' : ('цена — ' + this.price)}</p>
            <button btn_id="${this.id}" class="item_btn" ${this.price == undefined ? 'disabled' : ''}>Добавить</button>
        </div>`
    }
}

// вывод списка товаров
class GoodsList{
    constructor (){
        this.goods = [];
    }
    fetchGoods() {
        this.goods = [
            {title: 'socks', price: 15},
            {title: 'shirt', price: 150},
            {title: 'suit', img: 'Image3.png'},
            {title: 'jacket', price: 500, promo: true},
            {price: 15, img: 'Image5.png'},
            {title: 'coat', price: 150},
            {title: 'trousers', price: 215},
            {title: 'hat', price: 495, promo: true},
        ];
    }
    render(){
        let html = '';
        this.goods.forEach(({title='noName', price=undefined, img = 'default.png', promo=false}, id) => {
            const goodItem = new GoodsItem(title, price, img, promo, id);
            html += goodItem.render();
        });
        $main.insertAdjacentHTML('afterbegin', html);
    }
    getTotalSum(){
        let totalSum = 0;
        this.goods.forEach(itm => {
            if (itm.price != undefined) {
                totalSum += itm.price;
            }
        })
        return totalSum;

        // как сделать через reduce? ведь можно же...
        // return this.goods.reduce(function (acc, itm){
        //     if (itm.price != undefined) {return acc + itm.price};
        // }, 0)
    }
}

const list = new GoodsList();
list.fetchGoods();
list.render();
list.getTotalSum();
$header.firstChild.insertAdjacentHTML('beforeend', ` — товаров на ${list.getTotalSum()}р.`);

// элемент из корзины
class ChartItem extends GoodsItem{
    constructor(title, price, img, id, quantity=1){
        super(title, price, img, id);
        this.quantity = quantity;
    }
    renderChartItem(){
        console.log(`
        <div>${this.title}</div>
        <div>${this.price}</div>
        <div>${this.img}</div>
        <button id="add_${this.id}">+</button>
        <button id="reduse_${this.id}">-</button>        
        <div>${this.quantity}</div>
        <button id="del_${this.id}">delete</button>
        <div class="total_price">${this.price * this.quantity}</div>
        `);
    }
    addItem_button(){
        console.log(this.quantity);
        this.quantity += 1;
        console.log(this.quantity);
        this.renderChartItem();
    }
    reduceItem_button(){
        if (this.quantity > 0) {
            this.quantity -= 1;
        }
        console.log(this.quantity);
        this.renderChartItem();
    }
    deliteItem_button(){
        /*delete element*/
    }
}

// корзинна цликом
class ChartList{
    constructor(){
        this.shoppingChart = [
            {name: 'shirt', price: 150},
            {name: 'shirt', price: 150},
        ];
    }
    renderShoppingChart(){
        if (this.shoppingChart.length = 0){
            console.log('Корзина пуста')
        } else {
            console.log(shoppingChart)
        }
    }
    getTotal(){

    }
    postChartList(){
        
    }
}

let buy = new ChartItem('car', 1000, 'img1.png');
buy.renderChartItem();


// добавим товаров в будущую корзину
let basket = [
    {name: 'shirt', price: 150},
    {name: 'shirt', price: 150},
];


if (basket.length > 0) {
    $header_btn.insertAdjacentHTML('afterbegin', `<div id="basket_cnt">В магазине ${basket.length} товаров на ${list.getTotalSum()}р.</div>`)
}
