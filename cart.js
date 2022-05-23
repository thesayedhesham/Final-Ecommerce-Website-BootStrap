let cart = JSON.parse(localStorage.getItem("cart"));

let totalItemPriceCell = document.getElementsByClassName("totalitemPrice");
let sumtotal;

let tableBody = document.getElementById("tableBody");

tableBuilder();

function tableBuilder() {
  tableBody.innerHTML = "";

  cart.forEach((iterator, index) => {
    tableBody.innerHTML += `
    <tr>
    <td><a href="#"></a><i style="cursor: pointer;" class="far fa-times-circle btn-remove"  onclick="removeAndBuild(${iterator.id})"></i></td>
    <td><img  src="${iterator.img1}" alt=""></td>
    <td>${iterator.name}</td>
    <td> <span class="itemPrice">${iterator.price}</span> EGP</td>
    <td><input class="countItem" type="number" min="0" value="1" onchange="testV(${iterator.price},value,${index})"></td>
    <td><span class="totalitemPrice">${iterator.price}</span> EGP</td>
    </tr>
    `;
  });
  sumsAtStart();
}

let removeBtns = document.getElementsByClassName("btn-remove");
for (let i = 0; i < removeBtns.length; i++) {
  removeBtns[i].addEventListener("click", function (event) {
    event.target.parentElement.parentElement.remove();
  });
}

function removeAndBuild(id) {
  for (const key in cart) {
    if (cart[key].id == id) {
      cart.splice(key, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }
  tableBuilder();
  sumsAtStart();
}

function testV(price, value, wheree) {
  sumtotal = 0;
  totalItemPriceCell[wheree].textContent = price * value;
  for (let index = 0; index < totalItemPriceCell.length; index++) {
    sumtotal += Number(totalItemPriceCell[index].textContent);
  }
  document.getElementById("total1").innerText = `${sumtotal} EGP`;
  document.getElementById(
    "total2"
  ).innerHTML = `<strong>${sumtotal} EGP</strong>`;
  console.log(sumtotal);
}

function sumsAtStart() {
  sumtotal = 0;
  for (let index = 0; index < totalItemPriceCell.length; index++) {
    sumtotal += Number(totalItemPriceCell[index].textContent);
  }
  document.getElementById("total1").innerText = `${sumtotal} EGP`;
  document.getElementById(
    "total2"
  ).innerHTML = `<strong>${sumtotal} EGP</strong>`;
  console.log(sumtotal);
}
