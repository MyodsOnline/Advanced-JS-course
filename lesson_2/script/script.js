// добавим title в header
let $header = document.getElementsByTagName('header')[0];
$header.insertAdjacentHTML('afterbegin', `<h1 class="header_title">e_Shop</h1>`)

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
            <p class="item_price">${this.price == 'нет в наличии' ? 'нет в наличии' : ('цена — ' + this.price)}</p>
            <button btn_id="${this.id}" class="item_btn" ${this.price == 'нет в наличии' ? 'disabled' : ''}>Добавить</button>
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
            {title: 'hat', price: 500, promo: true},
        ];
    }
    render(){
        let html = '';
        this.goods.forEach(({title='noName', price='нет в наличии',img = 'default.png', promo=false}, id) => {
            const goodItem = new GoodsItem(title, price, img, promo, id);
            html += goodItem.render();
        });
        document.querySelector('#main_section').innerHTML = html;
    }
    getTotalSum(){
        let totalSum = 0;
        this.goods.forEach(itm => {
            if (itm.price != undefined) {
                totalSum += itm.price;
            }
        })
        return totalSum
    }
}

const list = new GoodsList();
list.fetchGoods();
list.render();
list.getTotalSum();







// добавим товаров в будущую корзину
let basket = [
    {name: 'shirt', price: 150},
    {name: 'shirt', price: 150},
];

let $header_btn = document.getElementById('header_button');
if (basket.length > 0) {
    $header_btn.insertAdjacentHTML('afterbegin', `<div id="basket_cnt">В магазине ${basket.length} товаров на ${list.getTotalSum()}р.</div>`)
}
