import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Product } from "../../models/products.model";

type Props = {
  product: Product;
  isVisible: boolean;
  onClose: () => void;
};

function ProductModal({ product, isVisible, onClose }: Props) {
  return (
    <Transition.Root show={isVisible} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose} role="dialog">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed z-10 inset-0 overflow-y-auto" data-testid='popup'>
          <div className="flex items-start sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative bg-white rounded-lg text-left overflow-y-auto shadow-xl transform transition-all sm:my-8 sm:max-w-3xl sm:w-full max-h-[40rem]">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-10">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-2xl sm:text-4xl leading-6 font-bold text-gray-900"
                      >
                        {product.title}
                      </Dialog.Title>
                      {product.animation ? (
                        <video controls className='mt-6'>
                          <source src={product.animation} type="video/mp4" />
                        </video>
                      ) : (
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-full h-full object-center object-cover lg:w-full lg:h-full mt-6"
                        />
                      )}
                      <div className="mt-2">
                        <p className="text-sm text-gray-500 mt-6">
                          {product.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default ProductModal;
