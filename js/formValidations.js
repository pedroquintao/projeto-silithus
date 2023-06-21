const formFields = document.querySelectorAll('.form__bar');
const errorMessage = document.querySelector('[data-span-name]')
formFields.forEach(element => {
    element.addEventListener('blur', (event) => fieldVerification(event.target));
    element.addEventListener('invalid', event => event.preventDefault());
});

const errorTypes = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'tooShort',
    'customError'
];

const messages = {
    name: {
        valueMissing: "O campo de nome não pode estar vazio.",
        patternMismatch: "Por favor, preencha um nome válido.",
        tooShort: "Por favor, preencha um nome válido."
    },
    slot: {
        valueMissing: "O campo de slot não pode estar vazio.",
    },
    rarity: {
        valueMissing: "O campo de raridade não pode estar vazio.",
    }
}

function fieldVerification(field) {
    let message = '';
    field.setCustomValidity('');

    errorTypes.forEach(e => {
        if(field.validity[e]) {
            message = messages[field.name][e];
        }
    })

    const spanMessage = field.parentNode.querySelector('.span__message');
    const inputValidator = field.checkValidity();

    if(!inputValidator) {
        spanMessage.textContent = message;
    }
    else {
        spanMessage.textContent = '';
    }
}