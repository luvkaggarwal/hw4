window.onload = function () {
    var user = sessionStorage.getItem("user");
    if ( user == null ) {
        window.location.href = '../index.html';
    } else {
      document.getElementById('greeting').innerText = 'Welcome ' + user;
      //load_data();
    }
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