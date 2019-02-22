"use strict";

var _core = require("../shared/core");

var _form = require("./form");

var _field = require("./field");

(0, _core.registerFormWrapper)((0, _form.StateForm)());
(0, _core.registerFieldMiddleware)((0, _field.StateField)());