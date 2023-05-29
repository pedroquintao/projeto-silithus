import { apiRequests } from "./requests";
const url = "http://localhost:8080/items"

const submitBtn = document.querySelector("[data-submit]");

submitBtn.addEventListener("submit", event => createItem(event));

async function createItem(event) {
    
    event.preventDefault();

    const body = {
        id: undefined,
        name: document.querySelector("[data-name]").value.toUpperCase(),
        slot: document.querySelector("[data-slot]").value.toUpperCase(),
        rarity: document.querySelector("[data-rarity]").value.toUpperCase()
    }
    
    await apiRequests.postItem(url, body);

}