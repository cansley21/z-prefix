import React, {useState, createContext} from 'react';
import './App.css'
import {LoginForm} from './LoginForm';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Homepage from './Homepage.js';
import Details from './Details.js';


export const AppContext = createContext();

export default function App() {

  const [resources, setResources] = useState(false);
  const [filter, setFilter] = useState([]);
  const [details, setDetails] = useState(false);
  const [searchQuery, setSearchQuery] = useState(false);
  const [affil, setAffil] = useState(false);

  return (
    <>
    <AppContext.Provider value={{
      resources,
      setResources,
      filter,
      setFilter,
      details,
      setDetails,
      searchQuery,
      setSearchQuery,
      affil,
      setAffil
    }}>
      <Router>
        <Routes>
          <Route path='/' element={<LoginForm />}></Route>
          <Route path='/resources' element={<Homepage />}></Route>
          <Route path='/resources/:id' element={<Details />}></Route>
        </Routes>
      </Router>
    </AppContext.Provider>
    </>
  )
}