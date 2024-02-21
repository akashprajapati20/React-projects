

import './App.css'
import Reviewlist from './assets/reviews_data 2.json'

import ReviewList from './components/ReviewList'

function App() {
   


  return (
    <>
           <ReviewList Reviewlist={Reviewlist}/>

    
            
    </>
  )
}

export default App;