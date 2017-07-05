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
var CopyToClipboard = require("react-copy-to-clipboard");
var React = require("react");
var AutoComplete_1 = require("material-ui/AutoComplete");
var base64ToHex_1 = require("../utils/base64ToHex");
var WaypointSelection = (function (_super) {
    __extends(WaypointSelection, _super);
    function WaypointSelection() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            searchText: '',
            selectedId: 0
        };
        _this.handleNewRequest = function (waypoint) { return _this.waypointSelected(waypoint); };
        return _this;
    }
    WaypointSelection.prototype.waypointSelected = function (waypoint) {
        this.setState({
            searchText: waypoint.text,
            selectedId: waypoint.value
        });
        var selectedPoi = this.props.pois.find(function (poi) { return poi.poi_id === waypoint.value; });
        if (this.props.onWaypointSelected && selectedPoi) {
            this.props.onWaypointSelected(selectedPoi);
        }
    };
    WaypointSelection.prototype.render = function () {
        var _this = this;
        var pois = this.props.mapKey
            ? this.props.pois.filter(function (poi) { return poi.mapKey === _this.props.mapKey; })
            : this.props.pois;
        return (React.createElement("div", null,
            React.createElement(AutoComplete_1["default"], { hintText: 'waypoints', searchText: this.state.searchText, maxSearchResults: 5, onNewRequest: this.handleNewRequest, dataSource: pois.map(function (poi) { return ({ text: poi.name, value: poi.poi_id }); }) })));
    };
    return WaypointSelection;
}(React.Component));
exports.WaypointSelection = WaypointSelection;
var Waypoint = (function (_super) {
    __extends(Waypoint, _super);
    function Waypoint() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { copied: false };
        return _this;
    }
    Waypoint.prototype.setCopied = function () {
        var _this = this;
        this.setState({ copied: true });
        window.setTimeout(function () {
            _this.setState({ copied: false });
        }, 3000);
    };
    Waypoint.prototype.render = function () {
        var _this = this;
        var _a = this.props, name = _a.name, id = _a.id;
        var code = base64ToHex_1.IdToChatCode(id);
        return (React.createElement("span", null,
            name,
            React.createElement(CopyToClipboard, { text: code, onCopy: function () { return _this.setCopied(); } },
                React.createElement("span", null,
                    "(",
                    code,
                    ")",
                    ' ',
                    this.state.copied &&
                        React.createElement("span", { style: { color: 'green' } }, " Copied")))));
    };
    return Waypoint;
}(React.Component));
exports.Waypoint = Waypoint;
