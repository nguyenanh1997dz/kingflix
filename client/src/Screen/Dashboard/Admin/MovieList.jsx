import React, { useEffect, useState } from "react";
import HomeAdmin from "./HomeAdmin";
import { Table } from "../../../Components/Table";
import { useDispatch, useSelector } from "react-redux";
import EditMovieModal from "../../../Components/Modal/EditMovieModal";
import { getAllMoviesAction } from "../../../Redux/Action/movieAction";
import Loader from "../../../Components/Loader";


const MovieList = () => {
  const dispatch = useDispatch();

  const [modalOpen,setModalOpen] = useState(false)
  const { isSuccess, isLoading, isError, allMovies } = useSelector(
    (state) => state.getAllMovies
  );

  useEffect(() => {
    dispatch(getAllMoviesAction());
    if (isError) {
      dispatch({type:GET_ALL_MOVIES_RESET});
    }
  }, [dispatch,isError]);
  return (
    <HomeAdmin>
      <EditMovieModal modalOpen={modalOpen}  setModalOpen={setModalOpen}></EditMovieModal>
        <div className="flex flex-col gap-6">
          <div className="flex-btn gap-2">
            <h2 className="text-xl font-bold">Movies List</h2>
          </div>
          {isLoading && <Loader></Loader>}
           {isSuccess && <Table admin={true} data={allMovies}></Table>} 
        </div>
      
    </HomeAdmin>
  );
};

export default MovieList;
