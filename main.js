const list = document.querySelector('#list-items');
const form = document.querySelector('#form');

var items = JSON.parse(localStorage.getItem('forms-data')) || [];

drawList(); 

form.addEventListener('submit', (evt) => {
    
    evt.preventDefault();
    
    const LasItemId = items[items.length -1]? items[items.length -1].Id + 1 : 0;
    const itemName = evt.target.elements['form-name'];
    const itemSlot = evt.target.elements['form-slot'];
    const itemRarity = evt.target.elements['form-rarity'];

    const currentItem = {
        Id: LasItemId,
        Name: itemName.value,
        Slot: itemSlot.value,
        Rarity: itemRarity.value
    };

    createItem(currentItem);

    items.push(currentItem);

    localStorage.setItem("forms-data", JSON.stringify(items));

    clearForms();

    console.log('%cmain.js line:32 itemId', 'color: #007acc;', LasItemId);
    console.log('%cmain.js line:33 items', 'color: #007acc;', items);

});

function drawList(){
    items.forEach(elt => createItem(elt))
}

function clearForms() {
    document.querySelector("input[id='form-name']").value = "";
    document.querySelector("select[id='form-slot']").value = "";
    document.querySelector("select[id='form-rarity']").value = "";
}

function createItem(item) {
    const newList = document.createElement('li')
    newList.classList.add('list__items__item')

    const newNameValue = document.createElement('strong')
    newNameValue.innerHTML = item.Name;

    newList.appendChild(newNameValue);

    newList.dataset.name = item.Name;
    newList.dataset.slot = item.Slot;
    newList.dataset.rarity = item.Rarity;

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('item__delete__button');
    deleteButton.innerHTML = 'X';
    deleteButton.addEventListener('click', function() {
        deleteItem(this);
    });

    newList.appendChild(deleteButton);
    
    list.appendChild(newList);
}

function deleteItem(item){
    console.log('current item: ' + item.parentNode.dataset.name);
    items.splice(items.findIndex(elt => elt.Name.value === item.parentNode.dataset.name), 1);
    item.parentNode.remove();
    localStorage.setItem("forms-data", JSON.stringify(items));
}

