const canvas = document.getElementById("containingScreen");
const ctx = canvas.getContext("2d");

function getRandomPosition(max, step) {
    const result = []
    for (let i = 0; i < max; i += step) {
        result.push(i);
    }
    const randomIndex = Math.floor(Math.random() * result.length);
    return result[randomIndex]
}

let player = {
    x: 0,
    y: 0,
    boxWidth: 75,
    boxHeight: 75,
    angle: 0
}

let finishLevel = {
    x: getRandomPosition(canvas.width - player.boxWidth, player.boxWidth),
    y: getRandomPosition(canvas.height - player.boxHeight, player.boxHeight),
    width: 75,
    height: 75
}

let obstacleCount = Math.floor(Math.random() * 30);
const obstacles = []

for (var i=0;i<obstacleCount;i++) {
    obstacles.push({
        x: getRandomPosition(canvas.width - player.boxWidth, player.boxHeight),
        y: getRandomPosition(canvas.height - player.boxHeight, player.boxHeight),
        width: 75,
        height: 75
    })
}


const toolboxPlayerMove = {
    "kind": "flyoutToolbox",
    "contents": [
        {
            "kind": "block",
            "type": "walk_forward"
        },
        {
            "kind": "block",
            "type": "rotate_left"
        },
        {
            "kind": "block",
            "type": "rotate_right"
        }
    ]
}

const ws = Blockly.inject('blocklyEditSpace', {toolbox: toolboxPlayerMove})

var rotation = 0;
var pos_x = 0;
var pos_y = 0;

function evalTest() {
    var code = Blockly.JavaScript.workspaceToCode(ws);
    eval(code);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "red";
    ctx.fillRect(player.x, player.y, player.boxWidth, player.boxHeight);

    ctx.fillStyle = "white";
    ctx.fillRect(finishLevel.x, finishLevel.y, finishLevel.width, finishLevel.height);

    ctx.fillStyle = "black";
    obstacles.forEach((obstacle) => {
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    });

    if (
        player.x < finishLevel.x + finishLevel.width &&
        player.x + player.boxWidth > finishLevel.x &&
        player.y < finishLevel.y + finishLevel.height &&
        player.y + player.boxHeight > finishLevel.y
    ) {
        alert("You did it!");
        player.x = 0;
        player.y = 0;
        finishLevel.x = getRandomPosition(canvas.width - finishLevel.width, finishLevel.width);
        finishLevel.y = getRandomPosition(canvas.height - finishLevel.height, finishLevel.height);
    };

    for (var i=0;i<obstacles.length;i++) {
        if (
            player.x < obstacles[i].x + obstacles[i].width &&
            player.x + player.boxWidth > obstacles[i].x &&
            player.y < obstacles[i].y + obstacles[i].height &&
            player.y + player.boxHeight > obstacles[i].y
        ) {
            alert("You lose!")
        }
    }

    requestAnimationFrame(draw);
}

draw();