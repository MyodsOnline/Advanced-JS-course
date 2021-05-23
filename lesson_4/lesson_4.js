function changeText() {
    
    let $userText = document.getElementById('inp').value;
    let $changedText = document.getElementById('outp');

    let regexpQuotes = new RegExp('\'', 'gm');
    let returnApostrophe = /\b\"\b/gm;
    $changedText.innerHTML = $userText.replace(regexpQuotes, '"').replace(returnApostrophe, '\'');
}
document.getElementById('btn').addEventListener('click', changeText);

// задание 3.

function valideForm() {
    let regexp_name = /[a-zа-яё]*\s?[a-zа-яё]/gi;
    let regexp_number = /\+\d{1,3}\s?\(?\d{3}\)?\s?\d{3}\-?\d{2}\-?\d{2}/;
    let regexp_email = /([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})/;
    let regexp_text = /[a-zа-яё0-9]/;

    let name = document.getElementById('name').value;
    let number = document.getElementById('number').value;
    let email = document.getElementById('email').value;
    let message = document.getElementById('text').value;

    // Проверяем имя
    if(regexp_name.test(name) === true) {
        correct('name')
    } else {
        wrong('name')
    }
    // Проверяем телефон
    if(regexp_number.test(number) === true) {
        correct('number')
    } else {
        wrong('number')
    }
    // Проверяем email
    if(regexp_email.test(email) === true) {
        correct('email')
    } else {
        wrong('email')
    }
}
document.getElementById('btn_val').addEventListener('click', valideForm);

function correct(param){
    console.log(document.getElementById(param));
    document.getElementById(param).style.border = '1px solid rgb(133, 133, 133)';
    document.getElementById(param).nextElementSibling.style.display = 'none';
}
function wrong(param){
    console.log(document.getElementById(param));
    document.getElementById(param).style.border = '1px solid red';
    document.getElementById(param).nextElementSibling.style.display = 'block';
}