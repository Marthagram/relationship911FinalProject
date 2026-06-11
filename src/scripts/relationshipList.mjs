import {
  renderListWithTemplate,
  getLocalStorage,
  setLocalStorage,
  alertMessage,
} from "./utils.mjs";

function relationshipTemplate(relationship) {

  
  return `
    <li>
      <h3>${relationship.title}</h3>
      <p>${relationship.advice}</p>
      <button class="favoriteButton" data-id="${relationship.id}">Add to Favorites</button>
    </li>
  `;
}

export default class relationshipList {
  constructor(category, datasource, listElement) {
    this.category = category;
    this.datasource = datasource;
    this.listElement = listElement;
    this.relationship = {};
  }

  async init() {
    const list = await this.datasource.getData();
    console.log("Loaded list:", list);

    this.renderList(list);

    this.listElement.addEventListener("click", async (e) => {
      if (e.target.classList.contains("favoriteButton")) {
        const clickedId = e.target.getAttribute("data-id");
        console.log("Clicked item ID:", clickedId);

        const favorite = await this.datasource.findProductById(clickedId);

        this.addFavorite(favorite, e.target);
      }
    });
  }

  renderList(list) {
    renderListWithTemplate(relationshipTemplate, this.listElement, list);
  }

  addFavorite(favorite, buttonElement) {
    if (!favorite) {
      alertMessage("Please select a valid item to add to favorites.");
      console.error("No valid favorite data found!");
      return;
    }

    // 1. Grab whatever is currently in localStorage
    const cartItems = getLocalStorage("so-cart") || [];

    // 2. Use lowercase .id matching your JSON fields and .some() for clean true/false flag
    const isAlreadyFavorite = cartItems.some((item) => item.id === favorite.id);

    if (!isAlreadyFavorite) {
      // 3. Securely push the new item into our local array copy
      cartItems.push(favorite);

      // 4. Overwrite the key with the newly expanded array list
      setLocalStorage("so-cart", cartItems);

      console.log("Successfully added to favorites!");
      alertMessage("Added to favorites!");

      if (buttonElement) {
        buttonElement.textContent = "Added";
        buttonElement.disabled = true;
      }
    } else {
      console.log("Item is a duplicate. Skipping save.");
      alertMessage("This item is already in your favorites list!");
    }
  } 
}
