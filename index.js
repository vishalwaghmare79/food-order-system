let carts = document.querySelectorAll(".add-cart");
let products = [{
        img: "images/chiken-salad.jpg",
        name: 'Chiken-salad',
        tag: 'fast-food',
        price: 15.99,
        InCart: 0
    },
    {
        img: "images/chole-bhature.jpg",
        name: 'chole-bhature',
        tag: 'fast-food',
        price: 9.99,
        InCart: 0
    },
    {
        img: "images/pan pizza.jpg",
        name: 'Pan Pizza',
        tag: 'fast-food',
        price: 7.99,
        InCart: 0
    },
    {
        img: "images/french fry.jpg",
        name: 'French Fry',
        tag: 'fast-food',
        price: 4.99,
        InCart: 0
    },
    {
        img: "images/dal tadka.jpg",
        name: 'Dal Tadka',
        tag: 'fast-food',
        price: 5.99,
        InCart: 0
    },
    {
        img: "images/chicken tandur.jpg",
        name: 'Chiken tandoor',
        tag: 'fast-food',
        price: 8.99,
        InCart: 0
    },
    {
        img: "images/barger.jpg",
        name: 'Burger',
        tag: 'fast-food',
        price: 3.99,
        InCart: 0
    }

]

for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}

function onloadcartNumber() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if (productNumbers) {
        document.querySelector('.cart').textContent = productNumbers;
    }
}

function cartNumbers(product) {

    let productNumbers = parseInt(localStorage.getItem('cartNumbers'));

    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart').textContent = 1;
    }
    setItem(product);
}

function setItem(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if (cartItems != null) {

        if (cartItems[product.name] == undefined) {
            cartItems = {
                ...cartItems,
                [product.name]: product
            }
        }
        cartItems[product.name].InCart += 1;
    } else {
        product.InCart = 1;
        cartItems = {
            [product.name]: product
        }
    }
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product) {
    console.log("the product price is ", product.price);
    let cartCost = localStorage.getItem('totalCost');
    console.log("my cart cost", cartCost);

    if (cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    } else {
        localStorage.setItem('totalCost', product.price);
    }
}

function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    console.log(cartItems);
    let productContainar = document.querySelector(".products");
    let cartCost = localStorage.getItem('totalCost');

    if (cartItems && productContainar) {
        productContainar.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainar.innerHTML += `
            <table class="table table-hover">
            <tbody>
              <tr class="row">
              <td class="col-3"><img src="${item.img}" width="50px" height="50px">&nbsp;${item.name}</td>
                <td class="col-2">${item.price}</td>
                <td class="col-3">
                    <ion-icon name="arrow-back-circle-outline"></ion-icon>
                    <span>${item.InCart}</span>
                    <ion-icon name="arrow-forward-circle-outline"></ion-icon>
                </td>
                <td class="col-2">${item.price * item.InCart}</td>
                <td class="col-2"><ion-icon name="trash-outline"></ion-icon></td>
              </tr>
            </tbody>
          </table>
            `
        });
        productContainar.innerHTML += `
        <table class="table table-hover">
        <tbody>
        <tr class="row">
              <td class="col-3"><strong>basket Totle</strong></td>
              <td class="col-2"></td>
              <td class="col-3"></td>
              <td class="col-2"> $${cartCost}</td>
              <td class="col-2"></td>
              </tr>
        </tbody>
        </table>
        `
    }
}
onloadcartNumber();
displayCart();

{/*  */}
 
 