export const GST_PERCENT = 5;
export const PACKING_PERCENT = 3;
export const SHIPMENT_CHARGE = 100;

export const calculateBill = (subtotal) => {
  const gst = (subtotal * GST_PERCENT) / 100;
  const packing = (subtotal * PACKING_PERCENT) / 100;
  const shipment = SHIPMENT_CHARGE;

  return {
    subtotal,
    gst,
    packing,
    shipment,
    total: subtotal + gst + packing + shipment,
  };
};