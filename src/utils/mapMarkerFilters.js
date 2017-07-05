"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
exports.__esModule = true;
var lodash_1 = require("lodash");
function filterWaypoints(a) {
    return a.type === 'waypoint';
}
function getWaypoints(raw) {
    return lodash_1.uniqBy(lodash_1.flattenDeep(Object.keys(raw.regions).map(function (regionKey) {
        var region = raw.regions[regionKey];
        return Object.keys(region.maps).map(function (mapKey) {
            var map = region.maps[mapKey];
            return map.points_of_interest
                .filter(filterWaypoints)
                .map(function (rawPoi) { return (__assign({}, rawPoi, { mapKey: Number.parseInt(mapKey) })); });
        });
    })), 'poi_id');
}
exports.getWaypoints = getWaypoints;
