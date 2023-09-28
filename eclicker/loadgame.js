function gameload() {
    const gameFile = document.getElementById("load-game").files[0]
    const reader = new FileReader()

    reader.addEventListener(
        "load",
        () => {
            var url = './game.html?save=' + encodeURIComponent(reader.result)
            var game = window.open(url, "_blank").focus()
        }
    )
    if (gameFile) {
        reader.readAsText(gameFile)
    }
}