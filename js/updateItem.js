import { apiRequests } from "./requests.js";
import normalizeWord from "./normalizeWord.js";

const url = "http://localhost:8080/items";

async function upgradeItem(event, item) {
    event.preventDefault();
    fillForms(item);

    const submitButton = document.querySelector("[data-submit]"); 
    submitButton.addEventListener('submit', (event) => {
        event.preventDefault();
        apiRequests.editItem(url, item)
    });

    console.log('%cupdateItem.js line:6 object', 'color: #007acc;', submitButton);
    
}

export function addUpdateListener(btn, item) {
    btn.addEventListener("click", event => upgradeItem(event, item));
}

function fillForms(data) {
    const form = document.querySelectorAll(".form__selection");
    const dataArray = Object.values(data);

    form.forEach((element, index) => element.value = normalizeWord(dataArray[index + 1]));
}
