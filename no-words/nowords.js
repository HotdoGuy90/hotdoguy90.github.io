'use strict';
const shooter = document.createElement("div");

shooter.style.position = "absolute";
shooter.style.backgroundColor = "red";
shooter.innerHTML = "Rocket";
shooter.width = 50;
shooter.height = 31.25;
shooter.id = "shooter";

document.body.style.margin = "0";
document.body.appendChild(shooter);

var points = 0;

const score = document.createElement("div");

score.style.position = "fixed";
score.style.backgroundColor = "blue";
score.style.color = "white";
score.style.fontSize = "30px";
score.innerHTML = "Points: " + points;
score.id = "shooter";

document.body.insertBefore(score, document.body.firstChild);

var x = window.innerWidth / 2;
var y = window.innerHeight / 2;
var angle = 90;
var speed = 5;
var bullets = [];
var bulletSpeed = 5;

function senseElement(bullet, bulletNumber, elementName) {
    var elements = document.getElementsByTagName(elementName);
    for (var i=0;i<elements.length;i++) {
        var elx = elements[i].getBoundingClientRect().left;
        var ely = elements[i].getBoundingClientRect().top;
        var elwidth = elements[i].getBoundingClientRect().right;
        var elheight = elements[i].getBoundingClientRect().bottom;
        if (elements[i].id != "shooter" && bullet.x >= elx && bullet.x <= elwidth && bullet.y >= ely && bullet.y <= elheight) {
            elements[i].remove();
            bullet.bulletElement.remove();
            bullets.splice(bulletNumber, 1);
            points += 50;
        }
    }
}

function draw() {
    shooter.style.left = String(x) + "px";
    shooter.style.top = String(y) + "px";
    shooter.style.transform = `rotateZ(${angle}deg)`;

    bullets.forEach((bullet, bulletNumber) => {
        bullet.x += bulletSpeed * Math.cos(bullet.angle * Math.PI / 180);
        bullet.y += bulletSpeed * Math.sin(bullet.angle * Math.PI / 180);
        bullet.bulletElement.style.left = String(bullet.x) + "px";
        bullet.bulletElement.style.top = String(bullet.y) + "px";

        if (bullet.x <= 0) {
            bullet.bulletElement.remove();
            bullets.splice(bulletNumber, 1);
        }

        if (bullet.y <= 0) {
            bullet.bulletElement.remove();
            bullets.splice(bulletNumber, 1);
        }

        if (bullet.x >= window.innerWidth) {
            bullet.bulletElement.remove();
            bullets.splice(bulletNumber, 1);
        }

        if (bullet.y >= window.innerHeight) {
            bullet.bulletElement.remove();
            bullets.splice(bulletNumber, 1);
        }

        senseElement(bullet, bulletNumber, "h1");
        senseElement(bullet, bulletNumber, "h2");
        senseElement(bullet, bulletNumber, "h3");
        senseElement(bullet, bulletNumber, "h4");
        senseElement(bullet, bulletNumber, "h5");
        senseElement(bullet, bulletNumber, "h6");
        senseElement(bullet, bulletNumber, "p");
        senseElement(bullet, bulletNumber, "span");
        senseElement(bullet, bulletNumber, "img");
        senseElement(bullet, bulletNumber, "video");
        senseElement(bullet, bulletNumber, "audio");
        senseElement(bullet, bulletNumber, "a");
        senseElement(bullet, bulletNumber, "b");
        senseElement(bullet, bulletNumber, "input");
        senseElement(bullet, bulletNumber, "ol");
        senseElement(bullet, bulletNumber, "ul");
        senseElement(bullet, bulletNumber, "table");
        senseElement(bullet, bulletNumber, "div");
        senseElement(bullet, bulletNumber, "iframe");
        senseElement(bullet, bulletNumber, "embed");
        senseElement(bullet, bulletNumber, "article");
    })

    if (x + 50 <= 0) {
        x = window.innerWidth - 1;
    }

    if (y + 31.25 <= 0) {
        y = window.innerHeight - 1;
    }

    if (x >= window.innerWidth) {
        x = 1;
    }

    if (y >= window.innerHeight) {
        y = 1;
    }

    score.innerHTML = "Points: " + points;

    requestAnimationFrame(draw);
}

document.body.addEventListener("keydown", (e) => {
    if (e.key == "ArrowRight") {
        angle += 5;
    } else if (e.key == "ArrowLeft") {
        angle -= 5;
    } else if (e.key == "ArrowUp") {
        x += speed * Math.cos(angle * Math.PI / 180);
        y += speed * Math.sin(angle * Math.PI / 180);
    } else if (e.key == " ") {
        var newBullet = document.createElement("div");
        newBullet.style.position = "absolute";
        newBullet.style.color = "#ffff00";
        newBullet.style.backgroundColor = "rgb(0, 45, 190)";
        newBullet.innerHTML = "PEW!";
        newBullet.id = "shooter";
        newBullet.style.left = String(x + 50 * Math.cos(angle * Math.PI / 180)) + "px";
        newBullet.style.top = String(y + 15.625 * Math.sin(angle * Math.PI / 180)) + "px";
        newBullet.style.transform = `rotateZ(${angle})`;
        document.body.appendChild(newBullet);
        bullets.push({
            bulletElement: newBullet,
            x: Number(newBullet.style.left.replace("px", "")),
            y: Number(newBullet.style.top.replace("px", "")),
            angle: angle
        });
    }
});

draw();