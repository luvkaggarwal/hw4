window.onload = function () {
    var user = sessionStorage.getItem("user");
    if ( user == null ) {
        window.location.href = '../index.html';
    } else {
      document.getElementById('greeting').innerText = 'Welcome ' + user;
      load_data();
    }
};

function load_data() {
    var xhr = new XMLHttpRequest();

    xhr.onprogress = function () {
        alert('LOADING: ', xhr.status);
    };

    xhr.onload = function () {
        alert(this.responseText);
    };
    xhr.open('GET', 'references.txt');
    xhr.send();
};