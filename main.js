fetch("https://api.ipify.org/?format=json")
    .then(output => output.json())
    .then(your => document.getElementById("ip").innerHTML = your.ip)

function runAPI() {
    var code = document.getElementById("code").value;
    var APINAME = "https://hotdoguy90.github.io/api/?code=" + encodeURIComponent(code)
    var APIWINDOW = window.open(APINAME, "_blank").focus()
}
