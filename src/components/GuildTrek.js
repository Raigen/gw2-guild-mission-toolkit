"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var React = require("react");
var Waypoint_1 = require("./Waypoint");
var GuildTrek = (function (_super) {
    __extends(GuildTrek, _super);
    function GuildTrek() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GuildTrek.prototype.render = function () {
        return React.createElement(Waypoint_1.WaypointSelection, { pois: window.waypoints });
    };
    return GuildTrek;
}(React.Component));
exports.GuildTrek = GuildTrek;
