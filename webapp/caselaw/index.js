window.onload = function () {
    var user = sessionStorage.getItem("user");
    if ( user == null ) {
        window.location.href = '../index.html';
    } else {
      document.getElementById('greeting').innerText = 'Welcome ' + user;
      load_data();
    }
};

// function load_data() {
//     var xhr = new XMLHttpRequest();

//     xhr.onprogress = function () {
//         alert('LOADING: ', xhr.status);
//     };

//     xhr.onload = function () {
//         alert(this.responseText);
//     };
//     xhr.open('GET', 'references.txt');
//     xhr.send();
// };

const log = document.querySelector('.event-log');

function handleEvent(e) {
    log.textContent = log.textContent + `${e.type}: ${e.loaded} bytes transferred\n`;
};

function addListeners(xhr) {
    xhr.addEventListener('loadstart', handleEvent);
    xhr.addEventListener('load', handleEvent);
    xhr.addEventListener('progress', handleEvent);
};

function load_data() {
    log.textContent = '';

    const xhr = new XMLHttpRequest();
    addListeners(xhr);
    xhr.open('GET', 'references.txt');
    xhr.send();
    alert(xhr.responseText);  
};