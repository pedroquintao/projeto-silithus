const list = document.querySelector('#list-items');
const form = document.querySelector('#form');

var items = [];

drawList(); 

form.addEventListener('submit', (evt) => {
    
    evt.preventDefault();
    
    const itemName = evt.target.elements['form-name'];
    const itemSlot = evt.target.elements['form-slot'];
    const itemRarity = evt.target.elements['form-rarity'];

    const currentItem = {
        Id: items.length,
        Name: itemName,
        Slot: itemSlot,
        Rarity: itemRarity
    };

    createItem(currentItem);

    items.push(currentItem);

    localStorage.setItem("forms-data", JSON.stringify(items));

    clearForms();

});

function drawList(){
    items.forEach(elt => createItem(elt))
}

function clearForms() {
    document.querySelector("input[id='form-name'").value = "";
    document.querySelector("select[id='form-slot'").value = "";
    document.querySelector("select[id='form-rarity'").value = "";
}

function createItem(item) {
    const newList = document.createElement('li')
    newList.classList.add('list__items__item')

    const newNameValue = document.createElement('strong')
    newNameValue.innerHTML = item.Name.value;

    newList.appendChild(newNameValue);

    newList.dataset.name = item.Name.value;
    newList.dataset.slot = item.Slot.value;
    newList.dataset.rarity = item.Rarity.value;

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('item__delete__button');
    deleteButton.innerHTML = 'X';
    console.log(deleteButton.className)
    deleteButton.addEventListener('click', function() {
        deleteItem(this);
    })
    newList.appendChild(deleteButton);

    
    list.appendChild(newList);

    console.log(items.length);
}

function deleteItem(item){
    console.log('current item: ' + item.parentNode.dataset.name);
    items.splice(items.findIndex(elt => elt.Name.value === item.parentNode.dataset.name), 1);
    item.parentNode.remove();
    localStorage.setItem("forms-data", JSON.stringify(items));
}

