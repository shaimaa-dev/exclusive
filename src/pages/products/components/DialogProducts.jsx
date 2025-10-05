import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import useData from '../../../hooks/useData';

const DialogProducts = () => {
  const { dispatch , selectedProduct , isOpen } = useData();
  if (!selectedProduct) return null;
  const closeDialog = () => {
    dispatch({type: "CLOSE_PRODUCT"})
  }
  const addToCart = () => {
        dispatch({type:"ADD_TO_CART",payload:selectedProduct});
        closeDialog();
    }
  return (
    <Dialog open={isOpen} onClose={closeDialog} className="relative z-50">
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
          <img
            src={selectedProduct.thumbnail}
            alt={selectedProduct.title}
            className="block mx-auto w-[200px] rounded-lg mb-4"
          />
          <DialogTitle className="text-lg font-semibold text-gray-900">
            {selectedProduct.title}
          </DialogTitle>

          <p className="mt-2 text-xl font-bold text-red-500">
            ${selectedProduct.price}
          </p>
          <p className="mt-2 text-sm text-gray-600 line-clamp-3">
            {selectedProduct.description}
          </p>
          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={closeDialog}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              Close
            </button>
            <button
              className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
              onClick={addToCart}
            >
              Add to Cart
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  )
}

export default DialogProducts
