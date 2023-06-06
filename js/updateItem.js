import { apiRequests } from "./requests.js";
import normalizeWord from "./normalizeWord.js";
import { submitEvent } from "./createItem.js";
import { showItems } from "./showItems.js";
import { clearForms } from "./clearForms.js";


const url = "http://localhost:8080/items";
const submitButton = document.getElementById("submit-button");
const updateEvent = (event) => {
    updateItem(event);
    toggleSubmitButtonListener();

}

let submitButtonMode = true;

export function addUpdateListener(updateButton, item) {
    updateButton.addEventListener("click", updateButtonClick);
    updateButton.item = item;
}

function fillForms(data) {
    const form = document.querySelectorAll(".form__selection");
    form.forEach((element, index) => element.value = normalizeWord(Object.values(data)[index + 1])); //Adicionar ao guia.js
}

function toggleSubmitButtonListener(item) {
    
    const dataSubmit = document.querySelector("[data-submit]"); 

    if(submitButtonMode === true) {
        dataSubmit.removeEventListener("submit", submitEvent);
        dataSubmit.addEventListener("submit", updateEvent)
        submitButtonMode = false;
        submitButton.innerHTML = "<b>Update</b>"
    }

    else if(submitButtonMode === false) {
        dataSubmit.removeEventListener("submit", updateEvent);
        dataSubmit.addEventListener("submit", submitEvent);
        submitButtonMode = true;
        submitButton.innerHTML = "<b>Register</b>";

    }
    dataSubmit.itemData = item;
}

const updateButtonClick = (event) => {
    const item = event.target.item;
    fillForms(item);
    toggleSubmitButtonListener(item);
    event.target.removeEventListener("click", updateButtonClick)
}

function toggleHighLightMode(item) {
    const itemBar = document.querySelector(`[data-id="${item.id}"]`)
    const formBars = document.querySelectorAll(".form__bar");
    const highlightElements = [itemBar];
    formBars.forEach(element => highlightElements.push(element));
    highlightElements.forEach(element => element.classList.toggle("highlight"));
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
}






