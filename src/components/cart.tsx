"use client";

import { Item } from "@/types/order";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/16/solid";
import axios from "axios";
import { on } from "events";
import { Fragment, useEffect, useState } from "react";
export const products = [
  {
    id: 1,
    name: "Throwback Hip Bag",
    href: "#",
    color: "Salmon",
    price: 90.0,
    quantity: 1,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg",
    imageAlt:
      "Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.",
  },
  {
    id: 2,
    name: "Medium Stuff Satchel",
    href: "#",
    color: "Blue",
    price: 32.0,
    quantity: 1,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
    imageAlt:
      "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
  },
  // More products...
];
export interface product {
  id: number;
  name: string;
  href: string;
  color: string;
  price: string;
  quantity: number;
  imageSrc: string;
  imageAlt: string;
}
export default function CartItems(props: {
  products?: Item[];
  onAddClick: (product: Item) => void;
  listHeading?: string;
}) {
  const { products } = props;
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-[30px] font-bold text-gray-900">
          {props.listHeading}
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
          {products?.map((product, i) => {
            return (
              <div key={product.id}>
                <div className="relative">
                  <div className="relative h-72 w-full overflow-hidden rounded-lg">
                    <img
                      src={
                        product.imageSrc || i % 2 == 0
                          ? "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg"
                          : "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg"
                      }
                      alt={product.imageAlt}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="relative mt-4">
                    <h3 className="text-sm font-medium text-gray-900">
                      {product.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.color}
                    </p>
                  </div>
                  <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
                    <div
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
                    />
                    <p className="relative text-lg font-semibold text-white">
                      ${product.price}
                    </p>
                  </div>
                </div>
                <div className="mt-6">
                  <div
                    onClick={() => props.onAddClick(product)}
                    className="relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200"
                  >
                    Add to bag
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function CheckoutCart(props: {
  products: Item[];
  open: boolean;
  setOpen: () => void;
  onRemoveClick: (id: number) => void;
}) {
  const [total, setTotal] = useState({
    new: 0,
    old: 0,
    coupon: "",
  });
  const { products, open, setOpen } = props;
  useEffect(() => {
    open && fetchShoppingCart(1);
    setTotal((val) => {
      const tmp = products.reduce((acc, item) => {
        const itemAmount = item.quantity * item.price;
        return acc + itemAmount;
      }, 0);
      return { ...val, old: tmp };
    });
  }, [products]);
  console.log(total, "total");
  const onUseCoupon = async (coupon: string) => {
    try {
      const reqURL = `/api/orders/checkout?c=${coupon}`;
      const res = await axios.get(reqURL);
      setTotal((val) => ({
        ...val,
        new: total.old - (total.old * res.data.percent) / 100,
        coupon,
      }));
    } catch (error) {
      console.log(error);
    }
  };
  const handleCheckout = async () => {
    try {
      const reqURL = `/api/orders/checkout`;
      const res = await axios.post(reqURL, {
        code: total.coupon,
        clientId: 1,
      });
      setTotal((val) => ({
        ...val,
        new: total.old - (total.old * res.data.percent) / 100,
      }));
    } catch (error) {
      console.log(error);
    }
  };
  const fetchShoppingCart = async (uid: number) => {
    try {
      const reqURL = `/api/orders?mid=${1}`;
      const res = await axios.get(reqURL);
      console.log(res.data, "res");
      // setSelectedProducts(res.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          Shopping cart
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => setOpen()}
                          >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul
                            role="list"
                            className="-my-6 divide-y divide-gray-200"
                          >
                            {products.map((product, i) => (
                              <li key={product.id} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    src={
                                      product.imageSrc || i % 2 == 0
                                        ? "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg"
                                        : "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg"
                                    }
                                    alt={product.imageAlt}
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>
                                        <span>{product.name}</span>
                                      </h3>
                                      <p className="ml-4">{product.price}</p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">
                                      {product.color}
                                    </p>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <p className="text-gray-500">
                                      Qty {product.quantity}
                                    </p>

                                    <div className="flex">
                                      <button
                                        onClick={() =>
                                          props.onRemoveClick(
                                            product.id ? product.id : 0
                                          )
                                        }
                                        type="button"
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <CartDialog onUse={(c) => onUseCoupon(c)} />
                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <div className="flex items-center flex-[0.3] justify-between">
                          <p className={`${total.new ? "line-through" : ""}`}>
                            ${total.old}
                          </p>
                          {total.new ? <p>${total.new}</p> : null}
                        </div>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        Shipping and taxes calculated at checkout.
                      </p>
                      <div className="mt-6">
                        <div
                          onClick={handleCheckout}
                          className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                          Checkout
                        </div>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or{" "}
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={() => setOpen()}
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
export const CartDialog = (props: { onUse: (c: string) => void }) => {
  const [coupon, setCoupon] = useState("");
  const onGenerateCoupon = () => {
    try {
      const reqURL = `/api/discount?uid=${1}`;
      axios.get(reqURL).then((res) => {
        console.log(res.data, "res");
        setCoupon(res.data.code);
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-base font-semibold leading-6 text-gray-900">
          Coupons?
        </h3>
        <div className="mt-2 max-w-xl text-sm text-gray-500">
          <p>Search or generate coupons to get discounts!!</p>
        </div>
        <div className="mt-5 sm:flex sm:items-center">
          <div className="w-full sm:max-w-xs">
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              type="email"
              name="email"
              id="email"
              className="p-[1rem] block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="COUPON CODE"
            />
          </div>
          <button
            onClick={() => props.onUse(coupon)}
            className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:ml-3 sm:mt-0 sm:w-auto"
          >
            Use!
          </button>
        </div>
        <div className="flex mt-[1rem] items-center">
          OR
          <button
            onClick={onGenerateCoupon}
            className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:ml-3 sm:mt-0 sm:w-auto"
          >
            Generate!
          </button>
        </div>
        <div className="flex justify-between mt-[0.5rem]">
          <div className="text-[16px] text-blue-400">
            {coupon ? (
              <>
                <span className="text-blue-900 mr-2">Here's your coupon!</span>
                {coupon}
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
