export function clearForms() {
    const formsToClear = document.querySelectorAll('.form__selection')

    formsToClear.forEach(element => {
        element.value = "";  
    });
}
