import React, { useEffect } from 'react';
import SideBar from './SideBar';
import { Table } from '../../Components/Table';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { getFavoriteMoviesAction, deleteFavoriteMoviesAction } from '../../Redux/Action/userAction';
import { deleteFavoriteMovieByIdService } from '../../Redux/API/userService';
import { Empty } from '../../Components/Empty';


const FavoriteMovie = () => {
  const dispatch = useDispatch();
  const { isSuccess, isError, error, favoriteMovies } = useSelector((state) => state.getFavoriteMovies);
  const { isSuccess: isSuccessDelete, isError: isErrorDelete, error: errorDelete } = useSelector(
    (state) => state.deleteFavoriteMovies
  );

  useEffect(() => {
    dispatch(getFavoriteMoviesAction());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      toast.error(error);
      dispatch({ type: 'GET_FAVORITE_MOVIES_RESET' });
    }
  }, [isError, error, dispatch]);

  useEffect(() => {
    if (isErrorDelete) {
      toast.error(errorDelete);
      dispatch({ type: 'DELETE_FAVORITE_MOVIES_RESET' });
    } else if (isSuccessDelete) {
      dispatch(getFavoriteMoviesAction());
      dispatch({ type: 'DELETE_FAVORITE_MOVIES_RESET' });
    }
  }, [isSuccessDelete, isErrorDelete, errorDelete, dispatch]);

  const handleDeleteFavoriteMovie = () => {
    dispatch(deleteFavoriteMoviesAction());
    toast.success('All favorite movies deleted successfully');
  };

  const handleDelete = async (movieId) => {
    try {
      await deleteFavoriteMovieByIdService(movieId);
      toast.success('Movie deleted successfully');
      dispatch(getFavoriteMoviesAction());
    } catch (e) {
      toast.error('Failed to delete movie');
    }
  };

  return (
    <SideBar>
      <div className="flex flex-col gap-6">
        <div className="flex-btn gap-2">
          <h2 className="text-xl font-bold">Favorites Movies</h2>
          <button
            disabled={favoriteMovies?.length == 0}
            onClick={handleDeleteFavoriteMovie}
            className="bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded"
          >
            Delete All
          </button>
        </div>
        {isSuccess && <Table onDelete={handleDelete} data={favoriteMovies}></Table>}
      </div>
    </SideBar>
  );
};

export default FavoriteMovie;
