import React from "react";
import { Link } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Empty } from "./Empty";
const Row = ({ data, admin, onDelete }) => {
  console.log(data);
  const Text = "text-sm text-left leading-6 whitespace-nowrap px-5 py-3";
  return (
    <>
      {data.map((row) => (
        <tr key={row?._id}>
          <td className={Text}>
            <div className="w-12 p-1 bg-dry border border-border h-12 rounded overflow-hidden">
              <img
                className="h-full w-full object-cover"
                src={row?.image}
                alt={row?.name}
              />
            </div>
          </td>
          <td className={`${Text} truncate`}>{row?.name}</td>
          <td className={Text}>{row?.category.name}</td>
          <td className={Text}>{row?.language}</td>
          <td className={Text}>{row?.year}</td>
          <td className={Text}>{row?.rate}</td>
          <td className="text-sm text-left leading-6 whitespace-nowrap px-5 py-3 float-right flex-rows gap-2">
            {admin ? (
              <>
                <button
                  type="button"
                  className="border border-border bg-dry flex-rows gap-2 text-border rounded py-1 px-2"
                >
                  <FaEdit className="text-green-400" /> Edit
                </button>
                <button
                  type="button"
                  className="bg-subMain text-white rounded flex-colo w-8 h-8"
                >
                  <MdDelete />
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => onDelete(row._id)}
                  className="bg-subMain text-white rounded flex-colo w-8 h-8"
                >
                  <MdDelete />
                </button>
                <Link
                  to={`/movie/${row?._id}`}
                  className="bg-subMain text-white rounded flex-colo w-8 h-8"
                >
                  <FaRegEye />
                </Link>
              </>
            )}
          </td>
        </tr>
      ))}
    </>
  );
};
export const Table = ({ data, admin, onDelete }) => {
  const Head = "text-xs text-left text-main font-semibold px-6 py-2 uppercase";
  return (
    <>
      { data.length ? (
        <div className="overflow-x-scroll overflow-hidden relative w-full">
          <table className="w-full table-auto border border-border divide-y divide-border">
            <thead>
              <tr className="bg-dryGray">
                <th scope="col" className={Head}>
                  IMAGE
                </th>
                <th scope="col" className={Head}>
                  NAME
                </th>
                <th scope="col" className={Head}>
                  CATEGORY
                </th>
                <th scope="col" className={Head}>
                  LANGUAGE
                </th>
                <th scope="col" className={Head}>
                  YEAR
                </th>
                <th scope="col" className={Head}>
                  RATE
                </th>
                <th scope="col" className={`text-end ${Head}`}>
                  ACTIONS
                </th>
              </tr>
            </thead>
            <tbody className="bg-main divide-y divide-gray-800">
              <Row onDelete={onDelete} data={data} admin={admin}></Row>
            </tbody>
          </table>
        </div>
      ) : (
        <Empty message="No favorite movie"></Empty>
      )}
    </>
  );
};
