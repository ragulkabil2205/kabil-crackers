function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  productName,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

      <div className="bg-white rounded-2xl w-full max-w-md p-8">

        <h2 className="text-2xl font-bold text-red-600">
          🗑 Delete Product
        </h2>

        <p className="mt-4 text-gray-600">
          Are you sure you want to delete
        </p>

        <p className="mt-4 text-sm text-red-500">
  ⚠️ This action cannot be undone.
</p>

        <p className="font-bold text-lg mt-2 text-gray-800">
          "{productName}"
        </p>

        <div className="flex justify-end gap-4 mt-8">

          <button
            onClick={onClose}
            className="px-5 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 font-semibold transition"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold transition"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}

export default DeleteConfirmModal;