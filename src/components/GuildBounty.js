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
var List_1 = require("material-ui/List");
var Waypoint_1 = require("./Waypoint");
var delete_1 = require("material-ui/svg-icons/action/delete");
var IconButton_1 = require("material-ui/IconButton");
var react_router_dom_1 = require("react-router-dom");
exports.EASY = 1;
exports.MID = 2;
exports.HARD = 3;
var targets = [
    { name: 'Brekkabek', mapKey: 17, difficulty: exports.EASY },
    { name: 'Puubaduu', mapKey: 23, difficulty: exports.EASY },
    { name: 'Trillia Midwell', mapKey: 21, difficulty: exports.EASY },
    { name: '2-MULT', mapKey: 29, difficulty: exports.MID },
    { name: 'Bücherwurm Bwikki', mapKey: 27, difficulty: exports.MID },
    { name: 'Halbgare Komali', mapKey: 39, difficulty: exports.MID },
    { name: 'Jähzorniger Felix', mapKey: 32, difficulty: exports.MID },
    { name: 'Sotzz das Schlitzohr', mapKey: 24, difficulty: exports.MID, special: 3 },
    { name: 'Yanonka, die Rattenhüterin', mapKey: 21, difficulty: exports.MID },
    {
        name: 'Ander "Wildmann" Westward',
        mapKey: 873,
        difficulty: exports.HARD,
        special: 1
    },
    { name: 'Diplomat Tarban', mapKey: 54, difficulty: exports.HARD },
    { name: 'Gefangene 1141', mapKey: 25, difficulty: exports.HARD },
    { name: 'Großer Mayana', mapKey: 53, difficulty: exports.HARD, special: 2 },
    { name: 'Reckin Michiele', mapKey: 53, difficulty: exports.HARD },
    { name: 'Schamane Arderus', mapKey: 22, difficulty: exports.HARD },
    { name: 'Tricksende Trekksa', mapKey: 20, difficulty: exports.HARD, special: 4 },
    { name: '"Unterkonstabler" Brooke', mapKey: 31, difficulty: exports.HARD },
    { name: 'Verschlagene Teesa', mapKey: 30, difficulty: exports.HARD }
];
var GuildBountyTarget = (function (_super) {
    __extends(GuildBountyTarget, _super);
    function GuildBountyTarget() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            selectedWaypoint: undefined,
            isHidden: false
        };
        _this.handleWaypointSelected = function (poi) {
            _this.setState({
                selectedWaypoint: poi
            });
        };
        return _this;
    }
    GuildBountyTarget.prototype.render = function () {
        var _this = this;
        var _a = this.props, name = _a.name, mapKey = _a.mapKey;
        var waypoint = this.state.selectedWaypoint;
        return (!this.state.isHidden &&
            React.createElement(List_1.ListItem, { disabled: true },
                React.createElement("h4", null,
                    name,
                    ' ',
                    React.createElement(IconButton_1["default"], { onClick: function () { return _this.setState({ isHidden: true }); } },
                        React.createElement(delete_1["default"], null))),
                waypoint
                    ? React.createElement("div", null,
                        React.createElement(Waypoint_1.Waypoint, { id: waypoint.poi_id, name: waypoint.name }),
                        React.createElement(IconButton_1["default"], { onClick: function () { return _this.setState({ selectedWaypoint: undefined }); } },
                            React.createElement(delete_1["default"], null)))
                    : React.createElement(Waypoint_1.WaypointSelection, { pois: window.waypoints, mapKey: mapKey, onWaypointSelected: this.handleWaypointSelected })));
    };
    return GuildBountyTarget;
}(React.Component));
var GuildBounty = (function (_super) {
    __extends(GuildBounty, _super);
    function GuildBounty() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GuildBounty.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", null,
            React.createElement("h1", null, "Guild Bounty"),
            React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement(react_router_dom_1.Link, { to: '/bounty?diff=1' }, "leicht")),
                React.createElement("li", null,
                    React.createElement(react_router_dom_1.Link, { to: '/bounty?diff=2' }, "mittel")),
                React.createElement("li", null,
                    React.createElement(react_router_dom_1.Link, { to: '/bounty?diff=3' }, "schwer"))),
            React.createElement(List_1.List, null, targets
                .filter(function (target) { return target.difficulty <= _this.props.difficulty; })
                .map(function (target) {
                return React.createElement(GuildBountyTarget, { key: target.name, name: target.name, difficulty: target.difficulty, mapKey: target.mapKey });
            }))));
    };
    return GuildBounty;
}(React.Component));
exports.GuildBounty = GuildBounty;
