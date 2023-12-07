var move1 = {
    "type": "walk_forward",
    "message0": "Walk 1 Forward",
    "previousStatement": null,
    "nextStatement": null,
    "style": "list_blocks",
    "tooltip": "Moves character 1 forward.",
    "helpUrl": ""
};

var rleft = {
    "type": "rotate_left",
    "message0": "Rotate 90 Degrees Left",
    "previousStatement": null,
    "nextStatement": null,
    "style": "list_blocks",
    "tooltip": "",
    "helpUrl": ""
  }

var rright = {
    "type": "rotate_right",
    "message0": "Rotate 90 Degrees Right",
    "previousStatement": null,
    "nextStatement": null,
    "style": "list_blocks",
    "tooltip": "",
    "helpUrl": ""
};

Blockly.defineBlocksWithJsonArray([move1, rleft, rright])

Blockly.JavaScript.forBlock['walk_forward'] = function (block, generator) {
    var code = 'player.x += player.boxWidth * Math.cos(player.angle * Math.PI / 180);\nplayer.y += player.boxHeight * Math.sin(player.angle * Math.PI / 180)';
    return code;
};

Blockly.JavaScript.forBlock['rotate_left'] = function (block, generator) {
    var code = 'player.angle -= 90';
    return code;
};

Blockly.JavaScript.forBlock['rotate_right'] = function (block, generator) {
    var code = 'player.angle += 90';
    return code;
};