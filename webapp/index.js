function validate(obj) {
    sessionStorage.setItem("user",obj.user.value);
    if ( obj.module.value == "caselaw") {
        obj.action = "caselaw/index.html";
        obj.submit();
    } else if ( obj.module.value == "sentence"){
        obj.action = "sentence/index.html";
        obj.submit()
    };
    return false;
};
