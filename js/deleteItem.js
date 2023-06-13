import { apiRequests } from "./requests.js";
import { showItems } from "./showItems.js";
import { UPDATE_MODE } from "./updateItem.js";

const url = "http://localhost:8080/items"

async function deleteItem(event, item) {
    event.preventDefault();
    if(UPDATE_MODE){
        console.log('%cupdateItem.js line:51 Mensagem de erro: ', 'color: #007acc;', "You can't delete itens when update mode is on!");
        return;
    }
    await apiRequests.deleteItem(url, item.id);

    showItems.buildList();
}

export function addDeleteListener(deleteButton, item) {
    deleteButton.addEventListener("click", event => deleteItem(event, item));
}
