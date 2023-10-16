var move1 = {
    "type": "walk_forward",
    "message0": "Walk 1 Forward",
    "previousStatement": null,
    "nextStatement": null,
    "style": "list_blocks",
    "tooltip": "Moves character 1 forward.",
    "helpUrl": ""
};

var move2 = {
    "type": "walk_left",
    "message0": "Walk 1 Left",
    "previousStatement": null,
    "nextStatement": null,
    "style": "list_blocks",
    "tooltip": "Moves character 1 left.",
    "helpUrl": ""
};

var move3 = {
    "type": "walk_backward",
    "message0": "Walk 1 Backward",
    "previousStatement": null,
    "nextStatement": null,
    "style": "list_blocks",
    "tooltip": "Moves character 1 back.",
    "helpUrl": ""
};

var move4 = {
    "type": "walk_right",
    "message0": "Walk 1 Right",
    "previousStatement": null,
    "nextStatement": null,
    "style": "list_blocks",
    "tooltip": "Moves character 1 right.",
    "helpUrl": ""
};

Blockly.defineBlocksWithJsonArray([move1, move2, move3, move4])

Blockly.JavaScript.forBlock['walk_forward'] = function (block, generator) {
    var code = 'if (player.y < canvas.height - player.boxHeight){player.y += player.boxHeight;}';
    return code;
};

Blockly.JavaScript.forBlock['walk_left'] = function (block, generator) {
    var code = 'if (player.x < canvas.width - player.boxWidth){player.x += player.boxWidth;}';
    return code;
};

Blockly.JavaScript.forBlock['walk_backward'] = function (block, generator) {
    var code = 'if (player.y > 0){player.y -= player.boxHeight;}';
    return code;
};

Blockly.JavaScript.forBlock['walk_right'] = function (block, generator) {
    var code = 'if (player.x > 0){player.x -= player.boxWidth;}';
    return code;
}