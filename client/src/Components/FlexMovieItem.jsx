import React from 'react'
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";

const FlexMovieItem = ({movie}) => {
  return (
   <>
    <div className="flex items-center gap-2">
        <span  className="text-sm font-medium">{movie.name}</span>
    </div>
    <div className="flex items-center gap-2">
        <FaRegCalendarAlt className='text-subMain w-3 h-3'></FaRegCalendarAlt>
        <span className="text-sm font-medium">{movie?.year}</span>
    </div>

   </>
  )
}

export default FlexMovieItem