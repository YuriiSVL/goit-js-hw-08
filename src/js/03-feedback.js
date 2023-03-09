import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const formRef = document.querySelector('.feedback-form');
const feedbackFormData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

formRef.addEventListener('input', throttle(onTextInput, 500));
formRef.addEventListener('submit', onFormSubmit);

populateTextarea();

function onTextInput(e) {
  feedbackFormData[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(feedbackFormData));
}

function onFormSubmit(e) {
  e.preventDefault();

  console.log(feedbackFormData);

  Object.keys(feedbackFormData).forEach(key => delete feedbackFormData[key]);
  e.target.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function populateTextarea() {
  if (feedbackFormData) {
    Object.keys(feedbackFormData).forEach(key => {
      document.querySelector(`[name="${key}"]`).value = feedbackFormData[key];
    });
  }
}
