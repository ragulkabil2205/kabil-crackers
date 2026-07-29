export function generateBillNumber() {
  const lastBill = localStorage.getItem("lastBillNumber");

  let nextNumber = 1;

  if (lastBill) {
    nextNumber = Number(lastBill) + 1;
  }

  localStorage.setItem("lastBillNumber", nextNumber);

  return `KC${String(nextNumber).padStart(6, "0")}`;
}