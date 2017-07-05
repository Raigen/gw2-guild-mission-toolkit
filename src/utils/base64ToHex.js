"use strict";
exports.__esModule = true;
function base64toHEX(base64) {
    var raw = atob(base64);
    var HEX = '';
    for (var i = 0; i < raw.length; i++) {
        var _hex = raw.charCodeAt(i).toString(16);
        HEX += _hex.length === 2 ? _hex : '0' + _hex;
    }
    return HEX.toUpperCase();
}
exports.base64toHEX = base64toHEX;
function hexToBase64(hex) {
    return btoa(hex
        .match(/\w{2}/g)
        .map(function (a) {
        return String.fromCharCode(parseInt(a, 16));
    })
        .join(''));
}
exports.hexToBase64 = hexToBase64;
function extractPOIId(hex) {
    return hex.substr(2, 4);
}
exports.extractPOIId = extractPOIId;
function flipOrder(input) {
    return input.substr(2) + input.substr(0, 2);
}
exports.flipOrder = flipOrder;
function IdToChatCode(id) {
    var hexId = id.toString(16);
    if (hexId.length === 3)
        hexId = '0' + hexId;
    var flippedId = flipOrder(hexId);
    var fullHexCode = "04" + flippedId + "0000";
    return "[&" + hexToBase64(fullHexCode) + "]";
}
exports.IdToChatCode = IdToChatCode;
