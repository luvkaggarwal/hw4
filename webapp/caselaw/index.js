var dict = {};

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
    console.log('List successfully created. Take 15');
};

function save_data(obj) {
    console.log(obj.value);
    if ( obj.value == 'Submit' ) {
        var table = document.getElementById('caselaws');
        var user = sessionStorage.getItem("user");
        var file = document.getElementById('case').value;
        var data = {user: {'file' : file, 'caselaws' : new Array()}};

        // LOOP THROUGH EACH ROW OF THE TABLE.
        for (var row = 0; row < table.rows.length; row ++) {
            console.log(table.rows.item(row).cells[1].childNodes[0].checked);
            if ( table.rows.item(row).cells[1].childNodes[0].checked ) {
                console.log(table.rows.item(row).cells);
                console.log(table.rows.item(row).cells[0].childNodes[0].value);
                alert('Wait');
                data[user][caselaws].push(table.rows.item(row).cells[0].childNodes[0].value);
            }
            console.log(table.rows.item(row).cells[0].childNodes[0].value);
        }
        console.log(data);
        alert(data);
        obj.value = 'Load Another';
    } else {
        obj.value = 'Submit';
        display();
        alert('Load Another???????');
    }
};

function dashboard() {
    sessionStorage.removeItem("user")
    window.location.href = '../';
}