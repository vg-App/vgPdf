import { DrawOptions, Group } from '@vgPdf/vg-drawing';
import { PDFOptions } from '@vgPdf/vg-drawing/pdf';
import { SaveOptions } from '@vgPdf/vg-file-saver';
import { PDFExportProps } from './PDFExportProps';
/**
 * @hidden
 */
export default class vgDrawingAdapter {
    private drawDOM;
    private exportPDF;
    private saveAs;
    private domElement;
    private options;
    constructor(drawDOM: (element: HTMLElement, options: DrawOptions) => Promise<Group>, exportPDF: (group: Group, options: PDFOptions) => Promise<string>, saveAs: (dataUri: string, fileName: string, options: SaveOptions) => void, domElement: HTMLElement, options?: PDFExportProps);
    savePDF(callback?: () => void): void;
    private getDrawOptions;
    private getPDFOptions;
    private getSaveOptions;
    private convertPageTemplateToHtml;
}
