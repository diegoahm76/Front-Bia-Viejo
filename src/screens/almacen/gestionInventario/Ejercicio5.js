import {useState} from 'react'

function Ejercicio5() {

    const [micolor, setMicolor] = useState(false);

    const handleClick = () => {
        setMicolor(current => !current);
    };

  return (
    <div className='min-vh-100 ' style={{backgroundColor: micolor ? 'black' : 'yellow',
    color: micolor ? 'yellow' : 'black',}} >
        <h1>Cambiar Color de Fondo</h1>
        <button type='button' onClick={handleClick}>Cambiar Color</button>
    </div>
    )
}

export default Ejercicio5;