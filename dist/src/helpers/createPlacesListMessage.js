"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPlacesListMessage = void 0;
const _constants_1 = require("../constants/index");
function createPlacesListMessage(data) {
    const filteredArr = data.features
        .filter((item) => item.properties.name)
        .slice(0, 8);
    const response = filteredArr.map((item, index) => `${++index}. ${item.properties.name} `);
    response.unshift(_constants_1.messages.info.places);
    return response.join('\n');
}
exports.createPlacesListMessage = createPlacesListMessage;
