
import { useEffect,useRef, useState } from 'react'
import './App.css'
import Pills from "./components/Pills";

function App() {
   const[inpVal,setInpVal]=useState("");
   const [suggestion,setSuggestion]=useState([]);
   const [selectedUsers,setSelectedUsers]=useState([]);
   const [selectedUserSet, setSelectedUserSet] = useState(new Set());
   const [activeSuggestion, setActiveSuggestion] = useState(0);

   const inputRef = useRef(null);

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
    setSelectedUserSet(new Set([...selectedUserSet, user.email]));
    setInpVal("");setSuggestion([]);
    // console.log(selectedUsers);
    inputRef.current.focus();
   }
  const handleRemove=(user)=>{
    const updatedUsers = selectedUsers.filter(
      (selectedUser) => selectedUser.id !== user.id
    );
    setSelectedUsers(updatedUsers);

    const updatedEmails = new Set(selectedUserSet);
    updatedEmails.delete(user.email);
    setSelectedUserSet(updatedEmails);
  }
  const handleKeyDown = (e) => {
    if (
      e.key === "Backspace" &&
      e.target.value === "" &&
      selectedUsers.length > 0
    ) {
      const lastUser = selectedUsers[selectedUsers.length - 1];
      handleRemove(lastUser);
      setSuggestion([]);
    } else if (e.key === "ArrowDown" && suggestion?.users?.length > 0) {
      e.preventDefault();
      setActiveSuggestion((prevIndex) =>
        prevIndex < suggestion.users.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (e.key === "ArrowUp" && suggestion?.users?.length > 0) {
      e.preventDefault();
      setActiveSuggestion((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
    } else if (
      e.key === "Enter" &&
      activeSuggestion >= 0 &&
      activeSuggestion < suggestion.users.length
    ) {
      handleSelectusers(suggestion.users[activeSuggestion]);
    }
  };

  return (
    <>
      <div className="container">
        <div className="search">
          <div className="selectedusers">

          {
            selectedUsers.map((user)=>{
              return (
                <Pills   key={user.email} image={user.image}   text={`${user.firstName} ${user.lastName}`}   onClick={()=>handleRemove(user)}/>
              )
            })
          }
          </div>
          <input onKeyDown={handleKeyDown}  ref={inputRef} value={inpVal} onChange={(e)=>{setInpVal(e.target.value)}} type="text" placeholder="search for users..." />
          
        <div className="suggestions-list">
            <ul>
            {suggestion?.users?.map((user)=>{
              return !selectedUserSet.has(user.email)? (
                <li
                key={user.email}
                onClick={()=>handleSelectusers(user)}
                >
                  <img src={user.image} alt={`${user.firstName} ${user.lastName}`} />
                 <span>{user.firstName} {user.lastName}</span> 
                </li>
              ):<></>; 
            })}
            </ul>
        </div>
        </div>
      </div>
    </>
  )
}

export default App
