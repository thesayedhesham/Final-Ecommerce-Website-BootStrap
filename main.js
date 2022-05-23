// ==========================================================================================
// slideShow
var myIndex = 0;
slideShow();
function slideShow() {
  var i;
  var x = document.getElementsByClassName("myImgs");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  myIndex++;
  if (myIndex > x.length) {
    myIndex = 1;
  }
  x[myIndex - 1].style.display = "block";
  setTimeout(slideShow, 2000);
}

// ==========================================================================================
// countDownDate banner

var countDownDate = new Date("May 20, 2022 5:27:25").getTime();

var x = setInterval(function () {
  var now = new Date().getTime();

  var distance = countDownDate - now;

  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("deadline").innerHTML =
    days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

  if (distance < 0) {
    clearInterval(x);
    document.getElementById("deadline").innerHTML = "EXPIRED";
    var elem = document.getElementById("slideShow");
    elem.parentNode.removeChild(elem);
  }
}, 1000);

//===============================================================
// intro

const splash = document.querySelector(".splash");
function hasCookie(coname) {
  var cookieArr = document.cookie.split("; ");
  for (let index = 0; index < cookieArr.length; index++) {
    if (cookieArr[index].split("=")[0] == coname) {
      return true;
    }
  }
  return false;
}

document.addEventListener("DOMContentLoaded", (e) => {
  if (!hasCookie("intro")) {
    setTimeout(() => {
      splash.classList.add("display-none");

      document.cookie =
        "intro=false; expires=Thu, 26 May 2022 12:00:00 UTC; path=/";
    }, 2000);
  } else {
    splash.classList.add("display-none");
  }
});

//===============================================================

// get items from local storage
let LSproducts = JSON.parse(localStorage.getItem("products"));

//====================================================================================================
// generating random 10 products list in home page
let productsListMainPage = [];
let randlist = new Set();
let rand;

while (randlist.size < 10) {
  rand = Math.floor(Math.random() * LSproducts.length);
  randlist.add(rand);
}
randlist.forEach((v) => {
  productsListMainPage = productsListMainPage.concat(LSproducts[v]);
});

//====================================================================================================
// Product Card Builder
mainPageProductBuilder(productsListMainPage);
function mainPageProductBuilder(productsListN) {
  const mainl = document.querySelector(".products-cont");
  productsListN.forEach((obj) => {
    let productCard = document.createElement("div");

    productCard.classList.add("pro-Cont");

    let imgContainer = document.createElement("div");
    imgContainer.classList.add("img_container");

    let imageElement = document.createElement("img");
    imageElement.classList.add("prods-imgs-view");
    imageElement.setAttribute("src", obj.img0);
    imageElement.setAttribute(
      "onclick",
      `clickedproductDetailsItem(${obj.id})`
    );
    imgContainer.appendChild(imageElement);
    productCard.appendChild(imgContainer);

    let categoryElement = document.createElement("h5");
    categoryElement.innerText = obj.category;
    productCard.appendChild(categoryElement);

    let nameElement = document.createElement("h4");
    nameElement.innerText = obj.name;
    productCard.appendChild(nameElement);

    for (let index = 0; index < obj.stars; index++) {
      let starsElement = document.createElement("i");
      starsElement.classList.add("fa-solid");
      starsElement.classList.add("fa-star");
      starsElement.classList.add("star");
      productCard.appendChild(starsElement);
    }

    let priceElement = document.createElement("p");
    priceElement.innerHTML = `<strong>EGP ${obj.price}</strong>`;
    productCard.appendChild(priceElement);

    let cartElement = document.createElement("i");

    cartElement.classList.add("fa-solid");
    cartElement.classList.add("fa-cart-plus");
    cartElement.classList.add("cart");
    cartElement.classList.add("clickSound");
    cartElement.setAttribute("onclick", `cartValue(${obj.id})`);
    productCard.appendChild(cartElement);

    mainl.appendChild(productCard);
  });
}
// =======================================================
// getting id value of clicked item

JSON.parse(localStorage.getItem("cart")) == null
  ? localStorage.setItem("cart", JSON.stringify([]))
  : false;

let cart = JSON.parse(localStorage.getItem("cart"));
document.getElementById("count").innerText = cart.length;

function cartValue(id) {
  myAudio.play();

  for (const iterator of LSproducts) {
    if (iterator.id == id) {
      console.log(id);
      cartItems(iterator);
    }
  }
}

// Add Item to Cart and checkes if it's already exist
function cartItems(obj) {
  if (cart.includes(obj)) {
    return alert(
      "Item already exists in Cart \nClick on Cart Icon for removing"
    );
  }

  cart = cart.concat(obj);
  console.log(cart);
  localStorage.setItem("cart", JSON.stringify(cart));
  document.getElementById("count").innerText = cart.length;
}
//==============================================================
// go to clicked productDetails Item with value in LS

function clickedproductDetailsItem(id) {
  for (const iterator of LSproducts) {
    if (iterator.id == id) {
      localStorage.setItem("productDetailsItem", JSON.stringify(iterator));
      location.href = "/product.html";
    }
  }
}

//====================================================
