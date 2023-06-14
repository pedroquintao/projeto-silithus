import { apiRequests } from "./requests.js";
import normalizeWord from "./normalizeWord.js";
import { submitEvent } from "./createItem.js";
import { showItems } from "./showItems.js";
import { clearForms } from "./clearForms.js";


const url = "http://localhost:8080/items";
const submitButton = document.getElementById("submit-button");
const submitData = document.querySelector("[data-submit]"); 
const formBars = document.querySelectorAll(".form__bar");
const itemList = document.querySelector(".list__items")

const updateEvent = (event) => {
    updateItem(event);
}

export var UPDATE_MODE = false;

export function addUpdateListener(updateButton, item) {
    updateButton.addEventListener("click", updateButtonClick);
    updateButton.item = item;
}

const updateButtonClick = (event) => {
    if(UPDATE_MODE){
        console.log('%cupdateItem.js line:51 Mensagem de erro: ', 'color: #007acc;', "Update mode is already on!");
        return;
    }

    const item = event.target.item;
    updateModeSetup(item, 'on');
}

function fillForms(data) {
    const formFields = submitData.querySelectorAll(".form__selection");
    formFields.forEach((element, index) => element.value = normalizeWord(Object.values(data)[index + 1])); //Adicionar ao guia.js
}

function updateModeSetup(item, state) {
    
    submitData.itemData = item;
    const itemBar = itemList.querySelector(`[data-id="${item.id}"]`)
    const highlightElements = [itemBar];
    formBars.forEach(element => highlightElements.push(element));

    switch(state) {
        case 'on':
            fillForms(item);
            submitData.removeEventListener("submit", submitEvent);
            submitData.addEventListener("submit", updateEvent);
            submitButton.innerHTML = "<b>Update</b>";
            document.querySelector("[data-form-title]").innerHTML = '<h1 class="title1" id="item-registration">Update Mode</h1><p class="paragraph1">Fill in the forms with the data of the item you want to update:</p>';
            highlightElements.forEach(element => element.classList.toggle("highlight"));
            console.log('%cupdateItem.js line:60 object', 'color: #007acc;', "Rodo");
            return UPDATE_MODE = true;
        
        case'off':
            submitData.removeEventListener("submit", updateEvent);
            submitData.addEventListener("submit", submitEvent);
            submitButton.innerHTML = "<b>Register</b>";
            document.querySelector("[data-form-title]").innerHTML = '<h1 class="title1" id="item-registration">Item Registration</h1><p class="paragraph1">Fill in the forms with the data of the item you want to register:</p>';
            highlightElements.forEach(element => element.classList.toggle("highlight"));
            return UPDATE_MODE = false;
    }
}

async function updateItem(event) {
    event.preventDefault();

    const dataSubmit = event.target;
    const currentFormInputData = {
        id: dataSubmit.itemData.id,
        name: dataSubmit.querySelector("[data-name]").value.toUpperCase(),
        slot: dataSubmit.querySelector("[data-slot]").value.toUpperCase().replace("-", "_"),
        rarity: dataSubmit.querySelector("[data-rarity]").value.toUpperCase()
    }

    await apiRequests.putItem(url, currentFormInputData);    
    showItems.buildList();
    clearForms();
    updateModeSetup(currentFormInputData, 'off');
}