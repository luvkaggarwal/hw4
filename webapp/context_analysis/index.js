var dict = {};
var result = new Array();

window.onload = function () {
    var user = sessionStorage.getItem("user");
    if ( user == null ) {
        window.location.href = '../';
    } else {
        document.getElementById('greeting').innerText = 'Welcome ' + user;
        myJsonData('files.txt').then(function (result) { get_file_names(result); });
    }
}

function myJsonData(file) {
    return new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            if (request.readyState === 4) {
                if (request.status === 200) {
                    resolve(request.responseText);
                }
            }
        }
        request.open('GET', file, true);
        request.send();
    });
};

function get_file_names(data) {
    var cases = data.split("\n");
    var select = document.getElementById('case');
    for (var i = 0; i < cases.length; i++) {
        if (cases[i]) {
            var opt = document.createElement('option');
            opt.appendChild( document.createTextNode(cases[i]) );
            select.appendChild(opt); 
        }
    }
};

function process(data) {
    var sentences = data.split("\n");
    for (var i = 0; i < sentences.length; i++) {
        if (sentences[i]) {
            var sentence = JSON.parse(sentences[i]);
            dict[sentence['sentence']] = {
                'class': sentence['class'],
                'confidence': sentence['confidence'],
                'potential': sentence['potential'],
                'results': sentence['results']
            };
        }
    }
    display();
};

function display() {
    var keys = Object.keys(dict);
    var randomIndex = Math.floor(Math.random() * keys.length);
    
    document.getElementById('data').style.display = 'block';
    document.getElementById('sentence').value = keys[randomIndex];
    var select = document.getElementById('choice');
    for (var i = 0; i < dict[keys[randomIndex]]['potential'].length; i++) {
        var value = dict[keys[randomIndex]]['potential'][i];
        var opt = document.createElement('option');
        opt.appendChild( document.createTextNode(value) );
        select.appendChild(opt); 
    }

    document.getElementById('prediction').innerHTML = 'Prediction: ' 
        + dict[keys[randomIndex]]['class'] + '( '
        + dict[keys[randomIndex]]['confidence'] + '% )';


    var table = document.getElementById('results').getElementsByTagName('tbody')[0];

    for (var i = 0; i < dict[keys[randomIndex]]['potential'].length; i++) {
        var tr = table.insertRow(i);

        var td = tr.insertCell(0);
        td.innerHTML = dict[keys[randomIndex]]['potential'][i];
        td = tr.insertCell(1);
        td.innerHTML = dict[keys[randomIndex]]['results'][i];
    }
};

function save_data(obj) {
    if ( obj.value == 'Submit' ) {
        var user = sessionStorage.getItem("user");
        var sentence = document.getElementById('sentence').value;
        var data = { 
            'sentence' : sentence, 'user': user,
            'choice' : document.getElementById('choice').value,
            'case' : document.getElementById('case').value
        };
        result.push(data);
        delete dict[sentence];
        obj.value = 'Load Another';
    } else {
        display();
        obj.value = 'Submit';
    }
};

function dashboard() {
    write_data();
    sessionStorage.removeItem("user")
    window.location.href = '../';
}

var textFile = null, makeTextFile = function (text) {
    var data = new Blob([text], {type: 'text/plain'});

    // If we are replacing a previously generated file we need to
    // manually revoke the object URL to avoid memory leaks.
    if (textFile !== null) {
        window.URL.revokeObjectURL(textFile);
    }

    textFile = window.URL.createObjectURL(data);

    // returns a URL you can use as a href
    return textFile;
};

function write_data() {
    var link = document.createElement('a');
    link.setAttribute('download', 'sentence' 
        + sessionStorage.getItem("user") + '.txt');
    link.href = makeTextFile(JSON.stringify(result));
    document.body.appendChild(link);

    // wait for the link to be added to the document
    window.requestAnimationFrame(function () {
      var event = new MouseEvent('click');
      link.dispatchEvent(event);
      document.body.removeChild(link);
    });
}