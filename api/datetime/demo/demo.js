setInterval(() => {
    fetch("https://hotdoguy90.github.io/api/datetime?y=2036&m=8&d=12&h=0&mu=0&s=0&ms=0")
    .then(res => res.text())
    .then(output => {
        document.getElementById("time").innerHTML = "You have " + output + " until August 12, 2036.";
    })
}, 1000)