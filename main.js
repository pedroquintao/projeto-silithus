const list = document.querySelector('#list-items');
const form = document.querySelector('#form');

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
        // console.log('%cmain.js line:27 EXISTE', 'color: #007acc;', 'EXISTE');
        currentItem.Id = exists.Id;
        items[items.findIndex(elt => elt.Id === currentItem.Id)] = currentItem;
    }

    else {
        // console.log('%cmain.js line:30 NAO EXISTE', 'color: #007acc;', 'NAO EXISTE');
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
    const newList = document.createElement('li')
    newList.classList.add('list__items__item')

    const newNameValue = document.createElement('strong')
    newNameValue.innerHTML = item.Name;

    newList.appendChild(newNameValue);

    newList.dataset.id = item.Id;
    newList.dataset.name = item.Name;
    newList.dataset.slot = item.Slot;
    newList.dataset.rarity = item.Rarity;

    newList.appendChild(addDeleteButton(item.id));
    
    list.appendChild(newList);

    console.log('%cmain.js line:79 items.Id', 'color: #007acc;', item.Id);
}
function addDeleteButton(id) {
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('item__delete__button');
    deleteButton.innerText = 'X';
    deleteButton.addEventListener('click', function() {
        deleteItem(this.parentNode, id);
    });
    return deleteButton;
}
function deleteItem(tag, id){
    tag.remove();
    items.splice(items.findIndex(elt => elt.Id === id), 1);
    localStorage.setItem("forms-data", JSON.stringify(items));
}

// Área de testes

document.querySelector('.clearLS').addEventListener('click', () => {
    localStorage.clear();
    location.reload();
    }
);
    

// =================================================================================================================
//                                                     Next Step
// =================================================================================================================

//-Criar o dropdown quando clicar nos itens, de forma que apareça num padrão próximo ao das caixas de informação dos itens do wow.
