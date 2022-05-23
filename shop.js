let LSproducts = JSON.parse(localStorage.getItem("products"));

//============================================================================================
// filtered list default is none checked get all items

function filteredListBuilder() {
  let filteredList = [];
  let filteredList2 = [];

  for (
    index = 0;
    index < document.getElementsByClassName("filterChecker").length;
    index++
  ) {
    filteredList = [];
    if (document.getElementsByClassName("filterChecker")[index].checked) {
      filteredList = LSproducts.filter((object) => {
        return (
          object.category ==
          document.getElementsByClassName("filterChecker")[index].value
        );
      });
      filteredList2 = filteredList2.concat(filteredList);
    }
  }
  filteredList2.length === 0
    ? mainPageProductBuilder(LSproducts)
    : mainPageProductBuilder(filteredList2);
  console.log(filteredList2);
}


//====================================================================================================
// generating random 10 products list in home page
let productsListMainPage = [];
let randlist = new Set();
let rand;

while (randlist.size < LSproducts.length) {
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
  mainl.innerHTML = "";
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
//=============================================================================

// go to clicked productDetails Item with value in LS

function clickedproductDetailsItem(id) {
  for (const iterator of LSproducts) {
    if (iterator.id == id) {
     
      localStorage.setItem("productDetailsItem", JSON.stringify(iterator));
      location.href = "/product.html"
    }
  }
}
