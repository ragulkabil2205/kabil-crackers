import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { SHOP } from "../config/shopConfig";

export function generateInvoice(order) {
  const doc = new jsPDF();

  // ==========================
  // HEADER
  // ==========================
  doc.setFillColor(13, 37, 63);
  doc.rect(0, 0, 210, 35, "F");

  doc.setTextColor(255, 215, 0);
  doc.setFontSize(22);
  doc.text(SHOP.name, 20, 18);

  doc.setFontSize(10);
  doc.text("Premium Sivakasi Fireworks", 20, 27);

  // ==========================
  // SHOP DETAILS
  // ==========================
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);

  doc.text(SHOP.address.line1, 20, 45);
  doc.text(
    `${SHOP.address.area}, ${SHOP.address.city}`,
    20,
    51
  );

  doc.text(
    `${SHOP.address.state} - ${SHOP.address.pincode}`,
    20,
    57
  );

  doc.text(`Phone : ${SHOP.phones[0]}`, 20, 63);

  doc.text(`Email : ${SHOP.email}`, 20, 69);

  // ==========================
  // INVOICE BOX
  // ==========================
  doc.setDrawColor(80);

  doc.roundedRect(140, 42, 55, 24, 3, 3);

  doc.setFontSize(10);

  doc.text(`Invoice`, 145, 48);
  doc.text(`${order.id}`, 145, 54);

  doc.text(`Date`, 145, 60);
  doc.text(`${order.orderDate}`, 145, 66);

  // ==========================
  // CUSTOMER DETAILS
  // ==========================
  doc.setFontSize(12);
  doc.text("Customer Details", 20, 82);

  doc.setFontSize(10);

  doc.text(
    `Name : ${order.customer || "-"}`,
    20,
    90
  );

  doc.text(
    `Phone : ${order.phone || "-"}`,
    20,
    96
  );

  doc.text(
    `Address : ${order.address || "-"}`,
    20,
    102
  );

  // ==========================
  // PRODUCT TABLE
  // ==========================
  autoTable(doc, {
    startY: 110,

    head: [
      [
        "Product",
        "Qty",
        "Unit Price",
        "Total",
      ],
    ],

    body: (order.items || []).map((item) => [
      item.name,
      item.quantity,
      `₹${item.price}`,
      `₹${item.quantity * item.price}`,
    ]),

    theme: "grid",

    headStyles: {
      fillColor: [13, 37, 63],
      textColor: [255, 255, 255],
    },
  });

  const tableEndY = doc.lastAutoTable.finalY + 12;

  // ==========================
  // BILL SUMMARY
  // ==========================
  doc.roundedRect(125, tableEndY, 70, 45, 3, 3);

  let y = tableEndY + 8;

  doc.setFontSize(10);

  doc.text(`Subtotal`, 130, y);
  doc.text(`₹${order.subtotal}`, 175, y);

  y += 7;

  doc.text(`GST (8%)`, 130, y);
  doc.text(`₹${order.gst}`, 175, y);

  y += 7;

  doc.text(`Packing`, 130, y);
  doc.text(`₹${order.packing}`, 175, y);

  y += 7;

  doc.text(`Delivery`, 130, y);
  doc.text(`₹${order.shipment}`, 175, y);

  y += 10;

  doc.setFontSize(12);

  doc.text(`Grand Total`, 130, y);
  doc.text(`₹${order.total}`, 170, y);

  // ==========================
  // FOOTER
  // ==========================
  doc.setFillColor(13, 37, 63);
  doc.rect(0, 280, 210, 17, "F");

  doc.setTextColor(255);
  doc.setFontSize(10);

  doc.text(
    "💛 Thank You For Shopping With Kabil Crackers",
    15,
    289
  );

  // ==========================
  // SAVE
  // ==========================
  doc.save(`Invoice-${order.id}.pdf`);
}