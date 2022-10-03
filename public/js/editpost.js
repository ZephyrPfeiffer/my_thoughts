const editButton = document.querySelector('#editButton')
editButton.addEventListener('click', changePageState)

const backButton = document.querySelector('#backButton')
backButton.addEventListener('click', changePageState)

// stores both the original post
const originalPostContainer = document.querySelector('#originalPost')

// stores edit version of original post
const editForm = document.querySelector('#editForm')

// original post elements
const originalTopic = document.querySelector('#originalTopic')
const originalText = document.querySelector('#originalText')
const originalTags = document.querySelectorAll('.original-tag-text')
const originalImage = document.querySelector('#originalImage')

const editTopic = document.querySelector('#topic')
const editText = document.querySelector('#bodyText')
const editTagList = document.querySelector('#tagList')
const editImage = document.querySelector('#imageUpload')

// variable to keep track of state that page is in
let state = 'read';

// will transform post into either read or edit state based on what state the post is currently in
function changePageState() {

  if(state === 'read') {

    state = 'edit'

    originalPostContainer.classList.toggle('hide')
    editForm.classList.toggle('hide')

    editTopic.value = originalTopic.innerText;
    editText.innerText = originalText.innerText;

    if(originalTags.length > 0) {

      populateTagSection(originalTags);

    }


  }else if(state === 'edit') {

    state = 'read'

    originalPostContainer.classList.toggle('hide')
    editForm.classList.toggle('hide')

  }

}

function populateTagSection(tags) {

  for(let i = 0; i < tags.length; i++) {

    // creates list item and input for new tag 
    const tagItem = document.createElement('li');
    const input = document.createElement('input');

    // initialize attributes and classes for elements created
    input.type = 'text';
    input.value = tags[i].innerText;
    input.name = 'tags[]';
    input.placeholder = 'Tag';
    input.classList.add('input-bordered');
    input.classList.add('input-info');
    tagItem.classList.add('tag-item');
  
    // append elements to tagList
    tagItem.appendChild(input);
    editTagList.appendChild(tagItem);
    
    }

}

