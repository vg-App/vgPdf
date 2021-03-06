import * as React from 'react';
import * as PropTypes from 'prop-types';
import { PDFExportProps } from './PDFExportProps';
/**
 * Represents the vgReact PDFExport component.
 */
export default class PDFExport extends React.Component<PDFExportProps, {}> {
    /**
     * @hidden
     */
    static propTypes: {
        author: PropTypes.Requireable<any>;
        avoidLinks: PropTypes.Requireable<any>;
        forcePageBreak: PropTypes.Requireable<any>;
        keepTogether: PropTypes.Requireable<any>;
        creator: PropTypes.Requireable<any>;
        date: PropTypes.Requireable<any>;
        imageResolution: PropTypes.Requireable<any>;
        fileName: PropTypes.Requireable<any>;
        forceProxy: PropTypes.Requireable<any>;
        keywords: PropTypes.Requireable<any>;
        landscape: PropTypes.Requireable<any>;
        margin: PropTypes.Requireable<any>;
        pageTemplate: PropTypes.Requireable<any>;
        paperSize: PropTypes.Requireable<any>;
        repeatHeaders: PropTypes.Requireable<any>;
        scale: PropTypes.Requireable<any>;
        proxyData: PropTypes.Requireable<any>;
        proxyURL: PropTypes.Requireable<any>;
        proxyTarget: PropTypes.Requireable<any>;
        producer: PropTypes.Requireable<any>;
        subject: PropTypes.Requireable<any>;
        title: PropTypes.Requireable<any>;
    };
    private rootElForPDF;
    /**
     * @hidden
     */
    render(): JSX.Element;
    /**
     * Saves the content as a PDF file.
     *
     * @param callback - The callback to be executed after the PDF is saved.
     */
    save(callback?: () => void): void;
    private getOptions;
}
