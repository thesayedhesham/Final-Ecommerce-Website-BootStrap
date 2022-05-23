// products page silder
var myIndex = 1;
displayImg(myIndex);
function p_slide(e) {
  displayImg((myIndex = e));
}
function side_slide(e) {
  displayImg((myIndex += e));
}
function displayImg(e) {
  var i;
  let img = document.querySelectorAll(".prod_imgs_show");
  let sliders = document.querySelectorAll(".btm_slides p");
  if (e > img.length) {
    myIndex = 1;
  } else if (e < 1) {
    myIndex = img.length;
  }
  for (i = 0; i < img.length; i++) {
    img[i].style.display = "none";
  }
  for (i = 0; i < img.length; i++) {
    sliders[i].style.background = "white";
  }
  img[myIndex - 1].style.display = "block";
  sliders[myIndex - 1].style.background = "#088179ab";
}
//==========================================================

// getting clicked item from LS
let LSproducts = JSON.parse(localStorage.getItem("products"));

let LSproduct = JSON.parse(localStorage.getItem("productDetailsItem"));
console.log(LSproduct);
//====================================================

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

//=========================================================
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

//==========================================
// build page with product Details Item
ProductBuilder(LSproduct);
function ProductBuilder(obj) {
  const mainl = document.querySelector("#product_details");

  let productCard = document.querySelector(".single_pro_img");

  document.querySelector("#simg1").setAttribute("src", obj.img1);
  document.querySelector("#simg2").setAttribute("src", obj.img2);
  document.querySelector("#simg3").setAttribute("src", obj.img3);
  document.querySelector("#simg4").setAttribute("src", obj.img4);

  document.querySelector("#prod_name").innerText = `${obj.name}`;
  document.querySelector("#brand").innerText = `${obj.brand}`;
  document.querySelector("#series").innerText = `${obj.series}`;

  let stars = document.querySelector(".starsrate");
  for (let index = 0; index < obj.stars; index++) {
    let starsElement = document.createElement("i");
    starsElement.classList.add("fa-solid");
    starsElement.classList.add("fa-star");
    starsElement.classList.add("star");
    stars.appendChild(starsElement);
  }

  document.querySelector("#device_price").innerHTML = `${obj.price} EGP`;

  document.querySelector(".about_list").innerText = `${obj.description}`;

  document
    .querySelector("#addItem")
    .setAttribute("onclick", `cartValue(${obj.id})`);
}

//=========================================
