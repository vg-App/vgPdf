"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vg_drawing_1 = require("@vgPdf/vg-drawing");
var vg_file_saver_1 = require("@vgPdf/vg-file-saver");
var vgDrawingAdapter_1 = require("./vgDrawingAdapter");
/**
 * Saves the content of a DOM element to a PDF file.
 *
 * @param domElement - The root DOM element to save to a PDF file.
 * @param options - The export options.
 * @param callback - The callback to be executed after the PDF is saved.
 */
function savePDF(domElement, options, callback) {
    if (options === void 0) { options = {}; }
    new vgDrawingAdapter_1.default(vg_drawing_1.drawDOM, vg_drawing_1.exportPDF, vg_file_saver_1.saveAs, domElement, options).savePDF(callback);
}
exports.savePDF = savePDF;
//# sourceMappingURL=savePDF.js.map