"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPlacesListMessage = void 0;
const constants_1 = require("../constants");
function createPlacesListMessage(data) {
    const filteredArr = data.features
        .filter((item) => item.properties.name)
        .slice(0, 8);
    const response = filteredArr.map((item, index) => `${++index}. ${item.properties.name} `);
    response.unshift(constants_1.messages.info.places);
    return response.join('\n');
}
exports.createPlacesListMessage = createPlacesListMessage;
