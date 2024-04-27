// let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
// let total = 0;
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let total = 0;

function openingcart() {
    const cartContainer = document.getElementById("cart-container");
    const dishesContainer = document.querySelector(".dishes");

    if (cartContainer.style.display !== "block") {
        cartContainer.style.display = "block";
    }

    if (dishesContainer) {
        dishesContainer.style.gridTemplateColumns = "repeat(2, 1fr)";
        dishesContainer.style.width = "63.5%";
    }

    updateCartDisplay();
}

function cleanUpCart() {
    cart = cart.filter(item => item.name !== undefined && item.name !== "Default Name");
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

function result() {
    const activeButton = document.querySelector('.variant-button.active');

    if (activeButton) {
        const variantValue = activeButton.getAttribute('value');
        const variantText = activeButton.innerText.trim();

        var productName = variantText;
    } else {
        console.error('No active button found');
    }

    const clickedElement = document.activeElement;
    const variantText = clickedElement.innerText.trim();
    const itemPrice = parseFloat(
        clickedElement.previousElementSibling.textContent.slice(1)
    );
    const itemImage = clickedElement.parentElement.parentElement.querySelector("img").src;

    const cartItem = {
        name: productName,
        price: itemPrice,
        quantity: 1,
        image: itemImage,
    };

    alert(productName);

    addToCart(cartItem);
    updateCartDisplay();
}

function addToCart(item) {
    if (item.name === undefined) {
        console.error('Item name is undefined. Cannot add item to cart.');
        return;
    }

    const existingItem = cart.find((cartItem) => cartItem.name === item.name);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push(item);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartDisplay() {
    total = 0; // Reset total to zero

    const cartItemsContainer = document.getElementById("cart-items");
    cartItemsContainer.innerHTML = "";

    cart.forEach((item) => {
        const cartItemHTML = `
            <li>
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <div class="cart-item-price">
                        <span>Price: ₹${item.price.toFixed(2)}</span>
                        <div class="quantity-controls">
                            <button class="quantity-btn minus" onclick="updateQuantity('${item.name}', -1)">-</button>
                            <span class="quantity">${item.quantity}</span>
                            <button class="quantity-btn plus" onclick="updateQuantity('${item.name}', 1)">+</button>
                        </div>
                    </div>
                </div>
            </li>
        `;

        cartItemsContainer.innerHTML += cartItemHTML;
        total += item.price * item.quantity;
    });

    const cartTotal = document.getElementById("cart-total");
    cartTotal.textContent = `₹${total.toFixed(2)}`;
    const cartContainer = document.getElementById("cart-container");
    cartContainer.style.backgroundColor = "white";
    cartContainer.style.color = "black";
}

function updateQuantity(itemName, change) {
    const item = cart.find((cartItem) => cartItem.name === itemName);
    if (item) {
        total -= item.price * item.quantity; // Subtract the value of the item being removed
        item.quantity += change;
        if (item.quantity < 1) {
            cart.splice(cart.indexOf(item), 1);
        }
        total += item.price * item.quantity; // Add the updated value of the item
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

function closingcart() {
    const cartContainer = document.getElementById("cart-container");
    const cartCloseButton = document.getElementById("cart-close");
    const dishesContainer = document.querySelector(".dishes");

    cartCloseButton.addEventListener("click", () => {
        cartContainer.style.display = "none";
        if (dishesContainer) {
            dishesContainer.style.gridTemplateColumns = "repeat(3, 1fr)";
            dishesContainer.style.width = "92%";
        }
    });

    cartContainer.addEventListener("click", (event) => {
        event.stopPropagation();
    });
}

function setbutton(clickedBtn) {
    const buttons = document.querySelectorAll('.variant-button');
    buttons.forEach(button => button.classList.remove('active'));
    clickedBtn.classList.add('active');

    const cost = document.getElementById('product-price');
    cost.textContent = clickedBtn.getAttribute('value');

    const addToCartButton = document.querySelector('.add-to-cart-btn');
    addToCartButton.setAttribute('value', clickedBtn.getAttribute('value'));
}

function clearCart() {
    cart = [];
    localStorage.removeItem('cart');
    updateCartDisplay(); // Update the display to reflect the cleared cart
}

window.addEventListener('beforeunload', () => {
    // Clear the cart when the user leaves the page
    clearCart();
});
function checkout() {
  total = calculateTotal(); // Calculate the total before redirecting
  localStorage.setItem('cartTotalAmount', total.toFixed(2));

  // Redirect to the checkout page
  window.location.href = `checkout.html?total=${total.toFixed(2)}`;
}


function calculateTotal() {
  let total = 0;
  cart.forEach(item => {
      total += item.price * item.quantity;
  });
  return total;
}

document.addEventListener('DOMContentLoaded', function () {
    // Extract the total amount from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const totalAmount = urlParams.get('total');

    // Display the total amount on the payment page
    const outputElement = document.getElementById('output');
    if (outputElement) {
        outputElement.textContent = `₹${totalAmount || '0.00'}`;
    }
});

// Rest of your existing code...
$(function () {
  $('[data-toggle="popover"]').popover();

  $('#cvc').on('click', function () {
    if ($('.cvc-preview-container').hasClass('hide')) {
      $('.cvc-preview-container').removeClass('hide');
    } else {
      $('.cvc-preview-container').addClass('hide');
    }
  });

  $('.cvc-preview-container').on('click', function () {
    $(this).addClass('hide');
  });
});
