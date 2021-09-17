import React, { useState} from 'react';
import filePdf from './mongodb.pdf'
import { Document, Page,pdfjs} from 'react-pdf';
import './previewBooks.css';
function PreviewBooks(){
    pdfjs.GlobalWorkerOptions.workerSrc = 
    `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setPageNumber(1);   
    }
    return(
        <div >
            <Document
                file={filePdf}
                onLoadSuccess={onDocumentLoadSuccess}
                >
                <Page className="root" pageNumber={pageNumber} />
            </Document>
        </div>
    )
}

export default PreviewBooks;