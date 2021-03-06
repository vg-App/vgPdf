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
var vg_drawing_1 = require("@vgPdf/vg-drawing");
var vg_file_saver_1 = require("@vgPdf/vg-file-saver");
var getPageMargin_1 = require("./getPageMargin");
var vgDrawingAdapter_1 = require("./vgDrawingAdapter");
/**
 * Represents the vgReact PDFExport component.
 */
var PDFExport = /** @class */ (function (_super) {
    __extends(PDFExport, _super);
    function PDFExport() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @hidden
     */
    PDFExport.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { ref: function (el) { _this.rootElForPDF = el; } }, this.props.children));
    };
    /**
     * Saves the content as a PDF file.
     *
     * @param callback - The callback to be executed after the PDF is saved.
     */
    PDFExport.prototype.save = function (callback) {
        new vgDrawingAdapter_1.default(vg_drawing_1.drawDOM, vg_drawing_1.exportPDF, vg_file_saver_1.saveAs, this.rootElForPDF, this.getOptions()).savePDF(callback);
    };
    PDFExport.prototype.getOptions = function () {
        return Object.assign({}, this.props, { margin: getPageMargin_1.getPageMargin(this.props) });
    };
    /**
     * @hidden
     */
    PDFExport.propTypes = {
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
    return PDFExport;
}(React.Component));
exports.default = PDFExport;
//# sourceMappingURL=PDFExport.js.map