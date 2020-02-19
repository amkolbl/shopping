const addButton = document.getElementById('addButton') as HTMLInputElement;
const itemToAdd = document.getElementById('itemToAdd') as HTMLInputElement;
const list = document.getElementById('list') as HTMLUListElement;
const count = document.getElementById('count') as HTMLSpanElement;
const storedItems = localStorage.getItem('shopping-list');

// create new interface for each shopping list item
interface ShoppingItem {
    description: string;
}
let items: ShoppingItem[] = []; // create new array of items

// if items were saved in local memory, load them into the DOM
if (storedItems) {
    items = JSON.parse(storedItems);
    items.forEach(createItemInDom);
}

// add the item to the list when button is clicked
addButton.addEventListener('click', addTheItem);

// add item to list when enter is hit
itemToAdd.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
        addTheItem();
    }
});

// add the item to the list
function addTheItem() {
    const item = itemToAdd.value;
    const thingToAdd: ShoppingItem = { description: item };
    items = [...items, thingToAdd];
    createItemInDom(thingToAdd);

    itemToAdd.value = ''; // clear it out
    itemToAdd.focus(); // put the cursor there ready for the next item
    saveToLocalStorage();
    updateCount();
}


// create the item in the DOM
// <li class="list-group-item">Cras justo odio</li>
function createItemInDom(item: ShoppingItem) {
    const li = document.createElement('li') as HTMLLIElement;
    const text = document.createTextNode(item.description);

    li.classList.add('list-group-item');

    li.appendChild(text);
    list.appendChild(li);
}

// save the item to local storage
function saveToLocalStorage() {
    localStorage.setItem('shopping-list', JSON.stringify(items));
}

function updateCount() {
    count.innerText = items.length.toString();
}


