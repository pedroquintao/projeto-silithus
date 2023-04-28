const list = document.querySelector('#list-items'); // Seleciona o elemento com id "list-items" e o armazena na constante list
const form = document.querySelector('#form'); //Seleciona o elemento com o id "form" e o armazena na constante form

var items = JSON.parse(localStorage.getItem('forms-data')) || [];

drawList(); 

form.addEventListener('submit', (evt) => {
    
    evt.preventDefault();
    
    const inputName = evt.target.elements['form-name'];
    const inputSlot = evt.target.elements['form-slot'];
    const inputRarity = evt.target.elements['form-rarity'];

    const inputItem = createInputItem(inputName, inputSlot, inputRarity);

    
    if(checkItemExistence(inputItem.name)) {
        const existendItem = checkItemExistence(inputItem.name);
        inputItem.Id = existendItem.Id;
        updateItem(inputItem);
        console.log('%cmain.js line:18 inputItem', 'color: #007acc;', existendItem);

    }

    else {
        const itemId = items[items.length -1]? items[items.length -1].Id + 1 : 0;

        inputItem.Id = itemId;
        createItem(inputItem);

        items.push(inputItem);
    }
    localStorage.setItem("forms-data", JSON.stringify(items));

    location.reload();

    clearForms();
});

function drawList(){
    items.forEach(elt => createItem(elt));
}

function createInputItem(inputName, inputSlot, inputRarity) {

    return {
        name: inputName.value,
        slot: inputSlot.value,
        rarity: inputRarity.value            
        };
};

function checkItemExistence(name) {
    return items.find(elt => elt.name === name);
};

function clearForms() {
    const formsToClear = document.querySelectorAll('.form__selection')

    formsToClear.forEach(element => {
        element.value = "";  
    });
}

function createItem(item) {

    const newItem = document.createElement('div'); //NS1

    newItem.innerHTML = `<li class="list__items__item" data-id="${item.Id}" data-name="${item.name}" data-slot="${item.slot}" data-rarity="${item.rarity}">
                            <div class="list__items__item__box">
                                <strong>${item.name}</strong> 
                                <button class="item__delete__button">X</button>                 
                            </div>
                            <ul class="dropdown">
                                <li class="dropdown__item">
                                    <p>${item.name}</p>        
                                </ 
                                <li class="dropdown__item">
                                        <p>${item.slot}</p>
                                </ 
                                <li class="dropdown__item">
                                    <p>${item.rarity}</p>
                                </li>
                            </ul>
                        </li>`;
                        
    newItem.addEventListener('click', function() {
        const dropDown = this.querySelector('.dropdown');
        dropDown.classList.toggle('dropdown-show');
    })
    
    list.appendChild(newItem);
}

function updateItem(item) {
        items[items.findIndex(elt => elt.Id === item.Id)] = item;
}

function addDeleteButton(id) {
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('item__delete__button');
    deleteButton.innerText = 'X';
    deleteButton.addEventListener('click', function() {
        deleteItem((this.parentNode), id);
    });
    return deleteButton;
}

function deleteItem(tag, id){
    tag.parentNode.remove();
    items.splice(items.findIndex(elt => elt.Id === id), 1);
    localStorage.setItem("forms-data", JSON.stringify(items));
}


document.querySelector('.clearLS').addEventListener('click', () => {
    localStorage.clear();
    location.reload();
    }
);
    

// =================================================================================================================
//                                                     Next Step
// =================================================================================================================

//NS1 - Criar o elemento sem que essa linha seja necessária

//refatorar a criação do inputItem


