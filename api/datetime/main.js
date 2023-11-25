const output = document.getElementById("output");

const p = new URLSearchParams(document.location.search);
if (p) {
    const year = Number(p.get("y"));
    const month = Number(p.get("m"));
    const day = Number(p.get("d"));
    const hour = Number(p.get("h"));
    const minute = Number(p.get("mu"));
    const second = Number(p.get("s"));
    const millisecond = Number(p.get("ms"));
    const format = p.get("format");

    const now = new Date();
    const then = new Date(year, month-1, day, hour, minute, second, millisecond);
    var time = then - now;
    
    var newsecs = Math.floor(time / 1000);
    var newmins = Math.floor(newsecs / 60);
    var newhours = Math.floor(newmins / 60);
    var newdays = Math.floor(newhours / 24);
    var newmons = Math.floor(newdays / 30);
    var newyears = Math.floor(newdays / 365);

    time %= 1000;
    newsecs %= 60;
    newmins %= 60;
    newhours %= 24;
    newdays %= 30;
    newmons %= 12;

    var dateString = `${newyears}y ${newmons}m ${newdays}d ${newhours}h ${newmins}mins ${newsecs}s ${time}ms`;
    var dateJSON = {
        y: newyears,
        m: newmins,
        d: newdays,
        h: newhours,
        mu: newmins,
        s: newsecs,
        ms: time
    }
    var dateHTML = `<div id="datetime">${newyears}y ${newmons}m ${newdays}d ${newhours}h ${newmins}mins ${newsecs}s ${time}ms</div>`
    if (!format || format == "text/plain") {
        output.innerHTML = dateString;
    } else if (format == "text/json") {
        output.innerHTML = JSON.stringify(dateJSON);
    } else if (format == "text/html") {
        output.innerText = dateHTML;
    } else {
        output.innerHTML = `Invalid Format Type: ${format} (text/plain, text/json, or text/html only)`
    }
}