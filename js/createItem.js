import { apiRequests } from "./requests.js";
import { clearForms } from "./clearForms.js";
import { showItems } from "./showItems.js";

const url = "http://localhost:8080/items"

const submitBtn = document.querySelector("[data-submit]");

submitBtn.addEventListener("submit", event => createItem(event));

async function createItem(event) {
    
    event.preventDefault();

    const body = {
        name: document.querySelector("[data-name]").value.toUpperCase(),
        slot: document.querySelector("[data-slot]").value.toUpperCase().replace("-", "_"),
        rarity: document.querySelector("[data-rarity]").value.toUpperCase()
    }
    
    console.log('%ccreateItem.js line:19 body', 'color: #007acc;', body);

    await apiRequests.postItem(url, body);

    showItems.buildList();

    clearForms();
}