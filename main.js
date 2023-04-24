const list = document.querySelector('#list-items'); // Seleciona o elemento com id "list-items" e o armazena na constante list
const form = document.querySelector('#form'); //Seleciona o elemento com o id "form" e o armazena na constante form

var items = JSON.parse(localStorage.getItem('forms-data')) || [];

drawList(); 

form.addEventListener('submit', (evt) => {
    
    evt.preventDefault();
    
    const itemName = evt.target.elements['form-name'];
    const itemSlot = evt.target.elements['form-slot'];
    const itemRarity = evt.target.elements['form-rarity'];

    const currentItem = {
        Name: itemName.value,
        Slot: itemSlot.value,
        Rarity: itemRarity.value
    };
    
    const exists = items.find(elt => elt.Name === currentItem.Name);

    if(exists) {
        currentItem.Id = exists.Id;
        items[items.findIndex(elt => elt.Id === currentItem.Id)] = currentItem;
        updateItem(currentItem); //Desnecessário?

    }

    else {
        const itemId = items[items.length -1]? items[items.length -1].Id + 1 : 0;

        currentItem.Id = itemId;
        createItem(currentItem);

        items.push(currentItem);
    }
    localStorage.setItem("forms-data", JSON.stringify(items));

    clearForms();
});

function drawList(){
    items.forEach(elt => createItem(elt));
}

function clearForms() {
    document.querySelector("input[id='form-name']").value = "";
    document.querySelector("select[id='form-slot']").value = "";
    document.querySelector("select[id='form-rarity']").value = "";
}

function createItem(item) {

    const newItem = document.createElement('div'); //NS1

    newItem.innerHTML =    `<li class="list__items__item" data-id="${item.Id}" data-name="${item.Name}" data-slot="${item.Slot}" data-rarity="${item.Rarity}">
                            <div class="list__items__item__box">
                                <strong>${item.Name}</strong> 
                                <button class="item__delete__button">X</button>                 
                            </div>
                        </li>`;

    console.log('%cmain.js line:66 object', 'color: #007acc;', newItem.firstChild);
    addDropDown(newItem.firstChild);
    
    list.appendChild(newItem);
    // list.innerHTML = itemHtml;
}

function updateItem(item) {
    console.log('%cmain.js line:86 object', 'color: #007acc;', document.querySelector("[data-id='"+item.Id+"']"));

    console.log('%cmain.js line:86 object', 'color: #007acc;', document.querySelector("[data-id='"+item.Id+"']").innerHTML);
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

// Área de testes
function addDropDown(item) {
    const newDropDownList = document.createElement('ul');
    newDropDownList.classList.add('dropdown');
    item.appendChild(newDropDownList);

    const newDropDownName = document.createElement('li');
    newDropDownName.innerText = item.dataset.name;
    newDropDownName.classList.add('dropdown__item');
    newDropDownList.appendChild(newDropDownName);
    
    const newDropDownSlot = document.createElement('li');
    newDropDownSlot.innerText = item.dataset.slot;
    newDropDownSlot.classList.add('dropdown__item');
    newDropDownList.appendChild(newDropDownSlot);

    const newDropDownRarity = document.createElement('li');
    newDropDownRarity.innerText = item.dataset.rarity;
    newDropDownRarity.classList.add('dropdown__item');
    newDropDownList.appendChild(newDropDownRarity);

    item.addEventListener('click', () => {
        newDropDownList.classList.toggle('dropdown-show');
    })
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


