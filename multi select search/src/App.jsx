
import { useEffect, useState } from 'react'
import './App.css'

function App() {
   const[inpVal,setInpVal]=useState("");
   const [suggestion,setSuggestion]=useState([]);


   useEffect(()=>{
    async function searchusers(){
      try {const res=await fetch(`https://dummyjson.com/users/search?q=${inpVal}`);
      const data=await res.json();
      setSuggestion(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
       
  
     }
     searchusers();
   },[inpVal])

  
    
  return (
    <>
      <div className="container">
        <div className="search">
          <input value={inpVal} onChange={(e)=>{setInpVal(e.target.value)}} type="text" placeholder="search for users..." />
          
        <div className="suggestions">
            <ul>
            {suggestion.length>0?suggestion.map((user)=>{
              return  (
                <li
                  key={user.email}
                >
                  {user.email}
                </li>
              ) 
            }):<li>no</li>}
            </ul>
        </div>
        </div>
      </div>
    </>
  )
}

export default App
