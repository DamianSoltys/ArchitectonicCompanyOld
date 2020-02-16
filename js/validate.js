var store = new Object();
store.radio = new Array();

function checkField(idField, regexObject) {

  var fieldObject = document.getElementById(idField);
  if (!regexObject.test(fieldObject.value))
    return (false);
  else
    return (true)
}

function checkRadio(nazwa_radio, radio_nr) {

  var radioObject = document.getElementsByName(nazwa_radio);
  for (i = 0; i < radioObject.length; i++) {
    isTaken = radioObject[i].checked;
    if (radioObject[i].checked) {
      store.radio[radio_nr] = radioObject[i].value;
      localStorage.setItem('radio' + radio_nr, store.radio[radio_nr]);
    }
    if (isTaken) {
      return true;
    }
  }
  return false;
}

function checkForm(form) {
  if (!form.terms.checked) {
    alert("Proszę o zaznaczenie zgody na przetwarzanie informacji!")
    form.terms.focus();
    return false;
  }
  return true;
}

function checkSelect(select_id) {
  select = document.getElementById(select_id);
  if (select.options[select.selectedIndex].value == '' || select.options[select.selectedIndex].value == '-1') {
    return false;
  } else
    store.select = select.options[select.selectedIndex].value;
  localStorage.setItem('select', store.select);
  return true;
}

function check() {
  var isValidate = true;
  nameObject = /^[a-zA-Z]{2,20}$/;
  emailObject = /^([a-zA-Z0-9])+([.a-zA-Z0-9_-])*@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-]+)+/;
  ageObject = /^[1-9][0-9]?$/;
  urlObject = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/

  //Imię
  if (!checkField("FormName", nameObject)) {
    isValidate = false;
    document.getElementById("name_error").innerHTML = "Wpisz poprawnie imię!";
  } else {
    store.name = document.querySelector('#FormName').value;
    localStorage.setItem('name', store.name);
    document.getElementById("name_error").innerHTML = "";
  }

  //Nazwisko
  if (!checkField("FormSurname", nameObject)) {
    isValidate = false;
    document.getElementById("surname_error").innerHTML = "Wpisz poprawnie Nazwisko!";
  } else {
    store.surname = document.querySelector('#FormSurname').value;
    localStorage.setItem('surname', store.surname);
    document.getElementById("surname_error").innerHTML = "";
  }

  //Email
  if (!checkField("FormEmail", emailObject)) {
    isValidate = false;
    document.getElementById("email_error").innerHTML = "Wpisz poprawnie Email!";
  } else {
    store.email = document.querySelector('#FormEmail').value;
    localStorage.setItem('email', store.email);
    document.getElementById("email_error").innerHTML = "";
  }

  //URL
  if (!checkField("FormUrl", urlObject)) {
    isValidate = false;
    document.getElementById("url_error").innerHTML = "Wpisz poprawnie Url!";
  } else {
    store.url = document.querySelector('#FormUrl').value;
    localStorage.setItem('url', store.url);
    document.getElementById("url_error").innerHTML = "";
  }

  //Wiek
  if (!checkField("FormAge", ageObject)) {
    isValidate = false;
    document.getElementById("age_error").innerHTML = "Wpisz poprawnie swój Wiek!";
  } else {
    store.age = document.querySelector('#FormAge').value;
    localStorage.setItem('age', store.age);
    document.getElementById("age_error").innerHTML = "";
  }

  //Radio
  if (!checkRadio('Radios', 0)) {
    isValidate = false;
    document.getElementById("radio_error").innerHTML = "Proszę o zaznaczenie!";
  } else
    document.getElementById("radio_error").innerHTML = "";
  if (!checkRadio('Radios1', 1)) {
    isValidate = false;
    document.getElementById("radio1_error").innerHTML = "Proszę o zaznaczenie!";
  } else
    document.getElementById("radio1_error").innerHTML = "";
  if (!checkSelect('inputCity')) {
    isValidate = false;
    document.getElementById("select_error").innerHTML = "Proszę o wybranie miasta!";
  } else
    document.getElementById("select_error").innerHTML = "";

  return isValidate;
}

function dataAlert() {
  alert("!!TWOJE DANE!!\n" + JSON.stringify(localStorage, null, 4));
}

function dataClear() {
  localStorage.clear();
  alert('Dane zostaly usunięte!!');
}

function saveData() {
  localStorage.setItem('name', document.querySelector('#FormName').value);
  localStorage.setItem('surname', document.querySelector('#FormSurname').value);
  localStorage.setItem('email', document.querySelector('#FormEmail').value);
  localStorage.setItem('url', document.querySelector('#FormUrl').value);
  localStorage.setItem('age', document.querySelector('#FormAge').value);
  var radio = document.getElementsByName('Radios');
  for (i = 0; i < radio.length; i++) {
    if (radio[i].checked) {
      localStorage.setItem('radio0', radio[i].value);
    }
  }
  var radio = document.getElementsByName('Radios1');
  for (i = 0; i < radio.length; i++) {
    if (radio[i].checked) {
      localStorage.setItem('radio1', radio[i].value);
    }
  }
  localStorage.setItem('agreement', document.querySelector('#Check1').checked);
  select = document.querySelector('#inputCity');
  localStorage.setItem('select', select.options[select.selectedIndex].value);
  alert('Dane zostaly zapisane!!');
}

function pushData() {
  document.querySelector('#FormName').value = localStorage.getItem('name');
  document.querySelector('#FormSurname').value = localStorage.getItem('surname');
  document.querySelector('#FormEmail').value = localStorage.getItem('email');
  document.querySelector('#FormUrl').value = localStorage.getItem('url');
  document.querySelector('#FormAge').value = localStorage.getItem('age');
  var radio = document.getElementsByName('Radios');
  for (i = 0; i < radio.length; i++) {
    if (radio[i].value == localStorage.getItem('radio0')) {
      radio[i].checked = true;
    }
  }
  var radio = document.getElementsByName('Radios1');
  for (i = 0; i < radio.length; i++) {
    if (radio[i].value == localStorage.getItem('radio1')) {
      radio[i].checked = true;
    }
  }
  if (localStorage.getItem('agreement') == 'false' || localStorage.getItem('agreement') == null) {
    document.querySelector('#Check1').checked = false;
  } else
    document.querySelector('#Check1').checked = true;
  select = document.querySelector('#inputCity');
  if (localStorage.getItem('select') == null)
    select.value = ''
  else
    select.value = localStorage.getItem('select');
  alert('Dane zostaly wstawione!!');
}

function showData() {
  dataAlert();
}

function checkHtmlForm(form) {
  if (checkForm(form) && check()) {
    store.agreement = form.terms.checked;
    localStorage.setItem('agreement', store.agreement);

    dataAlert();
    return true;
  } else {
    return false;
  }
}
