import { apiRequests } from "./requests.js";
import { clearForms } from "./clearForms.js";
import { showItems } from "./showItems.js";

const url = "http://localhost:8080/items"

const dataSubmit = document.querySelector("[data-submit]");

export const submitEvent = (event) => {
    createItem(event);
}

dataSubmit.addEventListener("submit", submitEvent);

async function createItem(event) {
    event.preventDefault();

    const body = {
        name: document.querySelector("[data-name]").value.toUpperCase(),
        slot: document.querySelector("[data-slot]").value.toUpperCase().replace("-", "_"),
        rarity: document.querySelector("[data-rarity]").value.toUpperCase()
    }
    
    await apiRequests.postItem(url, body);

    showItems.buildList();

    clearForms();
}

