var dict = {};

window.onload = function () {
    var user = sessionStorage.getItem("user");
    if ( user == null ) {
        window.location.href = '../index.html';
    } else {
        document.getElementById('greeting').innerText = 'Welcome ' + user;
        myJsonData().then(function (result) { process(result); });
    }
}

function myJsonData() {
    return new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            if (request.readyState === 4) {
                if (request.status === 200) {
                    resolve(request.responseText);
                }
            }
        }
        request.open('GET', 'references.txt', true);
        request.send();
    });
};

function process(data) {
    var cases = data.split("\n");
    console.log(JSON.parse(cases[1]));
    for (var i = 0; i < cases.length; i++) {
        var caselaw = JSON.parse(cases[i]);
        var key = Object.keys(caselaw)[0];
        dict.key = caselaw[key];
    }
    console.log(Object.keys(dict));
    display();
};

function display() {
    var doclist = document.getElementById('caselist');
    var keys = Object.keys(dict);
    for (var i = 0; i < keys.length; i++) {
        var opt = document.createElement('option');
        opt.appendChild(document.createTextNode(keys[i]));
        doclist.appendChild(opt); 
    }
    console.log('List successfully created.');
};