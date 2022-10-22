import {useState} from 'react'

function Ejercicio6() {

    const [contador, setContador] = useState(0);
    
   return (
    <div className='min-vh-100'>
        <h1>Sumar y Restar</h1>
        <input value={contador}></input>
        <button type='button' onClick={() => setContador(contador+1)}>Sumar</button>
        <button type='button' onClick={() => setContador(contador-1)}>Restar</button>
    </div>
    )
}

export default Ejercicio6;