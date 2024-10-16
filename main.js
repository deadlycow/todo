// localStorage.removeItem('list');

const form = document.querySelector('#form');
const input = document.getElementById('input');
const unOrderList = document.querySelector('#unOrderList');
const list = JSON.parse(localStorage.getItem('list')) || {value: null, checked: false};

list.forEach(item => { console.log(item); })

form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (input.value) {
    addToList(input.value);
    input.value = '';
  }

  input.focus();
});

function createElement(item, index) {

  const text = document.createElement('p');
  const icon = document.createElement('i');
  const checkbox = document.createElement('input');
  const span = document.createElement('span');
  const button = document.createElement('button');
  const listItem = document.createElement('li');

  checkbox.type = 'checkbox';
  checkbox.id = `checkbox${index}`;
  checkbox.classList.add('checkbox-done');
  checkbox.checked = item.checked;
  text.textContent = item.value;
  text.classList.toggle('strike', item.checked);
  icon.classList.add('fa-solid', 'fa-trash');
  button.classList.add('btn', 'btn-list');

  button.appendChild(icon);
  checkbox.addEventListener('change', () => {
    item.checked = checkbox.checked;
    text.classList.toggle('strike', checkbox.checked);
    saveList();
  });

  button.addEventListener('click', (e) => {
    if (checkbox.checked) {
      removeFromList(index);
    }
  });

  span.append(checkbox, button);
  listItem.append(text, span);
  unOrderList.append(listItem);
}

function updateList() {
  while (unOrderList.firstChild) {
    unOrderList.removeChild(unOrderList.firstChild);
  }
  list.forEach((item, index) => {
    createElement(item, index);
  });
}

function removeFromList(index) {
  list.splice(index, 1);
  saveList();
  updateList();
}

function addToList(value) {
  if (!list.some(item => item.value === value)) {
    list.push({value: value, checked: false});
    saveList();
    updateList();
  }
}

function loadCheckboxStates() {
  list.forEach((item, index) => {
    const checkbox = document.getElementById(`checkbox${index}`);
    if (checkbox) {
      checkbox.checked = item.checked || false;
    }
  });
}

function saveList() {
  localStorage.setItem('list', JSON.stringify(list));
}

window.addEventListener('load', () => {
  updateList();
})