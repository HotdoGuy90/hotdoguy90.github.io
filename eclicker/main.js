var E = 0
const Ecount = document.getElementById("count")
Ecount.innerHTML = E
var isProtected = false
var helper1
var helper2
var cost = 200
const costDisplay = document.getElementById("cost")
costDisplay.innerHTML = cost

var params = new URLSearchParams(document.location.search)
var json = decodeURIComponent(params.get("save"))
if (json != null) {
    var jsonObj = JSON.parse(json)
    cost = jsonObj.cost
    costDisplay.innerHTML = cost
    E = jsonObj.ECount
    Ecount.innerHTML = E
    if (jsonObj.hasHelper) {
        E += 50
        helperPurchase()
    };
    if (jsonObj.hasHelper2) {
        E += 500
        helper2Purchase()
    };
    if (jsonObj.hasProtector) {
        E += 200
        protectorPurchase()
    };
    if (jsonObj.hasHelper3) {
        E += 750
        helper3Purchase()
    };
    if (jsonObj.hasDefender) {
        E += 700
        defenderPurchase()
    }
}

Ecount.innerHTML = E

function eClick() {
    E += 1
    Ecount.innerHTML = E
}

function helper3Setup() {
    const item5Container = document.getElementById("item5container")
    item5Container.innerText = ''
    var item5 = document.createElement("button")
    var item5Text = document.createTextNode("Click to Upgrade")
    var item5Id = document.createAttribute("id")
    item5Id.value = 'item5'
    var item5Onclick = document.createAttribute("onclick")
    item5Onclick.value = 'helper3Purchase()'
    item5.appendChild(item5Text)
    item5.setAttributeNode(item5Id)
    item5.setAttributeNode(item5Onclick)
    item5Container.appendChild(item5)
}

function helper2Setup() {
    const item3Container = document.getElementById("item3container")
    item3Container.innerText = ''
    var item3 = document.createElement("button")
    var item3Text = document.createTextNode("Click to Upgrade")
    var item3Id = document.createAttribute("id")
    item3Id.value = 'item3'
    var item3Onclick = document.createAttribute("onclick")
    item3Onclick.value = 'helper2Purchase()'
    item3.appendChild(item3Text)
    item3.setAttributeNode(item3Id)
    item3.setAttributeNode(item3Onclick)
    item3Container.appendChild(item3)
}

function helperPurchase() {
    const item1 = document.getElementById("item1")
    const item1Container = document.getElementById("item1container")
    if (E >= 50) {
        item1.remove()
        var newItem = document.createTextNode("Purchased!")
        item1Container.appendChild(newItem)
        E -= 50
        Ecount.innerHTML = E
        helper1 = setInterval(function() {
            eClick()
        }, 1000)
        helper2Setup()
    } else {
        window.alert("Not Enough Clicks!")
    }
}

function helper2Purchase() {
    const item3 = document.getElementById("item3")
    const item3container = document.getElementById("item3container")
    if (E >= 500) {
        item3.remove()
        clearInterval(helper1)
        var newItem3 = document.createTextNode("Purchased!")
        item3container.appendChild(newItem3)
        E -= 500
        Ecount.innerHTML = E
        helper2 = setInterval(function() {
            eClick()
        }, 500)
        helper3Setup()
    } else {
        window.alert("Not Enough Clicks!")
    }
}

function helper3Purchase() {
    const item5 = document.getElementById("item5")
    const item5Container = document.getElementById("item5container")
    if (E >= 750) {
        item5.remove()
        clearInterval(helper2)
        var newItem5 = document.createTextNode("Purchased!")
        item5Container.appendChild(newItem5)
        E -= 750
        Ecount.innerHTML = E
        setInterval(function() {
            eClick()
        }, 250)
    } else {
        window.alert("Not Enough Clicks!")
    }
}

function protectorPurchase() {
    const item2 = document.getElementById("item2")
    const item2Container = document.getElementById("item2container")
    if (E >= cost) {
        item2.remove()
        var newItem2 = document.createTextNode("Purchased!")
        item2Container.appendChild(newItem2)
        E -= cost
        Ecount.innerHTML = E
        isProtected = true
    } else {
        window.alert("Not Enough Clicks!")
    }
}

var waitforTs = setInterval(function() {
    if (!isProtected) {
        window.alert("Game Over")
        const game = document.getElementById("game")
        game.remove()
        var newTitle = document.createElement("h1")
        var newTitleName = document.createTextNode("Game Over.")
        newTitle.appendChild(newTitleName)
        document.querySelector("body").appendChild(newTitle)
        var newParagraph = document.createElement("p")
        var newParagraphName = document.createTextNode("The Ts took over. You clicked The E " + E + " times when you died. Reload to start over!")
        newParagraph.appendChild(newParagraphName)
        document.querySelector("body").appendChild(newParagraph)
                clearInterval(waitforTs)
    } else {
        window.alert("The Ts came but you were saved by your E Protector!")
        isProtected = false
        cost += 100
        costDisplay.innerHTML = cost
        const item2Container = document.getElementById("item2container")
        item2Container.innerHTML = ''
        var item2 = document.createElement("button")
        var item2Onclick = document.createAttribute("onclick")
        item2Onclick.value = 'protectorPurchase()'
        item2.setAttributeNode(item2Onclick)
        var item2ID = document.createAttribute("id")
        item2ID.value = 'item2'
        item2.setAttributeNode(item2ID)
        var item2Text = document.createTextNode("Click To Purchase")
        item2.appendChild(item2Text)
        item2Container.appendChild(item2)
    }
}, (Math.floor(Math.random() * (300 - 120)) + 120) * 1000)

function defenderPurchase() {
    const item4 = document.getElementById("item4")
    const item4container = document.getElementById("item4container")
    if (E >= 700) {
        item4.remove()
        var newItem4 = document.createTextNode("Purchased!")
        item4container.appendChild(newItem4)
        E -= 700
        Ecount.innerHTML = E
        clearInterval(waitforTs)
        var delayedWaitForTs = setInterval(function() {
            if (!isProtected) {
                clearInterval(delayedWaitforTs)
                window.alert("Game Over")
                const game = document.getElementById("game")
                game.remove()
                var newTitle = document.createElement("h1")
                var newTitleName = document.createTextNode("Game Over.")
                newTitle.appendChild(newTitleName)
                document.querySelector("body").appendChild(newTitle)
                var newParagraph = document.createElement("p")
                var newParagraphName = document.createTextNode("The Ts took over. You clicked The E " + E + " times when you died. Reload to start over!")
                newParagraph.appendChild(newParagraphName)
                document.querySelector("body").appendChild(newParagraph)
            } else {
                window.alert("The Ts came but you were saved by your E Protector!")
                isProtected = false
                cost += 100
                costDisplay.innerHTML = cost
                const item2Container = document.getElementById("item2container")
                item2Container.innerHTML = ''
                var item2 = document.createElement("button")
                var item2Onclick = document.createAttribute("onclick")
                item2Onclick.value = 'protectorPurchase()'
                item2.setAttributeNode(item2Onclick)
                var item2ID = document.createAttribute("id")
                item2ID.value = 'item2'
                item2.setAttributeNode(item2ID)
                var item2Text = document.createTextNode("Click To Purchase")
                item2.appendChild(item2Text)
                item2Container.appendChild(item2)
            }
        }, (Math.floor(Math.random() * (480 - 420)) + 420) * 1000)
    } else {
        window.alert("Not Enough Clicks!")
    }
}

function saveGame() {
    var myLInK = document.createElement("a")
    var hasHelper
    var hasProtector
    var hasHelper2
    var hasHelper3
    var hasDefender
    if (document.getElementById("item1container").innerHTML == "Purchased!") {
        hasHelper = true
    } else {
        hasHelper = false
    };
    if (document.getElementById("item2container").innerHTML == "Purchased!") {
        hasProtector = true
    } else {
        hasProtector = false
    };
    if (document.getElementById("item3container").innerHTML == "Purchased!") {
        hasHelper2 = true
    } else {
        hasHelper2 = false
    };
    if (document.getElementById("item4container").innerHTML == "Purchased!") {
        hasDefender = true
    } else {
        hasDefender = false
    };
    if (document.getElementById("item5container").innerHTML == "Purchased!") {
        hasHelper3 = true
    } else {
        hasHelper3 = false
    };
    const save = {
        "ECount": E,
        "cost": cost,
        "hasHelper": hasHelper,
        "hasProtector": hasProtector,
        "hasHelper2": hasHelper2,
        "hasDefender": hasDefender,
        "hasHelper3": hasHelper3
    }
    file = new Blob([JSON.stringify(save)], {type: 'text/json'})
    var downloadUrl = URL.createObjectURL(file)

    var newlink = document.createAttribute("href")
    newlink.value = downloadUrl
    myLInK.setAttributeNode(newlink)
    var download = document.createAttribute("download")
    download.value = "my.save"
    myLInK.setAttributeNode(download)

    document.querySelector("#game").appendChild(myLInK)
    myLInK.click()
    URL.revokeObjectURL(downloadUrl)
}
