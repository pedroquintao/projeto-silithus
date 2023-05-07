const list = document.querySelector('#list-items'); // Seleciona o elemento com id "list-items" e o armazena na constante list
const form = document.querySelector('#form'); //Seleciona o elemento com o id "form" e o armazena na constante form
const url = 'http://localhost:8080/items';

getItemsMethod(url);

addSubimitListener(form);

addClearLSButtonListener();

function drawList(data){
    data.forEach(elt => createItem(elt));
}

function createItem(item) {

    const newItem = document.createElement('div');

    addInnerHtml(newItem, item);

    addDeleteButtonListener(newItem, item);

    addDropDownListener(newItem, item.Id);

    drawItem(newItem);
    
}

function addSubimitListener(forms) {

    forms.addEventListener('submit', (evt) => {
        
        evt.preventDefault();
        
        const inputFormsData = evt.target.elements;

        const inputItem = createInputItem(inputFormsData);
        
        uptadeOrCreateItem(inputItem);

        localStorage.setItem("forms-data", JSON.stringify(items));        
        

        clearForms();
    });
}



function createInputItem(inputFormsData) {

    const body = {
        name: inputFormsData['form-name'].value,
        slot: inputFormsData['form-slot'].value.toUpperCase(),
        rarity: inputFormsData['form-rarity'].value.toUpperCase()            
        };

    return body;
};

function uptadeOrCreateItem(inputItem) {
    
    if(checkItemExistence(inputItem.name)) {
        
        const existentItem = checkItemExistence(inputItem.name); 
        inputItem.Id = existentItem.Id;
        putMethod();
        updateItem(inputItem);
    }
    
    else {
        
        const itemId = checkLastItemId();
        inputItem.Id = itemId;
        
        createItem(inputItem);
        postItemMethod(inputItem, url);
        
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

function addInnerHtml(element, item) {

    element.innerHTML = `<li class="list__items__item" data-id="${item.Id}" data-name="${item.name}" data-slot="${item.slot}" data-rarity="${item.rarity}">
                            <div class="list__items__item__box">
                                <div class="list__items__item__box__itemname">
                                    <strong class="list__items__item__box__itemname__name">${item.name}</strong>
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

        const dropDown = element.querySelector('.dropdown')
        dropDown.classList.toggle('dropdown-show');
    })
}

function drawItem(item) {

    list.appendChild(item);
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

function getItemsMethod(url) {

    fetch(url)
    .then(res => res.json())
    .then(data => drawList(data.content));
}

function postItemMethod(item, url) {

    let headers = new Headers();
    headers.set("Content-Type", "Application/json");

    fetch(url, {method: "POST", body: JSON.stringify(item), headers:headers})
    .then(response => response.json())
    .then(data => console.log(data));
}

function putMethod() {

}

function deleteMethod() {
    
}

// fetch('http://localhost:8080/items/6', {method: "DELETE"})

// let body = {name: "ITEM 23", slot: "HEAD", rarity: "EPIC"}

// let headers = new Headers();
// headers.set("Content-Type", "Application/json");

// fetch('http://localhost:8080/items', {method: "POST", body: JSON.stringify(body), headers:headers})
// .then(response => response.json())
// .then(data => console.log(data));

// =================================================================================================================
//                                                     Next Step
// =================================================================================================================

// - Adaptar o slot e o name do body na função postItemMethod() para maiúsculos. Deu conflito porque no codigo SlotEnum.java e RarityEnum.java por padrão do java, o Daniel colocou o enum com todas as palvras em caixa alta.
// - O toUpperCase funcionou, mas ainda está acusando erro de formato de entrada
// - Do jeito que está atualmente, o name também está usando o toUpperCase, lembrar de retirar o toUpperCase dele



//Quando usar cada método REST:

//GET : - Quando for pegar todos os itens da lista para apresentar na tela (provavelmente terá que armazenar o resultado no array items, semelhante como foi feito quando se utilizava o localStorage)
// |
//  `-> Provavelmente será utilizado na função drawList()
    

//POST: - Quando for enviar o formulário para criar um item novo

//PUT: - Quando for atualizar um item (a atualização do item pode ser tanto por um botão para atualizar o item quanto quando há uma tentativa de adicionar um item com um nome de item que já existe no banco)

//DELETE - Quando for apagar um item do banco






