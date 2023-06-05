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

let submitButtonMode = "submit";

export function addUpdateListener(uptadeButton, item) {
    uptadeButton.addEventListener("click", () => {
        fillForms(item);
        toggleSubmitButtonListener(item);
    });
}

function fillForms(data) {
    const form = document.querySelectorAll(".form__selection");
    form.forEach((element, index) => element.value = normalizeWord(Object.values(data)[index + 1]));
}

function toggleSubmitButtonListener(item) {
    
    const dataSubmit = document.querySelector("[data-submit]"); 

    if(submitButtonMode === "submit") {
        dataSubmit.removeEventListener("submit", submitEvent);
        dataSubmit.addEventListener("submit", updateEvent)
        submitButtonMode = "update";
        submitButton.innerHTML = "<b>Update</b>"
    }

    else if(submitButtonMode === "update") {
        dataSubmit.removeEventListener("submit", updateEvent);
        dataSubmit.addEventListener("submit", submitEvent);
        submitButtonMode = "submit";
        submitButton.innerHTML = "<b>Register</b>";
    }
    dataSubmit.itemData = item;
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






