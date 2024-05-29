import React from "react";
import { Link } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";
import { IoMdCloudDownload } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

import { shortUppercaseId,formatDate } from "../Context/libray";

const Row2 = ({ data, admin , onEdit,onDelete}) => {

 
  return (
    <>
      {data &&
        data.map((row) => (
          <tr key={row?._id}>
            <td className="text-sm text-left leading-6 whitespace-nowrap px-5 py-3 truncate">
              {shortUppercaseId(row?._id)}
            </td>
            <td className="text-sm text-left leading-6 whitespace-nowrap px-5 py-3 ">
              {formatDate(row?.createdAt)}
            </td>
            <td className="text-sm text-left leading-6 whitespace-nowrap px-5 py-3 ">
              {row?.name}
            </td>
            <td className="text-sm text-left leading-6 whitespace-nowrap px-5 py-3 float-right flex-rows gap-2">
              {admin ? (
                <>
                  <button onClick={()=> {onEdit(row)}} className="border border-border bg-dry flex-rows gap-2 text-border rounded py-1 px-2">
                    <FaEdit className="text-green-400" /> Edit
                  </button>
                  <Link onClick={()=> {onDelete(row?._id)}} className="bg-subMain text-white rounded flex-colo w-8 h-8">
                    <MdDelete />
                  </Link>
                </>
              ) : (
                <>
                  <button className="border border-border bg-dry flex-rows gap-2 text-border rounded py-1 px-2">
                    <IoMdCloudDownload className="text-green-400" /> Download
                  </button>
                  <Link className="bg-subMain text-white rounded flex-colo w-8 h-8">
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
export const Table2 = ({ data, admin ,onEdit,onDelete }) => {
  const Head = "text-xs text-left text-main font-semibold px-6 py-2 uppercase";
  const Text = "text-sm text-left leading-6 whitespace-nowrap px-5 py-3";
  return (
    <div className="overflow-x-scroll overflow-hidden relative w-full">
      <table className="w-full table-auto border border-border divide-y divide-border">
        <thead>
          <tr className="bg-dryGray">
            <th scope="col" className={Head}>
              ID
            </th>
            <th scope="col" className={Head}>
              DATE
            </th>
            <th scope="col" className={Head}>
              TITLE
            </th>
            <th scope="col" className={`text-end ${Head}`}>
              ACTIONS
            </th>
          </tr>
        </thead>
        <tbody className="bg-main divide-y divide-gray-800">
          <Row2 onDelete={onDelete} onEdit={onEdit} data={data} admin={admin}></Row2>
        </tbody>
      </table>
    </div>
  );
};
