import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const usePdfDownloader = () => {
  const downloadPdfDocument = (rootElementId,downloadFileName) => {
    const input = document.getElementById(rootElementId);
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "JPEG", 0, 0);
      pdf.save(`${downloadFileName}.pdf`);
    });
  };

  return downloadPdfDocument
};

export default usePdfDownloader;
