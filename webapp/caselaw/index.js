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
    alert(cases[0]);
};