import { apiRequests } from "./requests.js";

const url = "http://localhost:8080/items"

const submitBtn = document.querySelector("[data-submit]");

submitBtn.addEventListener("submit", event => createItem(event));

async function createItem(event) {
    
    event.preventDefault();

    const body = {
        name: document.querySelector("[data-name]").value.toUpperCase(),
        slot: document.querySelector("[data-slot]").value.toUpperCase(),
        rarity: document.querySelector("[data-rarity]").value.toUpperCase()
    }
    
    console.log('%ccreateItem.js line:19 body', 'color: #007acc;', body);

    await apiRequests.postItem(url, body);

    location.reload(); //É necessário atualizar a página? Ou seria melhor só adicionar o item?
}