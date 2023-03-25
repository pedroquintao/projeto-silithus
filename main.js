const list = document.querySelector('#list-items');
const form = document.querySelector('#form');

var items = [];

drawList(); 

function drawList(){
    items.forEach(elt => createItem(elt))
}

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

    clearForms();
    

    console.log('%cmain.js line:32 object', 'color: #007acc;', 
    );
    
});

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
    items.forEach(elt => console.log(elt));
    items.splice(items.findIndex(elt => elt.Name.value === item.parentNode.dataset.name), 1);
    items.forEach(elt => console.log(elt));
    item.parentNode.remove();
    console.log(item.parentNode);
}

function clearForms() {
    document.querySelector("input[id='form-name'").value = "";
    document.querySelector("select[id='form-slot'").value = "";
    document.querySelector("select[id='form-rarity'").value = "";
}