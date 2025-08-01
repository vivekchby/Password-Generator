import { useState,useEffect,useCallback,useRef } from 'react'
 

function App() {
  const [length,setLength] = useState(8)
  const [numberAllowed,setNumberAllowed]=useState(false);
  const [charAllowed,setCharAllowed]=useState(false)
  const [password,setPassword]=useState("")

const passwordRef=useRef(null)

  const passwordGenerator=useCallback(()=>{
    let pass=""
    let str =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str += "0123456789"
    if(charAllowed) str += "!@#$%^&*()_+=-,[]\`~"

    for(let i=1;i<=length;i++){
      let char = Math.floor(Math.random()*str.length+1)
      pass += str.charAt(char)
    }
    setPassword(pass)
    
    
  },[length,numberAllowed,charAllowed,setPassword])

 

   const copyPasswordtoClipboard = useCallback(()=>{
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0,3)
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{
    passwordGenerator()
  },[length,numberAllowed,charAllowed,passwordGenerator])


  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md
    rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800
     '>
      <h1 className='text-white text-center my-1'>Password Generator</h1>
      <div className='flex shadow rounded-lg
      overflow-hidden mb-4'>
        <input 
        type="text"
        value={password}
        ref={passwordRef}
        className='outline-none w-full py-1 px-3 bg-white placeholder-gray-400'
        placeholder='Password'
        readOnly 
        />
        <button 
        className='outline-none bg-blue-700 text-white px-3
        py-0.5 shrink-0 hover:bg-blue-800 hover:scale-105
         transition-all duration-200'
        onClick={copyPasswordtoClipboard}
        >Copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input
          type="range"
          min={6}
          max={100}
          value={length}
          className="cursor-pointer"
          onChange={(e)=>{setLength(e.target.value)}}
          />
          <label>length:{length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
          type="checkbox"
          defaultChecked={numberAllowed}
          id="numberInput"
          onChange={()=>{
            setNumberAllowed((prev)=>!prev);
            }}
          />
          <label htmlFor='numberInput'>Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
          type="checkbox"
          defaultChecked={charAllowed}
          id="characterInput"
          onChange={()=>{
            setCharAllowed((prev)=>!prev);
            }}
          />
          <label htmlFor='characterInput'>Characters</label>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
