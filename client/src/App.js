import React,{useEffect,useState,useRef} from 'react'
import axios from 'axios'
import Todo from './Todo/Todo'

function App() {
  const[api,setApi]=useState('')
  useEffect (()=>{
  async function fetchData(){
    try{
      const response= await axios.get("http://localhost:8000")
      setApi(response.data)
     
    } catch(error){
      console.log(error)
      setApi([])
    }
  }
   fetchData()
} ,[])
  return (
    <div className="App">
     <Todo
     api={api}
     />
    </div>
  );
}

export default App;
