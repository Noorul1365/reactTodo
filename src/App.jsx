import { useState, useEffect } from 'react'
import './App.css'

function App() {

  const [input, setInput] = useState("");
  const [list, setList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleChange=(e)=>{
    setInput(e.target.value)
    // console.log(input);
  }

  const handleSubmit =()=>{
    if (editIndex !== null) {
      
    // Update mode
      const updatedList = [...list];
      updatedList[editIndex] = input;
      setList(updatedList);

      setEditIndex(null);     // Clear edit mode
      setInput("");         // Clear input
    } else {
      // Add mode
      setList([...list, input]);
      setInput("");
    }
  }

  const handleDelete = (index)=>{
    const confirmDelete = window.confirm("Are you sure you want to delete this todo?");
    if(confirmDelete){
      const filterList = list.filter((ele)=> ele!== list[index]);
      setList(filterList);
    }
  }

  const handleEdit = (index) => {
    setEditIndex(index);
    setInput(list[index]);   // Put existing text back into input box
  };

  return (
    <>
      <div className='App'>
        <h1>To Do List</h1>
        <div className='container'>
          <input 
            type="text"
            value={input}
            // onChange={(e) => handleChange(e)}
            onChange={handleChange}
          />
          <button onClick={handleSubmit}>
            {editIndex !== null ? "Update" : "Add"}
          </button>
        </div>
        <div className='list'>
          <ul>
            {list.map((item, index)=> {
              return (
                <li key={index}>
                  <span>{index+1} - {item}</span>
                
                  <div className="actions">
                    <button className="edit-btn" onClick={() => handleEdit(index)}>✏️</button>
                    <button className="delete-btn" onClick={()=>handleDelete(index)}>🗑️</button>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </>
  )
}

export default App
