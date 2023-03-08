import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

// const input = document.querySelector("[name='email']");
const form = document.querySelector('.feedback-form');
// const textArea = document.querySelector('[name="message"]');

const feedbackFormState = {};
let savedFeedbackFormState = JSON.parse(localStorage.getItem(STORAGE_KEY));

form.addEventListener('input', throttle(onTextInput, 500));
//   feedbackFormState[e.target.name] = e.target.value;
//   console.log(feedbackFormState);
//   console.log(e.target);
// );

form.addEventListener('submit', onFormSubmit);

// textArea.addEventListener('input', throttle(onTextAreaInput, 500));

populateTextarea();

function onTextInput(e) {
  feedbackFormState[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(feedbackFormState));
}

// function onTextAreaInput(e) {
//   const message = e.target.value;
//   localStorage.setItem(STORAGE_KEY, message);
// }

function onFormSubmit(e) {
  e.preventDefault();
  e.target.reset();

  localStorage.removeItem(STORAGE_KEY);
  console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
  console.log(savedFeedbackFormState);
}

function populateTextarea() {
  if (savedFeedbackFormState) {
    // textArea.value = savedFeedbackFormState;

    const keys = Object.keys(JSON.parse(localStorage.getItem(STORAGE_KEY)));

    for (const key of keys) {
      document.querySelector(`[name="${key}"]`).value =
        savedFeedbackFormState[key];
      feedbackFormState[key] = savedFeedbackFormState[key];
    }
    console.log(feedbackFormState);
  }
}
