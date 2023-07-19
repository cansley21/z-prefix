import { MenuDiv, SearchButton } from "./Styled";
import { useContext, useEffect } from "react";
import './MenuBar.css'
import { AppContext } from "./App";
import { useLocation, useNavigate } from "react-router-dom";
import { alertFunction } from './Homepage'

export default function MenuBar() {
  const { filter, setFilter, resources, setResources, searchQuery, setSearchQuery, affil, setAffil } = useContext(AppContext);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (sessionStorage.getItem('resources') !== null) {
      setResources(JSON.parse(sessionStorage.getItem('resources')));
    }
    if (sessionStorage.getItem('affil') !== null) {
      setAffil(JSON.parse(sessionStorage.getItem('affil')));
    }
  }, [])

  const search = () => {
    console.log(searchQuery)
    if (searchQuery === '' || searchQuery === false) {
      alertFunction('Error: Please provide search information.')
    } else {
      const currentFilter = [...filter];
      for (let r of resources) {
        if (r.name.toLowerCase().includes(searchQuery.toLowerCase()) || r.description.toLowerCase().includes(searchQuery.toLowerCase())) {
          if (filter.length) {
            for (let item of filter) {
              if (item.id === r.id) {
                break;
              } else {
                currentFilter.push(r);
                setFilter(currentFilter);
              }
            }
          } else {
            currentFilter.push(r);
            setFilter(currentFilter);
          }
        }
      }
      if (!currentFilter.length) {
        alertFunction('Error: Sorry, no results were found.');
      }
    }
  }

  const resetSearch = (key) => {
    if (key === 'Backspace') {
      setFilter([]);
    } else if (key === 'Enter') {
      search();
    }
  }

  if (resources && affil) {
    return (
      <>
        <MenuDiv>
          <div className="search">
            <input className='search-box' placeholder="Search..." onChange={(e) => { setSearchQuery(e.target.value) }}
              onKeyDown={(e) => { resetSearch(e.key) }}
            ></input>
            <SearchButton onClick={() => search()}>Search</SearchButton>
          </div>
          {location.pathname === '/resources' ? (
            <div className="filters">
              <div className="filter-category">Affiliation</div>
              {affil.map((element, index) => {
                return (
                  <a key={index}>
                    <input type='checkbox' name='resources' id={element.id} onClick={(e) => {
                      if (e.target.checked === true) {
                        document.querySelector('.resource-section').style.display = 'block'
                        const currentFilter = [...filter];
                        for (let resource of resources) {
                          if (resource.affil_id === Number(e.target.id)) {
                            console.log('found a match')
                            currentFilter.push(resource)
                          }
                        }
                        setFilter(currentFilter);
                        // if(currentFilter.length === 0) {
                        //   document.querySelector('.resource-section').style.display='none'
                        // }
                      } else {
                        // if(document.querySelector('.resource-section').style.display='none') {
                        //   document.querySelector('.resource-section').style.display='block'
                        // }
                        const currentFilter = [...filter];
                        for (let res of currentFilter) {
                          if (res.affil_id === Number(e.target.id)) {
                            console.log(`removing ${e.target.id}`);
                            currentFilter.splice(currentFilter.indexOf(res), 1);
                          }
                        }
                        setFilter(currentFilter);
                      }
                    }}></input>
                    <span>{element.id === 1 ? ' Active Duty' : element.id === 2 ? " Veteran" : ' Dependant'}</span>
                  </a>
                )
              })}
            </div>
          ) : ''}
          <div className="setting">
            <img id="setting-icon" alt="setting icon" src="../images/900834.png" onClick={() => { navigate('/account-settings') }} />
          </div>
        </MenuDiv>
      </>
    )
  }
}