import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const downloadInvoice = (order) => {
  const doc = new jsPDF();

  // ===== Header =====
  doc.setFillColor(25, 118, 210);
  doc.rect(0, 0, 210, 32, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("KABIL CRACKERS", 14, 16);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Premium Fireworks & Crackers", 14, 24);

  // Reset
  doc.setTextColor(0, 0, 0);

  // ===== Invoice Title =====
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("INVOICE", 150, 18);

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");

  doc.text(`Order ID : ${order.id}`, 14, 45);
  doc.text(`Date : ${order.orderDate}`, 14, 53);

  // ===== Customer Box =====
  doc.setDrawColor(220);
  doc.roundedRect(14, 60, 182, 35, 3, 3);

  doc.setFont("helvetica", "bold");
  doc.text("Customer Details", 18, 68);

  doc.setFont("helvetica", "normal");

  doc.text(`Name : ${order.customer}`, 18, 77);
  doc.text(`Phone : ${order.phone}`, 18, 84);
  doc.text(`Address : ${order.address}`, 18, 91);

  // ===== Products =====
  autoTable(doc, {
    startY: 105,
    head: [["Product", "Qty", "Price", "Total"]],
    body: order.items.map((item) => [
      item.name,
      item.quantity,
      `₹${Number(item.price).toLocaleString()}`,
      `₹${(item.price * item.quantity).toLocaleString()}`
    ]),
    theme: "grid",
    headStyles: {
      fillColor: [25,118,210],
      textColor: 255,
      halign: "center"
    },
    bodyStyles: {
      halign: "center"
    },
    columnStyles: {
      0: {
        halign: "left"
      }
    }
  });

  const y = doc.lastAutoTable.finalY + 12;

  // ===== Totals =====
  autoTable(doc, {
    startY: y,
    theme: "plain",
    body: [
      ["Items Total", `₹ ${Number(order.subtotal || 0).toLocaleString()}`],
      ["GST (5%)", `₹ ${Number(order.gst || 0).toFixed(2)}`],
      ["Packing Charges", `₹ ${Number(order.packing || 0).toFixed(2)}`],
      ["Shipment Charges", `₹ ${Number(order.shipment || 0).toLocaleString()}`],
      ["Grand Total", `₹ ${Number(order.total || 0).toFixed(2)}`],
    ],
    styles: {
      fontSize: 11
    },
    columnStyles: {
      0: {
        halign: "left",
        fontStyle: "bold"
      },
      1: {
        halign: "right",
        fontStyle: "bold"
      }
    },
    didParseCell(data) {
      if (data.row.index === 4) {
        data.cell.styles.fillColor = [25,118,210];
        data.cell.styles.textColor = [255,255,255];
        data.cell.styles.fontStyle = "bold";
        data.cell.styles.fontSize = 13;
      }
    }
  });

  // ===== Footer =====
  const footerY = doc.lastAutoTable.finalY + 18;

  doc.setFontSize(10);
  doc.setTextColor(120);

  doc.text(
    "Thank you for shopping with Kabil Crackers.",
    105,
    footerY,
    { align: "center" }
  );

  doc.text(
    "Happy & Safe Diwali!",
    105,
    footerY + 7,
    { align: "center" }
  );

  doc.save(`Invoice-${order.id}.pdf`);
};