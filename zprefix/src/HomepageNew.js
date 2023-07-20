import React from "react"
// import Navbar from "./Navbar"


const HomepageNew = () => {

    return (
        <div>
            <p>HOW ABOUT THEM APPLES</p>
            <p> </p>
        </div>
    )
}

// const Navbar() {
//   return (
//     <nav className="nav">
//       <a href ="/" className="site-title">
//         HOW ABOUT THEM APPLES!
//       </a>
//       <ul>
//         <li>
//           <a href="/pricing">Price</a>
//         </li>
//         <li>
//           <a href="/about"> About Them Fruits </a>
//         </li>
//       </ul>
//     </nav>
//   )

// }


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