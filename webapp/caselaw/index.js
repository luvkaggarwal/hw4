document.addEventListener("DOMContentLoaded", function () {
    var user = sessionStorage.getItem("user");
    if ( user == null ) {
        window.location.href = '../index.html';
    } else {
      let result = await load_data();
      document.getElementById('greeting').innerText = 'Welcome ' + user;
      alert(result);
    }
};

function load_data() {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'references.txt');
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response);
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };
        xhr.send();
    });
}

// const log = document.querySelector('.event-log');

// function handleEvent(e) {
//     log.textContent = log.textContent + `${e.type}: ${e.loaded} bytes transferred\n`;
// };

// function addListeners(xhr) {
//     xhr.addEventListener('loadstart', handleEvent);
//     xhr.addEventListener('load', handleEvent);
//     xhr.addEventListener('progress', handleEvent);
// };

// function load_data() {
//     log.textContent = '';
//     const xhr = new XMLHttpRequest();
//     addListeners(xhr);
//     xhr.open('GET', 'references.txt');
//     xhr.send();
//     alert(xhr.responseText);  
// };

// function load_data () {
//     var sr = fetch('references.txt');
//     alert(sr);
//     var fileContents = sr.ReadToEnd();
//     alert('all cool');
//     sr.Close();
//     alert('all cool');

//     var mydata = fileContents.Split("\n"[0]);
 
//     var myrandom = Random.Range(1,10);
//     alert(mydata[myrandom]);
// };