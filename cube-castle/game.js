function rainbow() {
    var hsla = 0;
    var bg = document.body;
    setInterval(()=>{
        hsla = hsla+1;
        bg.style.background = `hsla(${hsla},100%, 50%, 1)`;
        bg.style.color = `hsla(${255 - hsla}, 100%, 30%, 1)`;
    },50);
}
function endgame() {
    const canvas = document.getElementById("gameScreen");
    canvas.remove();
    const starterButton = document.createElement("button");
    starterButton.id = "starterButton";
    const onclick = document.createAttribute("onclick");
    onclick.value = "loadgame();";
    starterButton.setAttributeNode(onclick)
    starterButton.innerText = "Click Me To Start";
    document.getElementById("container").appendChild(starterButton);
}
function main() {
    const canvas = document.getElementById("gameScreen");
    const ctx = canvas.getContext("2d");

    const xGrid = 30;
    const yGrid = 20;
    const xSize = Math.floor(canvas.width / xGrid)
    const ySize = Math.floor(canvas.height / yGrid)
    const enemyCount = 50;
    const enemies = [];
    let lastTime = 0;
    let frameCount = 0;
    let fps = 0

    function updateFPS(currentTime) {
        frameCount++;
        const deltaTime = (currentTime - lastTime) / 1000;
        if (deltaTime >= 1) {
            fps = frameCount / deltaTime;
            frameCount = 0;
            lastTime = currentTime;
        }
    }

    const player = {
        x: 100,
        y: 300,
        isDragging: false
    }

    let food = {
        x: getRandomPosition(canvas.width - xSize, xSize),
        y: getRandomPosition(canvas.height - ySize, ySize),
    };

    let points = 0;

    for (let i = 0; i < enemyCount; i++) {
        enemies.push({
            x: getRandomPosition(canvas.width - xSize, xSize),
            y: getRandomPosition(canvas.height - ySize, ySize),
        })
    }

    let lastPositionChangeTime = Date.now();
    const minPositionChangeInterval = 2000;
    const maxPositionChangeInterval = 10000;

    function getRandomPosition(max, step) {
        const result = []
        for (let i = 0; i < max; i += step) {
            result.push(i);
        }
        const randomIndex = Math.floor(Math.random() * result.length);
        return result[randomIndex]
    }

    function changeEnemyPosition() {
        const randomEnemyIndex = Math.floor(Math.random() * enemies.length);
        const newEnemyX = getRandomPosition(canvas.width - xSize, xSize);
        const newEnemyY = getRandomPosition(canvas.height - ySize, ySize);
        enemies[randomEnemyIndex] = { x: newEnemyX, y: newEnemyY };
    }

    function loadCustomFont() {
        const font = new FontFace('TokyoMidnight', 'url(TokyoMidnight.ttf)');
        font.load().then(loadedFont => {
            document.fonts.add(loadedFont)
        })
    }

    function draw() {
        loadCustomFont();

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "red";
        ctx.fillRect(player.x, player.y, xSize, ySize);

        ctx.fillStyle = "cyan";
        ctx.fillRect(food.x, food.y, xSize, ySize);

        ctx.fillStyle = "gray";
        enemies.forEach((enemy) => {
            ctx.fillRect(enemy.x, enemy.y, xSize, ySize);
        });

        if (
            player.x < food.x + xSize &&
            player.x + xSize > food.x &&
            player.y < food.y + ySize &&
            player.y + ySize > food.y
        ) {
            points++;
            food.x = getRandomPosition(canvas.width - xSize, xSize);
            food.y = getRandomPosition(canvas.height - ySize, ySize);
        }

        for (let i = 0; i < enemies.length; i++) {
            if (
                player.x < enemies[i].x + xSize &&
                player.x + xSize > enemies[i].x &&
                player.y < enemies[i].y + ySize &&
                player.y + ySize > enemies[i].y
            ) {
                alert("Game over. Your score was: " + points + " points.");
                endgame();
            } else if (
                food.x < enemies[i].x + xSize &&
                food.x + xSize > enemies[i].x &&
                food.y < enemies[i].y + ySize &&
                food.y + ySize > enemies[i].y
            ) {
                food.x = getRandomPosition(canvas.width - xSize, xSize);
                food.y = getRandomPosition(canvas.height - ySize, ySize);
            }
        }

        updateFPS(performance.now());

        ctx.fillStyle = "white";
        ctx.font = "20px TokyoMidnight";
        ctx.fillText("Score: " + points, 10, canvas.height - 10);

        ctx.font = "20px Arial";
        ctx.fillText("FPS: " + Math.round(fps), 10, 20);

        const currentTime = Date.now();
        if (currentTime - lastPositionChangeTime >= minPositionChangeInterval) {
            changeEnemyPosition();
            lastPositionChangeTime = currentTime;
        }

        requestAnimationFrame(draw);
    }

    canvas.addEventListener("mousedown", (e) => {
        const mouseX = e.clientX - canvas.getBoundingClientRect().left;
        const mouseY = e.clientY - canvas.getBoundingClientRect().top;

        if (
            mouseX >= player.x &&
            mouseX <= player.x + xSize &&
            mouseY >= player.y &&
            mouseY <= player.y + ySize
        ) {
            player.isDragging = true;
            player.dragOffsetX = mouseX - player.x;
            player.dragOffsetY = mouseY - player.y;
        }
    });

    canvas.addEventListener("mousemove", (e) => {
        if (player.isDragging && player.x < canvas.width - xSize && player.x > 0 && player.y < canvas.height - ySize && player.y > 0) {
            const mouseX = e.clientX - canvas.getBoundingClientRect().left;
            const mouseY = e.clientY - canvas.getBoundingClientRect().top;
            player.x = mouseX - player.dragOffsetX;
            player.y = mouseY - player.dragOffsetY;
        } else if (player.x >= canvas.width - xSize) {
            player.x -= 1
        } else if (player.x <= 0) {
            player.x += 1
        } else if (player.y >= canvas.height - ySize) {
            player.y -= 1
        } else if (player.y <= 0) {
            player.y += 1
        }
    });

    canvas.addEventListener("mouseup", () => {
        player.isDragging = false;
    });

    setInterval(changeEnemyPosition, Math.floor(Math.random() * (maxPositionChangeInterval - minPositionChangeInterval)) + minPositionChangeInterval);

    draw();
}
function loadgame() {
    document.getElementById("starterButton").remove();
    const canvas = document.createElement("canvas")
    canvas.id = "gameScreen"
    canvas.width = "600"
    canvas.height = "400"
    document.getElementById("container").appendChild(canvas)
    main();
}