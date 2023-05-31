import { apiRequests } from "./requests.js";

const url = "http://localhost:8080/items"

async function deleteItem(event, item) {
    event.preventDefault();
    
    await apiRequests.deleteItem(url, item.id);

    location.reload(); //É necessário atualizar a página? Ou tem alguma outra forma de fazer isso?
}

export function addDeleteListener(btn, item) {
    btn.addEventListener("click", event => deleteItem(event, item));
}
