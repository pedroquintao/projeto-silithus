import { apiRequests } from "./requests.js";
import normalizeWord from "./normalizeWord.js";
import { submitEvent } from "./createItem.js";

const url = "http://localhost:8080/items";
const submitButton = document.getElementById("submit-button");

async function updateItem(item) {
    console.log('%cupdateItem.js line:10 item', 'color: #007acc;', item);
    await apiRequests.putItem(url, item);    
}

function fillForms(data) {
    const form = document.querySelectorAll(".form__selection");
    form.forEach((element, index) => element.value = normalizeWord(Object.values(data)[index + 1]));
}

export function addUpdateListener(uptadeButton, item) {
    uptadeButton.addEventListener("click", event => {
        fillForms(item);
        toggleSubmitButtonListener(event, item);
    });
}

function toggleSubmitButtonListener(event, item) {
    event.preventDefault();
    console.log('%cupdateItem.js line:28 updateEvent', 'color: #007acc;', updateEvent);
    console.log('%cupdateItem.js line:28 item', 'color: #007acc;', item);
    submitButton.innerHTML = "<b>Update</b>"
    const dataSubmit = document.querySelector("[data-submit]"); 
    const envio = {
        item: item, 
        data: dataSubmit
    };
    console.log('%cupdateItem.js line:32 envio', 'color: #007acc;', envio);
    dataSubmit.removeEventListener("submit", submitEvent);
    dataSubmit.addEventListener("submit", updateEvent)
}

const updateEvent = (event) => {
    event.preventDefault();
    console.log('%cupdateItem.js line:42 this', 'color: #007acc;', this);
    // console.log('%cupdateItem.js line:37 this[0]', 'color: #007acc;', this[0]);
    // updateItem(this[0]);
    // this[1].removeEventListener();
    // this[1].addEventListener("submit", submitEvent);
    submitButton.innerHTML = "<b>Register</b>";
}