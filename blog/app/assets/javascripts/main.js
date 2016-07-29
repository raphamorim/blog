
var easter_egg = new Konami(function() {

    var AUTH_CLASS = "login";
    var authSection = document.getElementsByClassName(AUTH_CLASS)[0];

    if(typeof authSection === "object" && authSection.nodeName === "DIV") {

        authSection.style.display = "inherit";
    }
});

(function() {
    var d = document, s = d.createElement('script');
    s.src = '//blog-pantuza-com.disqus.com/embed.js';
    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
})();
