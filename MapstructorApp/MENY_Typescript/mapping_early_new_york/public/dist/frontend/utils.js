"use strict";
function generateRandomString(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i_1 = 0; i_1 < length; i_1++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}
