window.onload = async function () {
    var user = sessionStorage.getItem("user");
    if ( user == null ) {
        window.location.href = '../index.html';
    } else {
      document.getElementById('greeting').innerText = 'Welcome ' + user;
      await load_data();
    }
};

async function load_data() {
    var xhr = new XMLHttpRequest();

    xhr.onload = async function () {
        alert(this.responseText);
    };
    xhr.open('GET', 'references.txt');
    await xhr.send();
};

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