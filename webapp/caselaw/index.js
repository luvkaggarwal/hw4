var dict = {};
var result = new Array();

window.onload = function () {
    var user = sessionStorage.getItem("user");
    if ( user == null ) {
        window.location.href = '../';
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
    for (var i = 0; i < cases.length; i++) {
        if (cases[i]) {
            var caselaw = JSON.parse(cases[i]);
            var key = Object.keys(caselaw)[0];
            dict[key] = caselaw[key];
        }
    }
    display();
};

function display() {
    var keys = Object.keys(dict);
    var randomIndex = Math.floor(Math.random() * keys.length);
    document.getElementById('case').value = keys[randomIndex];
    
    var table = document.getElementById('caselaws');
    var caselaws = dict[keys[randomIndex]];
    for (var i = 0; i < caselaws.length; i++) {
        var tr = table.insertRow(i);

        var td = tr.insertCell(0);
        var ele = document.createElement('input');
        ele.setAttribute('class', 'caselaw')
        ele.setAttribute('type', 'text');
        ele.setAttribute('value', caselaws[i]);
        ele.setAttribute('readonly', 'true');
        td.appendChild(ele);

        td = tr.insertCell(1);
        ele = document.createElement('input');
        ele.setAttribute('type', 'checkbox');
        ele.setAttribute('checked', 'true');
        td.appendChild(ele);
    }
    console.log('List successfully created. Take 19');
};

function save_data(obj) {
    console.log(obj.value);
    if ( obj.value == 'Submit' ) {
        var table = document.getElementById('caselaws');
        var user = sessionStorage.getItem("user");
        var file = document.getElementById('case').value;
        var data = {'file' : file, 'caselaws' : new Array()};

        // LOOP THROUGH EACH ROW OF THE TABLE.
        for (var row = 0; row < table.rows.length; row ++) {
            if ( table.rows.item(row).cells[1].childNodes[0].checked ) {
                data['caselaws'].push(table.rows.item(row).cells[0].childNodes[0].value);
            }
        }
        result.push(data);
        delete dict[file];
        obj.value = 'Load Another';
        console.log('Removed ' + file + ' from dictionary');
    } else {
        obj.value = 'Submit';
        console.log('Load Another???????');
    }
    display();
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
    link.setAttribute('download', 'caselaw' + sessionStorage.getItem("user") + '.txt');
    link.href = makeTextFile(result.toString());
    console.log('File Created ' + link.href);
    document.body.appendChild(link);

    // wait for the link to be added to the document
    window.requestAnimationFrame(function () {
      var event = new MouseEvent('click');
      link.dispatchEvent(event);
      document.body.removeChild(link);
    });
}