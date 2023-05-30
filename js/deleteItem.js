import { apiRequests } from "./requests.js";

const url = "http://localhost:8080/items"

async function deleteItem(event, id) {
    event.preventDefault();
    
    await apiRequests.deleteItem(url, id)

    location.reload(); //É necessário atualizar a página? Ou tem alguma outra forma de fazer isso?
}
export function addDeleteListener(node) {
    
    const buttonNode = node.querySelector("[data-delete-button]");
    const itemDivId = node.querySelector("[data-item-div]").dataset.id

    buttonNode.addEventListener("click", event => deleteItem(event, itemDivId));
}
