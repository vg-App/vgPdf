import { drawDOM, exportPDF } from '@vgPdf/test/vg-drawing';
import { saveAs } from '@vgPdf/test/vg-file-saver';
import vgDrawingAdapter from './vgDrawingAdapter';
/**
 * Saves the content of a DOM element to a PDF file.
 *
 * @param domElement - The root DOM element to save to a PDF file.
 * @param options - The export options.
 * @param callback - The callback to be executed after the PDF is saved.
 */
export function savePDF(domElement, options, callback) {
    if (options === void 0) { options = {}; }
    new vgDrawingAdapter(drawDOM, exportPDF, saveAs, domElement, options).savePDF(callback);
}
//# sourceMappingURL=savePDF.js.map
