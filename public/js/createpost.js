const addTagButton = document.querySelector('#addTagButton');
const tagList = document.querySelector('#tagList');

addTagButton.addEventListener('click', addTagInput);

function addTagInput() {

  // creates list item and input for new tag 
  const tagItem = document.createElement('li');
  const input = document.createElement('input');
  const deleteButton = document.createElement('button');
  deleteButton.addEventListener('click', deleteTag);

  // initialize attributes and classes for elements created
  input.type = 'text';
  input.name = 'tags[]';
  input.placeholder = 'Tag';
  input.classList.add('input-bordered');
  input.classList.add('input-info');
  tagItem.classList.add('tag-item');
  deleteButton.innerText = 'X';
  deleteButton.classList.add('delete-tag-button');

  // append elements to tagList
  tagItem.appendChild(input);
  tagItem.appendChild(deleteButton);
  tagList.appendChild(tagItem);

}

function deleteTag(e) {

  e.target.parentNode.remove();

}