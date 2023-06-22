const formFields = document.querySelectorAll('.form__bar');

formFields.forEach(element => {
    element.addEventListener('blur', (event) => fieldVerification(event.target));
    const elementTag = element.tagName;

    switch(elementTag){
        case 'INPUT':
            element.addEventListener('keypress', (event) => fieldVerification(event.target));
            break;
        case 'SELECT' || 'CHECKBOX':
            element.addEventListener('change', (event) => fieldVerification(event.target));
            break;
    }

    element.addEventListener('invalid', (event) => {
        event.preventDefault();
        showErrorMessage(element);
    })}
);

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

function showErrorMessage(field) {
    let message = '';
    field.setCustomValidity('');

    errorTypes.forEach(e => {
        if(field.validity[e]) {
            message = messages[field.name][e];
        }
    })

    // const inputValidator = field.checkValidity();
    const spanMessage = field.parentNode.querySelector('.span__message');

    // if(!inputValidator) {
        spanMessage.textContent = message;
    // }
    // else {
        // spanMessage.textContent = '';
//     }
}

function fieldVerification(field) {
    if(!field.checkValidity()) {
        showErrorMessage(field);
    }
    else {
        const spanMessage = field.parentNode.querySelector('.span__message');
        spanMessage.textContent = '';
    }
}