function validate(obj) {
	var user = document.getElementById('user').value;
	var module = document.getElementById('module').value;
    sessionStorage.setItem("user",user);
    
    if ( module == "caselaw") {
        obj.action = "caselaw";
        obj.submit();
    } else if ( module == "sentence"){
        obj.action = "sentence";
        obj.submit();
    };
};
