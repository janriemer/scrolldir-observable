"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
app.use(express.static('public'));
var PORT = 8080;
app.listen(PORT, function () {
    console.log('Server is listening on port ' + PORT);
});
//# sourceMappingURL=server.js.map