import _trottle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('input[name="email"]'),
  textarea: document.querySelector('textarea[name="message"]'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', _trottle(onFormInput, 500));

function onFormSubmit(evt) {
  evt.preventDefault();
  const { email, message } = evt.currentTarget;

  if (email.value === '' || message.value === '') {
    return alert('Поля мають бути заповнені!');
  }

  const data = {
    email: email.value,
    message: message.value,
  };

  console.log(data);
  evt.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}
function onFormInput(e) {
  let formData = localStorage.getItem(STORAGE_KEY);
  if (formData) {
    formData = JSON.parse(formData);
  } else {
    formData = {};
  }
  formData[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}
onPopulateFormData();
function onPopulateFormData() {
  const savedFormData = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (savedFormData) {
    refs.email.value = savedFormData.email ? savedFormData.email : '';
    refs.textarea.value = savedFormData.message ? savedFormData.message : '';
  }
}
