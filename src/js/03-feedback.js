import _trottle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('input'),
  textarea: document.querySelector('textarea'),
};

const formData = {};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', _trottle(onFormInput, 500));
onPopulateFormData();

function onFormSubmit(evt) {
  evt.preventDefault();
  if (formData.email === '' || formData.message === '') {
    return alert('Поля мають бути заповнені');
  }
  evt.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function onFormInput(e) {
  let formData = localStorage.getItem(STORAGE_KEY);
  if (formData) {
    formData = JSON.parse(formData);
  } else {
    console.log(formData);
  }
  formData[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onPopulateFormData() {
  const savedFormData = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (savedFormData) {
    refs.email.value = savedFormData.email ? savedFormData.email : '';
    refs.textarea.value = savedFormData.message ? savedFormData.message : '';
  }
}
