if (document.location.search) {
    var params = new URLSearchParams(document.location.search);
    var md = params.get("markdown");
    fetch(md)
        .then(file => file.text())
        .then((text) => {
            fetch("https://api.github.com/markdown", {
                method: 'POST',
                headers: {
                    'Accept': 'application/vnd.github+json',
                    'X-Github-Api-Version': '2022-11-28'
                },
                body: JSON.stringify({
                    text: text,
                }),
            })
                .then(response => response.text())
                .then(html => {
                    document.getElementById("output").innerHTML = html;
                    hljs.highlightAll();
                })
        });
} else {
    var err_msg = document.createElement("p");
    var err_msg_txt = document.createTextNode("Error Must include 'markdown' search param (?markdown=url_of_md_file) at the end of the url")
    err_msg.appendChild(err_msg_txt)
    document.querySelector("#output").appendChild(err_msg);
}