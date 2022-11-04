import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const ExportExcelFile = ({ estaciones, name }) => {
  const fileType = "xlsx";
  const nameLower = name.toLowerCase()

  const exportToExcel = () => {
    const dataEstaciones = XLSX.utils.json_to_sheet(estaciones);
    const wb = {
      Sheets: { estaciones: dataEstaciones  },
      SheetNames: [nameLower],
    };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, name + ".xlsx");
  };

  return (
    <button onClick={exportToExcel} className="btn bg-gradient-primary text-capitalize mt-3 ms-4">Excel</button>
  )
}
export default ExportExcelFile