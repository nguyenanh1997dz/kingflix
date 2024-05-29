import React from 'react'
import ReactPaginate from 'react-paginate';
const Pagination = ({totalPage,setPage}) => {
  const handlePageClick = (event) => {
    setPage(event.selected+1);
  }
  return (
    <>
    <ReactPaginate
      breakLabel="..."
      nextLabel=">>"
      onPageChange={handlePageClick}
      pageRangeDisplayed={5}
      pageCount={totalPage}
      previousLabel="<<"
      renderOnZeroPageCount={null}
      containerClassName={'pagination'}
    />
  </>
  )
}

export default Pagination
