var codeParam = new URLSearchParams(document.location.search)
var code = codeParam.get("code")
if (code) {
  var url = "https://runkit.io/hotdoguy90/osrmscript-api/branches/master/?code=" + code
} else {
  var url = "https://runkit.io/hotdoguy90/osrmscript-api/branches/master"
}
window.open(url, "_self").focus()
