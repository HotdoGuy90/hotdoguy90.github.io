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

const getItemInList = {
    "type": "item_get",
    "message0": "From list %1 get item number %2",
    "args0": [
      {
        "type": "field_variable",
        "name": "FIELDVALUE",
        "variable": "list"
      },
      {
        "type": "field_number",
        "name": "NUMBERVALUE",
        "value": 1,
        "min": 1,
        "precision": 1
      }
    ],
    "output": null,
    "style": "list_blocks",
    "toolTip": "Gets Item #",
    "helpUrl": "https://www.w3schools.com/js/js_arrays.asp#:~:text=You%20can%20also%20create%20an%20array,%20and%20then%20provide%20the%20elements%3A"
}

Blockly.defineBlocksWithJsonArray([base64encode, base64decode, listappend, copytoclipboard, getcopiedtext, pastefromclipboard, comment, getItemInList])

Blockly.Python.forBlock['base64_encode'] = function(block, generator) {
    var input = generator.valueToCode(block, "VALUE", Blockly.Python.ATOMIC) || '\'\''
    generator.definitions_['import_base64'] = 'import base64'
    var code = 'base64.b64encode(' + input + ')'
    return [code, Blockly.Python.ATOMIC]
}

Blockly.Python.forBlock['base64_decode'] = function(block, generator) {
    var input = generator.valueToCode(block, "VALUE", Blockly.Python.ATOMIC) || '\'\''
    generator.definitions_['import_base64'] = 'import base64'
    var code = 'base64.b64decode(' + input + ')'
    return [code, Blockly.Python.ATOMIC]
}

Blockly.Python.forBlock['lists_append'] = function(block, generator) {
    var list = Blockly.Python.nameDB_.getName(block.getFieldValue("FIELDVALUE"), Blockly.Names.NameType.VARIABLE) || '[]'
    var input = generator.valueToCode(block, "VALUE", Blockly.Python.ATOMIC) || '\'\''
    var code = list + '.append(' + input + ')\n'
    return code
}

Blockly.Python.forBlock['text_copy'] = function(block, generator) {
    generator.definitions_['import_subprocess'] = 'import subprocess'
    const copy2clip = generator.provideFunction_('copy2clip', `
    def ${generator.FUNCTION_NAME_PLACEHOLDER_}(txt):
        cmd='echo '+txt.strip()+'|pbcopy'
        return subprocess.check_call(cmd, shell=True)
    `)
    var input = generator.valueToCode(block, "VALUE", Blockly.Python.ATOMIC) || '\'\''
    var code = copy2clip + '(' + input + ')\n'
    return code
}

Blockly.Python.forBlock['comment'] = function(block) {
    var input = block.getFieldValue("INPUT")
    var code = '# ' + input + '\n'
    return code
}

Blockly.Python.forBlock['item_get'] = function(block, generator) {
    var vari = Blockly.Python.nameDB_.getName(block.getFieldValue("FIELDVALUE"), Blockly.Names.NameType.VARIABLE) || '[]';
    var num = block.getFieldValue('NUMBERVALUE') || '0';
    var code = vari + '[' + Number(num - 1) + ']';
    return [code, Blockly.Python.ATOMIC];
}