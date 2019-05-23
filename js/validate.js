var store = new Object();
store.radio = new Array();
function sprawdzPole(pole_id, obiektRegex) {

  var obiektPole = document.getElementById(pole_id);
  if (!obiektRegex.test(obiektPole.value)) 
    return (false);
  else 
    return (true)
}
function sprawdz_radio(nazwa_radio, radio_nr) {

  var obiekt = document.getElementsByName(nazwa_radio);
  for (i = 0; i < obiekt.length; i++) {
    wybrany = obiekt[i].checked;
    if (obiekt[i].checked) {
      store.radio[radio_nr] = obiekt[i].value;
      localStorage.setItem('radio' + radio_nr, store.radio[radio_nr]);
    }
    if (wybrany) {
      return true;
    }
  }
  return false;
}
function Checkform(form) {
  if (!form.terms.checked) {
    alert("Proszę o zaznaczenie zgody na przetwarzanie informacji!")
    form.terms.focus();
    return false;
  }
  return true;
}
function sprawdz_select(select_id) {
  select = document.getElementById(select_id);
  if (select.options[select.selectedIndex].value == '' || select.options[select.selectedIndex].value == '-1') {
    return false;
  } else 
    store.select = select.options[select.selectedIndex].value;
  localStorage.setItem('select', store.select);
  return true;
}
function sprawdz() {
  var ok = true;
  obiektNazw = /^[a-zA-Z]{2,20}$/;
  obiektemail = /^([a-zA-Z0-9])+([.a-zA-Z0-9_-])*@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-]+)+/;
  obiektWiek = /^[1-9][0-9]?$/;
  obiektUrl = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
  //Imię
  if (!sprawdzPole("FormName", obiektNazw)) {
    ok = false;
    document.getElementById("name_error").innerHTML = "Wpisz poprawnie imię!";
  } else {
    store.name = document.querySelector('#FormName').value;
    localStorage.setItem('name', store.name);
    document.getElementById("name_error").innerHTML = "";
  }
  //Nazwisko
  if (!sprawdzPole("FormSurname", obiektNazw)) {
    ok = false;
    document.getElementById("surname_error").innerHTML = "Wpisz poprawnie Nazwisko!";
  } else {
    store.surname = document.querySelector('#FormSurname').value;
    localStorage.setItem('surname', store.surname);
    document.getElementById("surname_error").innerHTML = "";
  }
  //Email
  if (!sprawdzPole("FormEmail", obiektemail)) {
    ok = false;
    document.getElementById("email_error").innerHTML = "Wpisz poprawnie Email!";
  } else {
    store.email = document.querySelector('#FormEmail').value;
    localStorage.setItem('email', store.email);
    document.getElementById("email_error").innerHTML = "";
  }

  //URL
  if (!sprawdzPole("FormUrl", obiektUrl)) {
    ok = false;
    document.getElementById("url_error").innerHTML = "Wpisz poprawnie Url!";
  } else {
    store.url = document.querySelector('#FormUrl').value;
    localStorage.setItem('url', store.url);
    document.getElementById("url_error").innerHTML = "";
  }
  //Wiek
  if (!sprawdzPole("FormAge", obiektWiek)) {
    ok = false;
    document.getElementById("age_error").innerHTML = "Wpisz poprawnie swój Wiek!";
  } else {
    store.age = document.querySelector('#FormAge').value;
    localStorage.setItem('age', store.age);
    document.getElementById("age_error").innerHTML = "";
  }
  //Raadio
  if (!sprawdz_radio('Radios', 0)) {
    ok = false;
    document.getElementById("radio_error").innerHTML = "Proszę o zaznaczenie!";
  } else 
    document.getElementById("radio_error").innerHTML = "";
  if (!sprawdz_radio('Radios1', 1)) {
    ok = false;
    document.getElementById("radio1_error").innerHTML = "Proszę o zaznaczenie!";
  } else 
    document.getElementById("radio1_error").innerHTML = "";
  if (!sprawdz_select('inputCity')) {
    ok = false;
    document.getElementById("select_error").innerHTML = "Proszę o wybranie miasta!";
  } else 
    document.getElementById("select_error").innerHTML = "";
  return ok;
}
function alertDane() {
  alert("!!TWOJE DANE!!\n" + JSON.stringify(localStorage, null, 4));
}
function clearDane() {
  localStorage.clear();
  alert('Dane zostaly usunięte!!');

}
function saveDane() {
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
  localStorage.setItem('zgoda', document.querySelector('#Check1').checked);
  select = document.querySelector('#inputCity');
  localStorage.setItem('select', select.options[select.selectedIndex].value);
  alert('Dane zostaly zapisane!!');
}
function wstawDane() {
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
  if (localStorage.getItem('zgoda') == 'false' || localStorage.getItem('zgoda') == null) {
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

function showDane() {
  alertDane();
}
function Sprawdz(form) {
  if (Checkform(form) && sprawdz()) {
    store.zgoda = form.terms.checked;
    localStorage.setItem('zgoda', store.zgoda);

    alertDane();
    return true;
  } else {
    return false;
  }
}
