
import { useEffect, useState } from 'react'
import './App.css'

function App() {
   const[inpVal,setInpVal]=useState("");
   const [suggestion,setSuggestion]=useState([]);
   const [selectedUsers,setSelectedUsers]=useState([]);


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

   const  handleSelectusers=(user)=>{
    setSelectedUsers([...selectedUsers,user]);
    setInpVal("");setSuggestion([]);
    console.log(selectedUsers);
   }
  
    
  return (
    <>
      <div className="container">
        <div className="search">
          <input value={inpVal} onChange={(e)=>{setInpVal(e.target.value)}} type="text" placeholder="search for users..." />
          
        <div className="suggestions-list">
            <ul>
            {suggestion?.users?.map((user)=>{
              return  (
                <li
                key={user.email}
                onClick={()=>handleSelectusers(user)}
                >
                  <img src={user.image} alt={`${user.firstName} ${user.lastName}`} />
                 <span>{user.firstName} {user.lastName}</span> 
                </li>
              ); 
            })}
            </ul>
        </div>
        </div>
      </div>
    </>
  )
}

export default App
