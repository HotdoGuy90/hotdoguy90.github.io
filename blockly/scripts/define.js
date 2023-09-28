const base64encode = {
    "type": "base64_encode",
    "message0": "Base64 Encode %1",
    "args0": [
      {
        "type": "input_value",
        "name": "VALUE",
        "check": "String"
      }
    ],
    "output": "String",
    "colour": 30,
    "tooltip": "Converts given text to base64",
    "helpUrl": "https://base64encode.org"
  }

const base64decode = {
    "type": "base64_decode",
    "message0": "Base64 Decode %1",
    "args0": [
      {
        "type": "input_value",
        "name": "VALUE",
        "check": "String"
      }
    ],
    "output": "String",
    "colour": 30,
    "tooltip": "Converts given base64 back into text.",
    "helpUrl": "https://base64decode.org"
  }
const listappend = {
    "type": "lists_append",
    "message0": "To list %1 append %2",
    "args0": [
      {
        "type": "field_variable",
        "name": "FIELDVALUE",
        "variable": "item"
      },
      {
        "type": "input_value",
        "name": "VALUE"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "style": "list_blocks",
    "tooltip": "",
    "helpUrl": ""
  }
const copytoclipboard = {
    "type": "text_copy",
    "message0": "Copy %1",
    "args0": [
        {
            "type": "input_value",
            "name": "VALUE",
            "check": "String"
        }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "style": "text_blocks",
    "tooltip": "",
    "helpUrl": ""
}



const pastefromclipboard = {
    "type": "text_paste_function",
    "message0": "Use Copied Text %1",
    "args0": [
      {
        "type": "input_statement",
        "name": "VALUE"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 160,
    "tooltip": "",
    "helpUrl": ""
}

const getcopiedtext = {
    "type": "text_paste",
    "message0": "Copied Text",
    "output": "String",
    "colour": 160,
    "tooltip": "",
    "helpUrl": ""
}

const comment = {
    "type": "comment",
    "message0": "Comment %1",
    "args0": [
        {
            "type": "field_input",
            "name": "INPUT",
            "text": "Add a comment..."
        }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "tooltip": "does nothing",
    "helpUrl": "about:blank"
}

Blockly.defineBlocksWithJsonArray([base64encode, base64decode, listappend, copytoclipboard, getcopiedtext, pastefromclipboard, comment])

Blockly.JavaScript.forBlock['base64_encode'] = function(block, generator) {
    var input = generator.valueToCode(block, "VALUE", Blockly.JavaScript.ORDER_ADDITION) || '\'\''
    var code = 'btoa(' + input + ')'
    return [code, Blockly.JavaScript.ORDER_ADDITION]
}

Blockly.JavaScript.forBlock['base64_decode'] = function(block, generator) {
    var input = generator.valueToCode(block, "VALUE", Blockly.JavaScript.ORDER_ADDITION) || '\'\''
    var code = 'atob(' + input + ')'
    return [code, Blockly.JavaScript.ORDER_ADDITION]
}

Blockly.JavaScript.forBlock['lists_append'] = function(block, generator) {
    var list = Blockly.JavaScript.nameDB_.getName(block.getFieldValue("FIELDVALUE"), Blockly.Names.NameType.VARIABLE) || '[]'
    var input = generator.valueToCode(block, "VALUE", Blockly.JavaScript.ORDER_ADDITION) || '\'\''
    var code = list + '.push(' + input + ')\n'
    return code
}

Blockly.JavaScript.forBlock['text_copy'] = function(block, generator) {
    var input = generator.valueToCode(block, "VALUE", Blockly.JavaScript.ORDER_ADDITION) || '\'\''
    var code = 'navigator.clipboard.writeText(' + input + ')\n'
    return code
}

Blockly.JavaScript.forBlock['text_paste_function'] = function(block, generator) {
    var input = generator.statementToCode(block, "VALUE", Blockly.JavaScript.ORDER_NONE) || ''
    var code = 'navigator.clipboard.readText()\n.then((output) => {\n   ' + input + '\n})\n'
    return code
}

Blockly.JavaScript.forBlock['text_paste'] = function() {
    var code = 'output';
    return [code, Blockly.JavaScript.ORDER_ADDITION]
}

Blockly.JavaScript.forBlock['comment'] = function(block) {
    var input = block.getFieldValue("INPUT")
    var code = '// ' + input + '\n'
    return code
}
