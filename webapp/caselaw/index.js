window.onload = function () {
    var user = sessionStorage.getItem("user");
    if ( user == null ) {
        window.location.href = '../index.html';
    } else {
      document.getElementById('greeting').innerText = 'Welcome ' + user;
      load_data();
    }
};

function reas() {
    var r = new FileReader();
    r.onload = function(e) { 
        var contents = e.target.result;
        alert ( "Got the file.n" 
              + "name: " + f.name + "n"
              + "type: " + f.type + "n"
              + "size: " + f.size + " bytesn"
              + "starts with: " 
              + contents.substr(1, contents.indexOf("n"))
        );
    }
    alert('all cool');
    r.readAsText('references.txt');
    alert('all cool');
};

function load_data()
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", 'references.txt', false);
    rawFile.onreadystatechange = function ()
    {
        alert('all cool');
        if(rawFile.readyState === 4)
        {
            alert('all cool');
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                alert(allText);
            }
        }
    }
    rawFile.send(null);
};

function rerere() {
  var data = fetch('references.txt');
  alert(data);
}