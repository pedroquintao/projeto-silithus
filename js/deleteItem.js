import { apiRequests } from "./requests.js";
import { showItems } from "./showItems.js";

const url = "http://localhost:8080/items"

async function deleteItem(event, item) {
    event.preventDefault();
    
    await apiRequests.deleteItem(url, item.id);

    showItems.buildList();
}

export function addDeleteListener(btn, item) {
    btn.addEventListener("click", event => deleteItem(event, item));
}
