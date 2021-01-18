const productos = [
    {
        nombre: "harina",
        precio: 35
    },
    {
        nombre: "pan",
        precio: 25
    },
    {
        nombre: "papa",
        precio: 52
    },
    {
        nombre: "palta",
        precio: 55
    },
    {
        nombre: "fideos",
        precio: 85
    },
    {
        nombre: "aceite",
        precio: 350
    },
    {
        nombre: "sopa",
        precio: 86
    },
    {
        nombre: "mermelada",
        precio: 108
    },
    {
        nombre: "porotos",
        precio: 69
    },
    {
        nombre: "lentejas",
        precio: 85
    },
    {
        nombre: "mandarina",
        precio: 43
    },
    {
        nombre: "banana",
        precio: 79
    },
    {
        nombre: "leche de almendras",
        precio: 145
    },
    {
        nombre: "papel higiénico",
        precio: 147
    },
    {
        nombre: "lavandina",
        precio: 55
    },
    {
        nombre: "alcohol en gel",
        precio: 123
    },
    {
        nombre: "shampoo",
        precio: 400
    },
    {
        nombre: "arroz",
        precio: 66
    },
    {
        nombre: "salsa de tomate",
        precio: 35
    },
];

let drawProducts = () => {

    // use i as index from "forEach" method
    productos.forEach((producto, i) => { 

        // create box with id, class and eventlistener
        let productSection = document.getElementById("product-section"); 
        let productContainer = document.createElement('div'); 
        productContainer.id = `product${i}`; 
        productContainer.className = 'product-box enabled';
        productContainer.addEventListener("click", buy);

        // create inner structure of div (image and two paragraphs)
        let imageContainer = document.createElement('div');
        imageContainer.className = 'img-box';
        let productImage = document.createElement('img');
        productImage.className = 'product-img';
        productImage.src = `img/${producto.nombre.replace(/ /g, '_').replace('é', 'e')}.jpg`;
        productImage.setAttribute('draggable', false);

        let productName = document.createElement('p');
        let productPrice = document.createElement('p');
        productPrice.className = 'price-text';
        let productNameText = document.createTextNode(`${producto.nombre.toUpperCase()}`);
        let productPriceText = document.createTextNode(`$${producto.precio}`);

        // assign every element to a parent
        productName.appendChild(productNameText);
        productPrice.appendChild(productPriceText);
        imageContainer.appendChild(productImage);
        productContainer.appendChild(imageContainer);
        productContainer.appendChild(productName);
        productContainer.appendChild(productPrice);
        productSection.appendChild(productContainer);

    })
}

let buy = (e) => {

    // remove event listener and set disabled class
    let product = e.currentTarget;
    product.removeEventListener("click", buy);
    product.classList.remove('enabled');
    product.classList.add('disabled');

    // create line of shopping list (delete icon, name and price of product)
    // and assign class and modified id from product box
    let productContainer = document.createElement('div');
    productContainer.className = 'product-list-container';
    productContainer.id = `cart${product.id.replace('product', '')}`;
    let deleteProductBox = document.createElement('div');
    deleteProductBox.className = 'delete-product-box';

    let deleteIcon = document.createElement('img');
    deleteIcon.className = 'product-list-img';
    // add remove event listener
    deleteIcon.addEventListener("click", remove);
    deleteIcon.src = 'img/delete_icon.png';
    deleteIcon.id = `cart${product.id.replace('product', '')}`;
    deleteIcon.setAttribute('draggable', false);

    let productName = document.createElement('span');
    productName.className = 'product-list-name';

    let productPrice = document.createElement('span');
    productPrice.className = 'product-list-price';

    let productNameText = document.createTextNode(`${product.querySelector('p').textContent}`);
    let productPriceText = document.createTextNode(`${product.querySelector('.price-text').textContent}`);

    // assign every element to a parent
    productName.appendChild(productNameText);
    productPrice.appendChild(productPriceText);

    deleteProductBox.appendChild(deleteIcon);
    deleteProductBox.appendChild(productName);

    productContainer.appendChild(deleteProductBox);
    productContainer.appendChild(productPrice);

    // put list items to the end of the list
    document.querySelector('.cart-end').before(productContainer);

    // set total price
    let selectedPrice = parseInt(productPriceText.textContent.replace('$', ''));
    let totalPrice = parseInt(document.querySelector('span.total-text').textContent.replace('$', ''));
    document.querySelector('span.total-text').textContent = '$' + (totalPrice + selectedPrice);


}

let remove = (e) => {
    // locate product to delete and product to enable and save them into variables
    let productToDelete = e.currentTarget.parentNode.parentNode;
    let productToEnable = document.querySelector(`#product${productToDelete.id.replace('cart', '')}`);

    // remove product from list, enable prduct box and set buy event listener back
    productToDelete.remove();
    productToEnable.addEventListener("click", buy);
    productToEnable.classList.add('enabled');
    productToEnable.classList.remove('disabled');

    // adjust total price from shopping list
    let selectedPrice = parseInt(productToEnable.querySelector('.price-text').textContent.replace('$', ''));
    let totalPrice = parseInt(document.querySelector('span.total-text').textContent.replace('$', ''));
    document.querySelector('span.total-text').textContent = '$' + (totalPrice - selectedPrice);

}

let run = () => {
    drawProducts();
}