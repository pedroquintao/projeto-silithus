import { apiRequests } from "./requests.js";
import normalizeWord from "./normalizeWord.js";
import { addDeleteListener } from "./deleteItem.js";
import { addUpdateListener } from "./updateItem.js";
import { clearForms } from "./clearForms.js";


const url = "http://localhost:8080/items"
const list = document.querySelector("[data-list]");

function buildItem(item) {
    const itemList = document.createElement("li");

    itemList.innerHTML = `<div class="list__items__item" data-id="${item.id}" data-name="${item.name}" data-slot="${item.slot}" data-rarity="${item.rarity}" data-item-div>
                            <div class="list__items__item__box">
                                <div class="list__items__item__box__itemname">
                                    <strong class="list__items__item__box__itemname__name">${normalizeWord(item.name)}</strong>
                                </div>
                                <div class="crud_buttons">
                                <button class="item__update__button" data-update-button>U</button>
                                <button class="item__delete__button" data-delete-button>X</button>   
                                </div>              
                            </div>
                            <ul class="dropdown">
                                <li class="dropdown__item">
                                    <p>${normalizeWord(item.name)}</p>        
                                </ 
                                <li class="dropdown__item">
                                    <p>${normalizeWord(item.slot)}</p>
                                </ 
                                <li class="dropdown__item">
                                    <p>${normalizeWord(item.rarity)}</p>
                                </li>
                            </ul>
                        </div>`;

    const deleteButton = itemList.querySelector("[data-delete-button]");
    const updateButton = itemList.querySelector("[data-update-button]");

    addDeleteListener(deleteButton, item);
    addUpdateListener(updateButton, item);

    return itemList;
}

async function buildList() {
    const itemList = await apiRequests.getItems(url);
    list.innerHTML = "";
    itemList.content.forEach(element => list.appendChild(buildItem(element)));
    clearForms();

    // console.log(itemList.content)
}

buildList();

export const showItems = { 
    buildItem, 
    buildList 
};