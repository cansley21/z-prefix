import { useEffect, useContext, createContext } from "react"
// import MenuBar from "./Menubar"
import { useNavigate } from 'react-router-dom';
// import { DescriptionDiv, OfficialButton, LogoutButton } from "./Styled";
// import './Homepage.css'; 
import { AppContext } from "./App";

const HomepageContext = createContext();

export const alertFunction = (message) => {
    document.querySelector('.fade.show').style.opacity = 1;
    document.querySelector('.alert-danger').style.display = "block";
    document.querySelector('.alert-danger').innerHTML = message;
    setTimeout(() => {
        document.querySelector('.fade.show').style.opacity = 0;
        setTimeout(() => {
            document.querySelector('.alert-danger').style.display = 'none';
        }, 500)
    }, 1300)
}

export const alertWarning = (message) => {
    document.querySelector('.fade.show').style.opacity = 1;
    document.querySelector('.alert-warning').style.display = "block";
    document.querySelector('.alert-warning').innerHTML = message;
    setTimeout(() => {
        document.querySelector('.fade.show').style.opacity = 0;
        setTimeout(() => {
            document.querySelector('.alert-warning').style.display = 'none';
        }, 500)
    }, 1300)
}

export const alertSuccess = (message) => {
    document.querySelector('.fade.show').style.opacity = 1;
    document.querySelector('.alert-success').style.display = "block";
    document.querySelector('.alert-success').innerHTML = message;
    setTimeout(() => {
        document.querySelector('.alert-success').style.opacity = 0;
        setTimeout(() => {
            document.querySelector('.alert-success').style.display = 'none';
        }, 500)
    }, 1300)
}

export default function Homepage() {
    const navigate = useNavigate();

    const { resources, setResources, setDetails, filter, setFilter, setAffil } = useContext(AppContext);

    useEffect(() => {
        fetch('http://localhost:8081/resources')
        .then(res => res.json())
        .then(data => {
            setAffil(data);
            sessionStorage.setItem('affil', JSON.stringify(data));
        })
    }, [])

    const logout = () => {
        console.log('logging out')
        sessionStorage.removeItem('userID');
        sessionStorage.removeItem('username');
        navigate('/');
    }

    if (resources) {
        return (
            <>
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                </div>
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                </div>
                <div className="headerbox">
                    <h1 className="main-h1" onClick={() => { navigate('/resources'); setFilter ([]) }}>
                        Inventory List
                    </h1>
            <div>
                <div className="Welcome"> Welcome <span className="user">{sessionStorage.getItem('username')}</span></div>
                <LogoutButton onClick={() => logout()}>{sessionStorage.getItem('username') !== null ? 'Logout' : 'Login'}</LogoutButton>
            </div>
            </div>
            {/* <MenuBar /> */}
            <div className="main-section">
                <div className="resource-section">
                    {filter.length ? filter.map((resource, index) => {
                        return (
                            <div key={index} id={index} className="resource">
                                <h2 className="resource-name" id={index}>{resource.name}</h2>
                                <DescriptionDiv theme={'category'} id={index}>Description</DescriptionDiv>
                                <DescriptionDiv id={index}>{resource.description}</DescriptionDiv>
                                <OfficialButton>
                                    <a className='official-link' id={index} onClick={(e) => {
                                        setDetails(resources[e.target.id]);
                                        sessionStorage.setItem('details', JSON.stringify(resources[e.target.id]));
                                        navigate(`/resources/${Number(e.target.id)+1}`);
                                    }}>Details</a>
                                </OfficialButton>
                                </div>
                        )
                    }) : resources.map((resource, index) => {
                        return (
                            <div key={index} id={index} className="resource">
                                <h2 className="resource-name" id={index}>{resource.name}</h2>
                                <DescriptionDiv theme={'category'} id={index}>Description</DescriptionDiv>
                                <DescriptionDiv id={index}>{resource.description}</DescriptionDiv>
                                <OfficialButton>
                                    <a className='official-link' id={index} onClick={(e) => {
                                        setDetails(resources[e.target.id]);
                                        sessionStorage.setItem('details', JSON.stringify(resources[e.target.id]));
                                        navigate(`/resources/${Number(e.target.id)+1}`);
                                    }}>Details</a>
                                </OfficialButton>
                                </div>
                        )
                    }) 
                    }
                </div>
                <div className="main-section-img">
                    <img src=".."></img>
                </div>
            </div>
            </>
        )
    }
}