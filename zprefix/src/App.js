import React, {useState, createContext} from 'react';
import './App.css'
import {LoginForm} from './LoginForm';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import HomepageNew from './HomepageNew';
import Navbar from './Navbar'
import Fruitpage from './Fruitpage';
import Pricing from './Pricing';
import Information from './Information';




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
      <Navbar />
        <Routes>
          <Route path='/' element={<LoginForm />}></Route>
          <Route path='/new' element={<HomepageNew />}></Route>
          <Route path='/fruit' element={<Fruitpage />}></Route>
          <Route path='/information' element={<Information />}></Route>
          <Route path='/pricing' element={<Pricing />}></Route>
        </Routes>
      </Router>
    </AppContext.Provider>
    </>
  )
}