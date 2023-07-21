import React from "react"
// import Navbar from "./Navbar"
import './HomepageNew.css'


const HomepageNew = () => {

    return (
      <>
      <div className="Apple"> 
      <img src="https://t4.ftcdn.net/jpg/05/25/30/71/360_F_525307190_16TB4HM5SngbgUldEroyaAix86nKYX5r.jpg"></img>
      </div>
      <div> 
      <input className="e-input e-large" type="text" placeholder="Enter Name" value="HOW ABOUT THEM APPLES! These bad boys will bring you to another world full
            of flavor and jucyness you've never known!" readOnly={true}/>
      </div>
        <div className="text">
            ^^ Swipe me
        </div>
        <input className="e-input e-large" type="text" placeholder="How many you want?" readOnly={false}/>
        <button type="Submit">Ordernow!</button>
        </>
    )
}



export const alertFunction = (message) => {
    document.querySelector('.fade.show').style.opacity = 1;
    document.querySelector('.alert-danger').style.display = 'block';
    document.querySelector('.alert-danger').innerHTML = message;
    setTimeout(() => {
      document.querySelector('.fade.show').style.opacity = 0;
      setTimeout(() => {
        document.querySelector('.alert-danger').style.display = 'none';
      }, 500)
    }, 1300)
  }
  
export default HomepageNew