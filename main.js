const list = document.querySelector('#list-items'); // Seleciona o elemento com id "list-items" e o armazena na constante list
const form = document.querySelector('#form'); //Seleciona o elemento com o id "form" e o armazena na constante form

var items = JSON.parse(localStorage.getItem('forms-data')) || [];

drawList(); 

addSubimitListener(form);

addClearLSButtonListener();

function drawList(){
    items.forEach(elt => createItem(elt));
}

function addSubimitListener(forms) {

    forms.addEventListener('submit', (evt) => {
        
        evt.preventDefault();
        
        const inputName = evt.target.elements['form-name'];
        const inputSlot = evt.target.elements['form-slot'];
        const inputRarity = evt.target.elements['form-rarity'];
    
        const inputItem = createInputItem(inputName, inputSlot, inputRarity);
    
        uptadeOrCreateItem(inputItem);
        
        localStorage.setItem("forms-data", JSON.stringify(items));
    
        // location.reload();

        fetch('http://localhost:8080/items')
            .then(response => response.json())
            .then(data => console.table(data.content));

        fetch('http://localhost:8080/items/6', {method: "DELETE"})

        let body = {name: "ITEM 23", slot: "HEAD", rarity: "EPIC"}
        
        let headers = new Headers();
        headers.set("Content-Type", "Application/json");

        fetch('http://localhost:8080/items', {method: "POST", body: JSON.stringify(body), headers:headers})
            .then(response => response.json())
            .then(data => console.log(data));
    
        clearForms();
    });
}

function createInputItem(inputName, inputSlot, inputRarity) {

    return {
        name: inputName.value,
        slot: inputSlot.value,
        rarity: inputRarity.value            
        };
};

function uptadeOrCreateItem(inputItem) {
    
    if(checkItemExistence(inputItem.name)) {
        
        const existentItem = checkItemExistence(inputItem.name); 
        inputItem.Id = existentItem.Id;
        
        updateItem(inputItem);
    }
    
    else {
        
        const itemId = checkLastItemId();
        inputItem.Id = itemId;
        
        createItem(inputItem);
        
        items.push(inputItem);
        
    }
}

function checkItemExistence(name) {
    return items.find(elt => elt.name === name);
};

function checkLastItemId() {
    return items[items.length -1]? items[items.length -1].Id + 1 : 0;
}

function clearForms() {
    const formsToClear = document.querySelectorAll('.form__selection')

    formsToClear.forEach(element => {
        element.value = "";  
    });
}

function createItem(item) {

    const newItem = document.createElement('div');

    addInnerHtml(newItem, item);

    addDeleteButtonListener(newItem, item);

    addDropDownListener(newItem, item.Id);

    list.appendChild(newItem);
}

function addInnerHtml(element, item) {

    element.innerHTML = `<li class="list__items__item" data-id="${item.Id}" data-name="${item.name}" data-slot="${item.slot}" data-rarity="${item.rarity}">
                            <div class="list__items__item__box">
                                <div class="list__items__item__box__itemname">
                                    <strong class="list__items__item__box__itemname"__name>${item.name}</strong>
                                </div>
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
}

function addDropDownListener(element, id) {

    const itemClickableArea = element.querySelector('.list__items__item__box__itemname')

    itemClickableArea.addEventListener('click', function() {
        const listItem = document.querySelector(`[data-id="${id}"]`);
        const dropDown = listItem.querySelector('.dropdown')
        
        dropDown.classList.toggle('dropdown-show');
    })
}

function updateItem(item) {
        items[items.findIndex(elt => elt.Id === item.Id)] = item;
}

function addDeleteButtonListener(element, item) {

    const deleteButton = element.querySelector('.item__delete__button');

    deleteButton.addEventListener('click', function() {
        element.remove();
        items.splice(items.findIndex(elt => elt.Id === item.Id), 1);
        localStorage.setItem("forms-data", JSON.stringify(items));
    })
}

function addClearLSButtonListener() {
    
    document.querySelector('.clearLS').addEventListener('click', () => {
        localStorage.clear();
        location.reload();
        }
    );
}

// function getTargetParentNode(initialChildNode, targetParentNode) {

//     let currentParentNode = initialChildNode;

//     while(targetParentNode !== currentParentNode) {
//         currentParentNode = currentParentNode.parentNode;
//     };

//     return currentParentNode;
// }
    

// =================================================================================================================
//                                                     Next Step
// =================================================================================================================

//


