
import './App.css';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import React,{Fragment,useState} from 'react';
function App() {
  const [personName,setPersonName]=useState("");
  const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
  ];
  const handleChange=(event)=>{
    setPersonName(event.target.value)
    
};
const handlesubmit=(event)=>{
   alert(personName);
};

  return (
    <div className="App">
      <form >
      <Select
           id="name"
           value={personName}
           onChange={handleChange}>
            {names.map((name)=>(
                <MenuItem key={name} value={name}>
                {name}
                </MenuItem>
            )
            
            )

            }

           </Select>
           <Button color="" onClick={handlesubmit}>click!</Button>

      </form>
            
    </div>
  );
}

export default App;
