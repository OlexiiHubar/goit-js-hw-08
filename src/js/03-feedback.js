import _trottle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('input'),
  textarea: document.querySelector('textarea'),
};

const formData = {};

onPopulateFormData();
refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', _trottle(onFormInput, 500));

function onFormSubmit(evt) {
  evt.preventDefault();
  evt.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
  console.log(formData);
}

function onFormInput(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onPopulateFormData() {
  const savedFormData = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (savedFormData) {
    refs.email.value = savedFormData.email;
    refs.textarea.value = savedFormData.message;
  }
}
