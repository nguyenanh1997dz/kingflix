import React from 'react'
import ReactStars from "react-rating-stars-component";
const Star = ({value }) => {
  console.log(value);
  return (
    <ReactStars
    count={5}
    size={24}
    value={value}
    activeColor="#ffd700"
  />
  )
}

export default Star