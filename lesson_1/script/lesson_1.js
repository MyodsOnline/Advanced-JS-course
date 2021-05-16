let goods = [
    {title: 'socks', price: 15},
    {title: 'shirt', price: 150},
    {title: 'suit'},
    {title: 'jacet', price: 500, promo: true},
    {price: 15},
    {title: 'shirt', price: 150},
    {title: 'suit', price: 215},
    {title: 'jacet', price: 500, promo: true},
]

/*
// исходый код. рабочий, исправленный, дополненный.
// ниже представлен код, переписанный на свой лад.
const renderGoodsItem = (title, price, promo, id) => {
	return `
    <div id="${id}" class="goods-item ${promo == true ? "promo" : ""}">
        <div class="item_img">img</div>
        <h3>${title}</h3>
        <p class="item_price">${price == 'нет в наличии' ? 'нет в наличии' : ('цена — ' + price)}</p>
        <button btn_id="${id}" class="item_btn" ${price == 'нет в наличии' ? 'disabled' : ''}>Добавить</button>
    </div>`
};

const renderGoodList = (list) => {
    let goodsList = list.map(({title='noName', price='нет в наличии', promo=false}, id) => 
        renderGoodsItem(title, price, promo, id)).join('');
	// метод map создал нам новый массив, элемменты которого разделены ",", которая отрисовывается в dom.
	// избавиться от неё достаточно легко применив join('').

	document.querySelector('#main_section').innerHTML = goodsList;
	}

    renderGoodList(goods)
*/

// ОТСЕБЯЧИНА
// добавим title в header
let $header = document.getElementsByTagName('header')[0];
$header.insertAdjacentHTML('afterbegin', `<h1 class="header_title">e_Shop</h1>`)


// перепишем функцию отрисовки витрины, прменив forEach
const $main_section = document.getElementById('main_section');

let drow_items = (goods) => {
    goods.forEach(({title='noName', price='нет в наличии', promo=false}, id) => {
        let item_html = 
        `<div class="goods-item ${promo == true ? "promo" : ""}" item_id="${id}">
            <div class="item_img">img</div>
            <h3>${title}</h3>
            <p class="item_price">${price == 'нет в наличии' ? 'нет в наличии' : ('цена — ' + price)}</p>
            <button btn_id="${id}" class="item_btn" ${price == 'нет в наличии' ? 'disabled' : ''}>Добавить</button>
        </div>`;
        $main_section.insertAdjacentHTML('beforeend', item_html);
    })
}
drow_items(goods)

// добавим товаров в будущую корзину
let basket = [
    {name: 'shirt', price: 150},
    {name: 'shirt', price: 150},
];

let $header_btn = document.getElementById('header_button');
if (basket.length > 0) {
    $header_btn.insertAdjacentHTML('afterbegin', `<div id="basket_cnt">${basket.length}</div>`)
}
