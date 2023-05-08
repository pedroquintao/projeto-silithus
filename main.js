const list = document.querySelector('#list-items'); // Seleciona o elemento com id "list-items" e o armazena na constante list
const form = document.querySelector('#form'); //Seleciona o elemento com o id "form" e o armazena na constante form
const url = 'http://localhost:8080/items';
// const items = getItemsMethod(url);

getItemsMethod(url);

addSubimitListener(form);

addClearLSButtonListener();

// deleteMethod(url, 5)
function drawList(data){
    data.forEach(elt => {createItem(elt)});
}

function createItem(item) {

    const newItem = document.createElement('div');

    addInnerHtml(newItem, item);

    addDeleteButtonListener(newItem, item);

    addDropDownListener(newItem);

    drawItem(newItem);
    
}

function addSubimitListener(forms) {

    forms.addEventListener('submit', (evt) => {
        
        evt.preventDefault();
        
        const inputFormsData = evt.target.elements;

        const inputItem = createInputItem(inputFormsData);
        
        createItem(inputItem);

        postItemMethod(inputItem, url);

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

function addDropDownListener(element) {

    const itemClickableArea = element.querySelector('.list__items__item__box__itemname')

    itemClickableArea.addEventListener('click', function() {

        const dropDown = element.querySelector('.dropdown')
        dropDown.classList.toggle('dropdown-show');
    })
}

function drawItem(item) {

    list.appendChild(item);
}

function addDeleteButtonListener(element, item) {

    const deleteButton = element.querySelector('.item__delete__button');

    deleteButton.addEventListener('click', function() {
        element.remove();
        deleteMethod(url, item.id);
    })
}

function addClearLSButtonListener() {
    
    document.querySelector('.test').addEventListener('click', () => {
        console.log('%cmain.js line:124 TEST', 'color: #007acc;', "TEST");
        }
    );
}

function getItemsMethod(url) {

    fetch(url)
    .then(res => res.json())
    .then(data => {drawList(data.content)});
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

function deleteMethod(url, id) {
    fetch(`http://localhost:8080/items/${id}`, {method: "DELETE"})
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

// - Implementar a função de deletar o item

// - Dar um jeito de tirar o slot e rarity de caixa alta no dropdown

// - Falar com Daniel: Quando deleta um item, o id dele é apagado, e quando vai criar outro item, o próximo id continua na sequencia do ultimo criado. Ex: id dos itens cadastrados: 1, 2, 3 se o item de id 3 é apagado, e um novo item é criado em sequencia, esse novo item terá o id 4 e não 3. Isso está correto? 


//Quando usar cada método REST:

//GET : - Quando for pegar todos os itens da lista para apresentar na tela (provavelmente terá que armazenar o resultado no array items, semelhante como foi feito quando se utilizava o localStorage)
// |
//  `-> Provavelmente será utilizado na função drawList()
    

//POST: - Quando for enviar o formulário para criar um item novo

//PUT: - Quando for atualizar um item (a atualização do item pode ser tanto por um botão para atualizar o item quanto quando há uma tentativa de adicionar um item com um nome de item que já existe no banco)

//DELETE - Quando for apagar um item do banco






