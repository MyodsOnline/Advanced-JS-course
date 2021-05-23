const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'

const makeGETRequest = (url, callback) => {
  return new Promise((resolve, reject) => {
    let xhr;

    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) { 
      xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) callback(xhr.responseText)
        else reject('Error')
      }
    }

    xhr.open('GET', url, true);
    xhr.send();
  })
}

class GoodsItem {
  constructor(product_name, price, id_product) {
    this.product_name = product_name;
    this.price = price;
    this.id_product = id_product;
  }

  render() {
    let data = {
      price: this.price,
      product_name: this.product_name,
      id_product: this.id_product,
    };

    data = JSON.stringify(data);

    return `<div class='goods-item'>
              <h3>${this.product_name}</h3>
              <p>${this.price}</p>
              <button data-product='${data}' id='add-btn-${this.id_product}'>В корзину</button>
            </div>`;
  }
}

class GoodsList {
  _basket = new Basket();

  constructor() {
    this.goods = [];
  }

  fetchGoods(cb) {
    makeGETRequest(`${API_URL}/catalogData.json`, (goods) => {
      this.goods = JSON.parse(goods);
      cb();
    })
  }

  render() {
    let listHtml = '';
    this.goods.forEach(good => {
      const goodItem = new GoodsItem(good.product_name, good.price, good.id_product);
      listHtml += goodItem.render();
    });
    document.querySelector('.goods-list').innerHTML = listHtml;
    this._basket.setAddListeners(this.goods);
  }

  getTotalSum() {
    const totalSum = this.goods.reduce((acc, item) => {
      if (!item.price) return acc;
      return acc + item.price;
    }, 0);
    console.log(totalSum);
  }
}

class Basket {
  constructor() {
    this.goods = [];
  }

  clearAll() {
    this.goods = [];
  }

  addItem({ target }) {
    const { product = {} } = target.dataset;
    this.goods.push(JSON.parse(product));
    this.render();
  }

  removeItem({ target }) {
    const { id } = target.dataset;
    this.goods = this.goods.filter((item) => String(item.id_product) !== String(id));
    this.render();
  }

  setAddListeners(list) {
    list.forEach((item) => {
      document.getElementById(`add-btn-${item.id_product}`).addEventListener('click', (e) => this.addItem(e)); 
    })
  }

  setDeleteListeners() {
    this.goods.forEach((item) => {
      document.getElementById(`delete-btn-${item.id_product}`).addEventListener('click', (e) => this.removeItem(e));
    })
  }

  render() {
    let listHtml = '';
    this.goods.forEach(good => {
      const goodItem = new BasketItem(good.product_name, good.price, good.id_product);
      listHtml += goodItem.render();
    });
    document.querySelector('.cart-list').innerHTML = listHtml;
    this.setDeleteListeners();
  }
}

class BasketItem extends GoodsItem {
  constructor(...args) {
    super(...args);
    this.count = 0;
  }

  addOne() {}

  removeOne() {}

  render() {
    return `<div class='goods-item'>
              <h3>${this.product_name}</h3>
              <p>${this.price}</p>
              <button data-id='${this.id_product}' id='delete-btn-${this.id_product}'>Удалить</button>
            </div>`;
  }
}

const list = new GoodsList();
list.fetchGoods(() => {
  list.render();
});

