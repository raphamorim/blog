
var easter_egg = new Konami(function() {

    var AUTH_CLASS = "login";
    var authSection = document.getElementsByClassName(AUTH_CLASS)[0];

    if(typeof authSection === "object" && authSection.nodeName === "DIV") {

        authSection.style.display = "inherit";
    }
});
