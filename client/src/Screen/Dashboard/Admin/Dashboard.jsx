import React from 'react'
import { Route, Routes } from 'react-router-dom';
import AddMovie from './AddMovie';
import MovieList from './MovieList';
import Categories from './Categories';
import Statistics from './Statistics';
import Users from './Users';

const Dashboard = () => {
  return (
    <Routes>
        <Route path="/*" element={<Statistics />} />
        <Route path="/add" element={<AddMovie />} />
        <Route path="/list" element={<MovieList />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/users" element={<Users />} />
    </Routes>
  )
}

export default Dashboard