// document.addEventListener("DOMContentLoaded", function () {
//     var user = sessionStorage.getItem("user");
//     if ( user == null ) {
//         window.location.href = '../index.html';
//     } else {
//       let result = await load_data();
//       document.getElementById('greeting').innerText = 'Welcome ' + user;
//       alert('all cool')
//       alert(result);
//     }
// };

// function load_data() {
//     return new Promise(function (resolve, reject) {
//         let xhr = new XMLHttpRequest();
//         xhr.open('GET', 'references.txt');
//         xhr.onload = function () {
//             if (this.status >= 200 && this.status < 300) {
//                 resolve(xhr.response);
//             } else {
//                 reject({
//                     status: this.status,
//                     statusText: xhr.statusText
//                 });
//             }
//         };
//         xhr.onerror = function () {
//             reject({
//                 status: this.status,
//                 statusText: xhr.statusText
//             });
//         };
//         xhr.send();
//     });
// }

var myJsonArray;  //Globally defined

window.onload = function () {
    var user = sessionStorage.getItem("user");
    if ( user == null ) {
        window.location.href = '../index.html';
    } else {
        myJsonData().then(function (result) {
            console.log("myJsonArray: " + result);
            alert(result);
            // do something else here
        });
        document.getElementById('greeting').innerText = 'Welcome ' + user;
        alert('here 15');
    }
}

function myJsonData() {
  return new Promise(function (resolve, reject) {
      var request = new XMLHttpRequest();
      //request.setRequestHeader("content-type", "application/json");
      request.onreadystatechange = function() {
          if (request.readyState === 4) {
              if (request.status === 200) {
                  //var myJsonString = JSON.parse(request.responseText);
                  //var myJsonArray = myJsonString["Projects"];
                  resolve(request.responseText);
              }
          }
      }
      request.open('GET', 'references.txt', true);
      request.send();
  });
};

// window.onload = function() {
//     var user = sessionStorage.getItem("user");
//     if ( user == null ) {
//         window.location.href = '../index.html';
//     } else {

//         var outputData = function() {
//             alert(myJsonArray);
//         }

//         var myJsonData = function() {
//             var request = new XMLHttpRequest();
//             request.open('GET', 'references.txt', true);
//             request.send(null);
//             request.onreadystatechange = function() {
//                 if (request.readyState === 4) {
//                     if (request.status === 200) {

//                         myJsonArray = request.responseText;
//                         outputData(); //Ouput when result is received
//                     }
//                 }

//             } // onreadystatechange


//         } // var myJsonData

//         myJsonData(); // *
//         document.getElementById('greeting').innerText = 'Welcome ' + user;
//         alert('here');

//     }
// };