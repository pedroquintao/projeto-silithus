import { apiRequests } from "./requests.js";
import normalizeWord from "./normalizeWord.js";
import { submitEvent } from "./createItem.js";
import { showItems } from "./showItems.js";
import { clearForms } from "./clearForms.js";

const url = "http://localhost:8080/items",
    submitButton = document.getElementById("submit-button"),
    submitData = document.querySelector("[data-submit]"),
    formBars = document.querySelectorAll(".form__bar"),
    itemList = document.querySelector(".list__items");

export var UPDATE_MODE_ON = false;

export function addUpdateListener(element, item) {
    element.addEventListener("click", (event) => {

        if(UPDATE_MODE_ON){
            console.log('%cupdateItem.js line:51 Mensagem de erro: ', 'color: #007acc;', "Update mode is already on!");
            return;
        }
    
        const item = event.target.item;
        updateModeSetup(item, 'on');
    });

    element.item = item;
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
            return UPDATE_MODE_ON = true;
        
        case'off':
            submitData.removeEventListener("submit", updateEvent);
            submitData.addEventListener("submit", submitEvent);
            submitButton.innerHTML = "<b>Register</b>";
            document.querySelector("[data-form-title]").innerHTML = '<h1 class="title1" id="item-registration">Item Registration</h1><p class="paragraph1">Fill in the forms with the data of the item you want to register:</p>';
            highlightElements.forEach(element => element.classList.toggle("highlight"));
            return UPDATE_MODE_ON = false;
    }
}

function fillForms(data) {
    const formFields = submitData.querySelectorAll(".form__selection");
    formFields.forEach((element, index) => element.value = normalizeWord(Object.values(data)[index + 1])); //Adicionar ao guia.js
}

const updateEvent = async (event) => {
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
