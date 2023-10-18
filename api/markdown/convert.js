if (document.location.search) {
    var params = new URLSearchParams(document.location.search);
    var md = params.get("markdown");
    var converter = new showdown.Converter();
    fetch(md)
        .then(file => file.text())
        .then((text) => {
            document.getElementById("output").innerHTML=converter.makeHtml(text);
            hljs.highlightAll();
        });
} else {
    var err_msg = document.createElement("p");
    var err_msg_txt = document.createTextNode("Error Must include 'markdown' search param (?markdown=url_of_md_file) at the end of the url")
    err_msg.appendChild(err_msg_txt)
    document.querySelector("#output").appendChild(err_msg);
}