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
const originalImage = document.querySelector('#originalImage')

const editTopic = document.querySelector('#topic')
const editText = document.querySelector('#bodyText')
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

  }else if(state === 'edit') {

    state = 'read'

    originalPostContainer.classList.toggle('hide')
    editForm.classList.toggle('hide')

  }

}
