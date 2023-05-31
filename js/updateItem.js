import { apiRequests } from "./requests.js";
import normalizeWord from "./normalizeWord.js";

const url = "http://localhost:8080/items";

async function updateItem(event, item) {
    event.preventDefault(); 

    await apiRequests.putItem(url, item);

    // console.log('%cupdateItem.js line:6 object', 'color: #007acc;', submitButton);
    
}

function fillForms(data) {
    const form = document.querySelectorAll(".form__selection");
    const dataArray = Object.values(data);

    form.forEach((element, index) => element.value = normalizeWord(dataArray[index + 1]));
}

export function addUpdateListener(btn, item) {
    btn.addEventListener("click", event => {
        fillForms(item);
        toggleSubmitButtonListener(event, item);
    });
}

function toggleSubmitButtonListener(event, item) {
    event.preventDefault();

    const submitButton = document.querySelector("[data-submit]"); 

    submitButton.addEventListener("submit", (evt) => updateItem(evt, item))
}

