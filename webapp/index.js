function validate(obj) {
    sessionStorage.setItem("user",obj.user.value);
    if ( obj.module.value == "caselaw") {
        obj.action = "caselaw";
        obj.submit();
    } else if ( obj.module.value == "sentence"){
        obj.action = "sentence/index.html";
        obj.submit()
    };
    //return true;
};
