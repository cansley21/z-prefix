import { useContext, useEffect, useState } from "react";
import { AppContext } from "./App";
import { useNavigate } from "react-router-dom";
import MenuBar from "./MenuBar";
import { SearchButton, LogoutButton } from "./Styled";
import './Details.css'
import { alertFunction, alertSuccess } from "./Homepage";


export default function Details() {

  const [organizations, setOrganizations] = useState(false);
  const [feedback, setFeedback] = useState(false);
  const [usersInfo, setUsersInfo] = useState(false);
  const [comment, setComment] = useState(false);
  const { details, setDetails, setFilter } = useContext(AppContext);

  const userId = sessionStorage.getItem('userID');

  let currentOrg;
  let rating;

  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3000/organization')
      .then(res => res.json())
      .then(data => {
        setOrganizations(data);
      })
    fetch('http://localhost:3000/feedback')
      .then(res => res.json())
      .then(data => {
        setFeedback(data.reverse());
      })
    fetch('http://localhost:3000/users')
      .then(res => res.json())
      .then(data => {
        setUsersInfo(data);
      })
    if (sessionStorage.getItem('details') !== false) {
      setDetails(JSON.parse(sessionStorage.getItem('details')));
    }
  }, [])

  const usernameFetcher = (id) => {
    for (let user of usersInfo) {
      if (id === user.id) {
        return user.username;
      }
    }
  }

  const submitComment = (text) => {
    if (text === false || text === '') {
      alertFunction('Please provide your comment before submitting');
    } else {
      const opt = {
        method: 'POST',
        headers: {
          'user_id': `${userId}`,
          'resource_id': `${details.id}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'id': `${feedback.length + 1}`,
          'rating': `${document.querySelector('.rating-icon-top').src[29]}`,
          'comment': `${comment}`
        })
      }
      fetch('http://localhost:3000/feedback', opt)
        .then(res => res.status)
        .then(data => {
          if (data === 201) {
            fetch('http://localhost:3000/feedback')
              .then(res => res.json())
              .then(data => {
                setFeedback(data.reverse());
              })
            alertSuccess('Success: Thank you for your feedback')
          }
        })
        document.querySelector('.rating-icon-top').src = "../images/0star.png"
        setComment(false);
        document.querySelector('.comment-input').value = '';
    }
  }

  const logout = () => {
    console.log('logging out')
    sessionStorage.removeItem('userID');
    sessionStorage.removeItem('username');
    navigate('/');
  }

  if (details && organizations && feedback && usersInfo) {
    return (
      <>
      <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {/* input alert message here */}
        </div>
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          {/* input alert message here */}
        </div>
        <div className="headerbox">
          <h1 className="main-h1" onClick={() => { navigate('/resources'); setFilter([]) }}>
            Resilient Connect
          </h1>
          <div>
            <div className="welcome">Welcome <span className="user">{sessionStorage.getItem('username')}</span></div>
            <LogoutButton onClick={() => logout()}>{sessionStorage.getItem('username') !== null ? 'Logout' : 'Login'}</LogoutButton>
          </div>
        </div>
        <MenuBar />
        <div className='details-section'>
          <img className='details-image' src={details.img}></img>
          <div className='details-info'>
            <h2>{details.name}</h2>
            <div>
              {details.description}
            </div>
            <div className='details-link'>
              <a href={details.link} target='_blank'>{details.name}</a>
            </div>
            <div className='org'>
              <span className='org-span'>Organization: </span>
              <span>{organizations.map(org => {
                if (org.id === details.org_id) {
                  currentOrg = org;
                  return org.name;
                }
              })}</span>
            </div>
            <div>
              <span>{currentOrg.description}</span>
            </div>
            <div className='org-link'>
              <a href={currentOrg.website} target="_blank">{currentOrg.name}</a>
            </div>
          </div>
        </div>
        <div className='comments-sections'>
          <div className="rating-box">
            <div className="star-box">
              <img className="rating-icon-top" src="../images/0star.png"></img>
              <div className="star1" onClick={() => { document.querySelector('.rating-icon-top').src = '../images/1star.png' }}>x</div>
              <div className="star2" onClick={() => { document.querySelector('.rating-icon-top').src = '../images/2star.png' }}>x</div>
              <div className="star3" onClick={() => { document.querySelector('.rating-icon-top').src = '../images/3star.png' }}>x</div>
              <div className="star4" onClick={() => { document.querySelector('.rating-icon-top').src = '../images/4star.png' }}>x</div>
              <div className="star5" onClick={() => { document.querySelector('.rating-icon-top').src = '../images/5star.png' }}>x</div>
            </div>
            <div className='comment-submit'>
              <textarea className='comment-input' placeholder='What did you think about this resource? Was this resource helpful?' rows="3" cols='100' onChange={(e) => { setComment(e.target.value) }}></textarea>
              <SearchButton className='comment-button' onClick={() => { submitComment(comment) }}>Submit</SearchButton>
            </div>
          </div>
          {feedback.map(comment => {
            if (comment.resource_id === details.id) {
              rating = `../images/${comment.rating}star.png`
              return (
                <div className='posted-comment'>
                  <div className='comment-id'>
                    <img className="user-icon" src="../images/e1f77a2c16cc54a43eb984f00fa27d14.png"></img>
                    <div>{usernameFetcher(comment.user_id)}</div>
                  </div>
                  <img className='rating-icon' src={rating}></img>
                  <div className='comment-box'>{comment.comment}</div>
                </div>
              )
            }
          })}
        </div>
      </>
    )
  }
}