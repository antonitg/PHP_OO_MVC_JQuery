function generateMenu() {
    var token = localStorage.getItem("token");
    if (token != null) {
        $("<li></li>").attr({ 'class': 'nav-item', 'id': 'limenuprofile' }).appendTo('.navbar-nav');
        $("<a></a>").attr({ 'class': 'navbar-brand', 'id': 'menuprofile' }).append(document.createTextNode(tkdecode("name"))).appendTo('#limenuprofile');
    } else {
        $("<li></li>").attr({ 'class': 'nav-item', 'id': 'lilogreg' }).appendTo('.navbar-nav');
        $("<a></a>").attr({ 'class': 'navbar-brand', 'id': 'logreg' }).append(document.createTextNode('Login/Register')).appendTo('#lilogreg');
    }
}
$(document).ready(function () {
    generateMenu();
    // console.log(tkdecode("name"));
});