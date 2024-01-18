"use client";
import { Combobox, Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";

const Button = (props: {
  children: React.ReactElement | string;
  first?: boolean;
  onClick?: () => void;
}) => {
  const { children, first = false } = props || false;
  return (
    <button
      onClick={props.onClick}
      type="button"
      className={`rounded-md ${
        first ? "bg-[#6558F5]" : "bg-white"
      } h-max w-max px-[3rem] py-[1rem] 
       ${
         first ? "text-white" : "text-[#6558F5]"
       } shadow-sm border-[1px] border-[#6558F5]`}
    >
      {children}
    </button>
  );
};

export const Container = (props: {
  children: React.ReactElement;
  vertical?: boolean;
}) => {
  const { children, vertical = false } = props;
  return (
    <div
      className={`flex flex-wrap ${
        vertical ? "flex-col" : ""
      }  w-full h-full py-[2rem]`}
    >
      {children}
    </div>
  );
};

export const Card = (props: {
  title: string;
  releaseDate: string;
  rating: number;
  onClick?: () => void;
}) => {
  return (
    <div
      onClick={props.onClick}
      className="cursor-pointer p-[2rem] h-[180px] flex flex-col mr-[1rem] mt-[1rem] min-w-[280px] justify-evenly bg-[#E0DEFD]"
    >
      <Text style="text-[16px]">{props.title}</Text>
      <Italic>Released : {props.releaseDate}</Italic>
      <Text style="font-[700]">{`Rating : ${props.rating}/10`}</Text>
    </div>
  );
};

export const Italic = (props: {
  children: React.ReactElement | string | string[];
  style?: string;
}) => {
  const { children } = props;
  return (
    <span className={`italic text-[14px] ${props.style}`}>{children}</span>
  );
};

export const Text = (props: {
  children: React.ReactElement | string;
  style?: string;
}) => {
  const { children } = props;
  return <span className={`text-[14px] ${props.style}`}>{children}</span>;
};

export const Search = (props: {
  label?: string | React.ReactElement;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="w-[40%] active:border:[#6558F5] active:border-[1px]">
      {props?.label}
      <div className="relative mt-2 flex items-center">
        <input
          onChange={props.onChange}
          type="text"
          name="search"
          id="search"
          className="block p-[1rem] w-full rounded-md border-0 py-1.5 pr-14 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
          <kbd className="inline-flex items-center rounded border border-gray-200 px-1 font-sans text-xs text-gray-400">
            ⌘K
          </kbd>
        </div>
      </div>
    </div>
  );
};

export const Input = (props: {
  label: string;
  name: string;
  type?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="mt-[1rem]">
      <input
        onChange={props.onChange}
        type={props.type || "text"}
        name={props.name}
        id={props.name}
        className="block p-[1rem] w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        placeholder={props.label}
      />
    </div>
  );
};

export function DialogModal(props: {
  title: string;
  children?: React.ReactElement | string;
  open: boolean;
  setOpen: () => void;
}) {
  return (
    <Transition.Root show={props.open} as={"div"}>
      <Dialog as="div" className="relative z-10" onClose={props.setOpen}>
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
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div className="flex justify-end">
                  <span
                    onClick={() => {
                      console.log("ondnsand"), props.setOpen();
                    }}
                    className="cursor-pointer"
                  >
                    ❌
                  </span>
                </div>
                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      {props.title}
                    </Dialog.Title>
                    <div className="mt-2">{props.children}</div>
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
export function ComboBox(props: {
  onClick?: (val) => void;
  list?: any[];
  onChange?: (val: string) => void;
  label: string;
}) {
  const [query, setQuery] = useState("");
  const [selectedPerson, setSelectedPerson] = useState(null);
  const people = [
    { id: 1, name: "Leslie Alexander" },
    // More users...
  ];
  console.log(props.list, "props.list");
  const filteredPeople = props.list || [];

  return (
    <Combobox as="div" value={selectedPerson} onChange={setSelectedPerson}>
      <div className="relative mt-2">
        <Combobox.Input
          className="w-full rounded-md border-0 bg-white py-[0.5rem] pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          onChange={(event) => (
            setQuery(event.target.value),
            props.onChange && props.onChange(event.target.value)
          )}
          placeholder={props.label}
          displayValue={(person) => person?.name}
        />

        {filteredPeople.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredPeople.map((person) => (
              <Combobox.Option
                onClick={() => props.onClick && props.onClick(person)}
                key={person.id}
                value={person}
                className="cursor-pointer flex justify-start p-[0.5rem]"
              >
                {({ active, selected }) => (
                  <>
                    <span>{person.name}</span>

                    {selected && <span>zxczx</span>}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  );
}

export const TextBoxDisplay = (props: {
  reviewerName: string;
  description: string;
  rating: number;
}) => {
  return (
    <div className="flex flex-col justify-between min-h-[150px] py-[2rem] border-[2px] mt-[1rem] px-[2rem]">
      <div className="flex justify-between">
        <Text style="text-[20px]">{props.description}</Text>
        <Text style="text-[20px]">{`${props.rating}`}</Text>
      </div>
      <Italic style="text-[16px]">{props.reviewerName}</Italic>
    </div>
  );
};

export default Button;
