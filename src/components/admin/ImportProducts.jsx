import { useState } from "react";
import * as XLSX from "xlsx";
import { useProducts } from "../../context/ProductsContext";

function ImportProducts({ isOpen, onClose }) {
  const { addProduct, products } = useProducts();

  const [excelData, setExcelData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [summary, setSummary] = useState(null);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      const workbook = XLSX.read(event.target.result, {
        type: "binary",
      });

      const sheet =
        workbook.Sheets[workbook.SheetNames[0]];

      const data = XLSX.utils.sheet_to_json(sheet);

      setExcelData(data);
      setSummary(null);
      setProgress(0);
    };

    reader.readAsBinaryString(file);
  };

  const importProducts = async () => {
    if (excelData.length === 0) {
      alert("Please select an Excel file.");
      return;
    }

    setLoading(true);

    let imported = 0;
    let skipped = 0;
    let failed = 0;

    for (let i = 0; i < excelData.length; i++) {
      const row = excelData[i];

      try {
        const exists = products.some(
          (p) =>
            p.name.trim().toLowerCase() ===
            String(row.name).trim().toLowerCase()
        );

        if (exists) {
          skipped++;
        } else {
          await addProduct({
            name: row.name,
            category: row.category,
            originalPrice: Number(row.originalPrice),
            price: Number(row.price),
            stock: Number(row.stock),
            rating: Number(row.rating),
            reviews: Number(row.reviews),
            bestseller:
              String(row.bestseller).toLowerCase() === "true",
            image: row.image,
          });

          imported++;
        }
      } catch (err) {
        console.error(err);
        failed++;
      }

      setProgress(
        Math.round(((i + 1) / excelData.length) * 100)
      );
    }

    setSummary({
      imported,
      skipped,
      failed,
    });

    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">

      <div className="bg-white rounded-2xl w-full max-w-3xl p-6">

        <h2 className="text-3xl font-bold mb-6">
          📄 Import Products
        </h2>

        <input
          type="file"
          accept=".xlsx,.xls"
          onChange={handleFile}
          className="mb-6"
        />

        {excelData.length > 0 && (
          <>
            <p className="mb-4 font-semibold">
              {excelData.length} products ready to import.
            </p>

            <div className="border rounded-lg max-h-60 overflow-auto mb-6">

              <table className="w-full text-sm">

                <thead className="bg-gray-100">

                  <tr>

                    <th className="p-2">Name</th>

                    <th className="p-2">Category</th>

                    <th className="p-2">Price</th>

                    <th className="p-2">Stock</th>

                  </tr>

                </thead>

                <tbody>

                  {excelData.slice(0, 10).map((item, index) => (
                    <tr key={index}>

                      <td className="p-2">{item.name}</td>

                      <td className="p-2">{item.category}</td>

                      <td className="p-2">₹{item.price}</td>

                      <td className="p-2">{item.stock}</td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>

            {loading && (
              <>
                <div className="w-full bg-gray-200 rounded-full h-4 mb-2">

                  <div
                    className="bg-green-600 h-4 rounded-full"
                    style={{ width: `${progress}%` }}
                  />

                </div>

                <p>{progress}% Completed</p>
              </>
            )}

            {summary && (
              <div className="bg-green-50 rounded-xl p-4 my-4">

                <p>✅ Imported : {summary.imported}</p>

                <p>⚠️ Skipped : {summary.skipped}</p>

                <p>❌ Failed : {summary.failed}</p>

              </div>
            )}

            <div className="flex gap-4 mt-6">

              <button
                onClick={importProducts}
                disabled={loading}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl"
              >
                🚀 Import Products
              </button>

              <button
                onClick={onClose}
                className="bg-gray-300 px-6 py-3 rounded-xl"
              >
                Close
              </button>

            </div>
          </>
        )}

      </div>

    </div>
  );
}

export default ImportProducts;