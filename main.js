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

    newList.dataset.id = item.Id;
    newList.dataset.name = item.Name;
    newList.dataset.slot = item.Slot;
    newList.dataset.rarity = item.Rarity;

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('item__delete__button');
    deleteButton.innerHTML = 'X';
    deleteButton.addEventListener('click', function() {
        deleteItem(this, item.Id);
    });

    newList.appendChild(deleteButton);
    
    list.appendChild(newList);
}

function deleteItem(item, id){
    console.log('current item: ' + item.parentNode.dataset.name);
    item.parentNode.remove();
    items.splice(items.findIndex(elt => elt.id === id), 1);
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

//- Fazer o id ser fixo e se manter quando apagar ou atualziar outros itens

//- Atualizar um item quando tiver o mesmo nome, ao invés de apaga-lo
