import React, { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { FaChevronDown } from "react-icons/fa";
import { YearData,LanguageData,RatesData,TimesData } from '../Components/Data/FilterData';
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesAction } from "../Redux/Action/categoryAction";

const Filter = ({data}) => {
  const dispatch = useDispatch();
  const {isSuccess,categories } = useSelector(
    (state) => state.getCategories
  );
  const [newArray, setNewArray] = useState([]);
  useEffect(() => {
    dispatch(getCategoriesAction());
  }, [dispatch]);
  useEffect(() => {
    if (isSuccess) {
      const updatedArray = categories.map(obj => ({
        _id: obj._id,
        title: obj.name
      }));
      setNewArray([
        { _id: "", title: "All Category" },
        ...updatedArray
      ]);
    }
  }, [isSuccess]);

  const filters = [
    {
      value: data.year,
      onChange: data.setYear,
      items: YearData,
    },
    {
      value: data.language,
      onChange: data.setLanguage,
      items: LanguageData,
    },
    {
      value: data.rates,
      onChange: data.setRates,
      items: RatesData,
    },
    {
      value: data.times,
      onChange: data.setTimes,
      items: TimesData,
    },
    {
      value: data.category,
      onChange: data.setCategory,
      items: newArray,
    },
  ];
  return (
    <div className="my-6 bg-dry border text-dryGray border-gray-800 grid md:grid-cols-5 grid-cols-2 lg:gap-12 gap-2 rounded p-6">
      {filters.map((item, index) => (
        <Listbox key={index} value={item.value} onChange={item.onChange}>
          <div className="ralative">
            <Listbox.Button className="relative border border-gray-800  w-full text-white bg-main rounded-lg cursor-default py-4 pl-6 pr-10 text-left text-xs">
              <span className="block truncate">{item.value.title}</span>
              <span className="absolute inset-y-0 right-0 flex items-center pointer-events-none pr-2">
                <FaChevronDown />
              </span>
            </Listbox.Button>
            <div className="relative">
              <Transition
                as={Fragment}
                leave="transition duration-100 ease-in"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 w-full bg-white border border-gray-800 text-dryGray rounded-md shadow-lg max-h-60 py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                  {item.items.map((data, i) => (
                    <Listbox.Option
                      key={i}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 text-main ${
                          active ? "bg-subMain text-white" : ""
                        }`
                      }
                      value={data}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncated ${
                              selected ? "font-bold" : "font-normal"
                            }`}
                          >
                            {data.title}
                          </span>
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </div>
        </Listbox>
      ))}
    </div>
  );
};

export default Filter;
