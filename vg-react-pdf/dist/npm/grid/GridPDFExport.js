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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var PropTypes = require("prop-types");
var getPageMargin_1 = require("../getPageMargin");
var savePDF_1 = require("../savePDF");
var provideSaveGridPDF_1 = require("./provideSaveGridPDF");
/**
 * A React component which facilitates the PDF export of the Grid.
 */
var GridPDFExport = /** @class */ (function (_super) {
    __extends(GridPDFExport, _super);
    function GridPDFExport(props) {
        var _this = _super.call(this, props) || this;
        _this.saveGridPDF = provideSaveGridPDF_1.provideSaveGridPDF(_this.getSavePDF());
        return _this;
    }
    /**
     * @hidden
     */
    GridPDFExport.prototype.render = function () {
        return null;
    };
    /**
     * Saves the content of the Grid as a PDF file.
     *
     * @param data - The data can be different from the currently displayed data in the Grid.
     * Can be used to export all Grid pages.
     * @param callback - The callback that will be executed after the PDF is saved.
     */
    GridPDFExport.prototype.save = function (data, callback) {
        this.saveGridPDF(this.getGrid(), Object.assign({}, this.props, { margin: getPageMargin_1.getPageMargin(this.props) }), callback, data, this.getCustomColumns());
    };
    GridPDFExport.prototype.getSavePDF = function () {
        return savePDF_1.savePDF;
    };
    GridPDFExport.prototype.getGrid = function () {
        return React.Children
            .toArray(this.props.children)
            .find(function (child) { return child &&
            child.type.displayName === 'vgReactGrid'; });
    };
    GridPDFExport.prototype.getCustomColumns = function () {
        return React.Children
            .toArray(this.props.children)
            .filter(function (child) { return child &&
            child.type.displayName === 'vgReactGridColumn'; });
    };
    /**
     * @hidden
     */
    GridPDFExport.propTypes = {
        author: PropTypes.string,
        avoidLinks: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
        forcePageBreak: PropTypes.string,
        keepTogether: PropTypes.string,
        creator: PropTypes.string,
        date: PropTypes.instanceOf(Date),
        imageResolution: PropTypes.number,
        fileName: PropTypes.string,
        forceProxy: PropTypes.bool,
        keywords: PropTypes.string,
        landscape: PropTypes.bool,
        margin: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.shape({
                left: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
                top: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
                right: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
                bottom: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
            })]),
        pageTemplate: PropTypes.any,
        paperSize: PropTypes.any,
        repeatHeaders: PropTypes.bool,
        scale: PropTypes.number,
        proxyData: PropTypes.any,
        proxyURL: PropTypes.string,
        proxyTarget: PropTypes.string,
        producer: PropTypes.string,
        subject: PropTypes.string,
        title: PropTypes.string
    };
    return GridPDFExport;
}(React.Component));
exports.GridPDFExport = GridPDFExport;
//# sourceMappingURL=GridPDFExport.js.map