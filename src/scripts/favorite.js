import { getLocalStorage, loadHeaderFooter, alertMessage } from "./utils.mjs";

loadHeaderFooter();

function renderFavoriteContents() {
  const cartItems = getLocalStorage("so-cart");
  if (cartItems === null){
    alertMessage("Please, choose a favorite from the lists first");
  } 
  console.log(cartItems);
  const htmlItems = cartItems.map((item) => favoriteItemTemplate(item));
  document.querySelector(".fList").innerHTML = htmlItems.join("");
}

function favoriteItemTemplate(item) {
  const entry = ` 
        <li> 
            <h2>${item.title}</h2>
            <p>${item.advice}</p>
        </li>
    `;
  return entry;
}

renderFavoriteContents();
