import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import FormularioNoticia from './components/FormularioNoticia';
import { useState ,useEffect} from 'react';
import ListaNoticias from './components/ListaNoticias';
import { categorias,paises } from './components/paisesYCategorias';
import { Alert } from 'react-bootstrap';

function App() {
  const APY_KEY = "pub_239948689964329617a4558a639ffac69e12e"
  const [categoria,setCategoria] = useState("")
  const [pais,setPais]= useState("")
  const [noticias,setNoticias] = useState([])
 
  useEffect(()=>{
    try {
      const consultarNoticia = async()=>{
        if(categoria === "" || pais === ""){
          return
        }else{
          const respuesta = await fetch(`https://newsdata.io/api/1/news?apikey=${APY_KEY}&category=${categoria}&country=${pais}&language=es`)
          const data = await respuesta.json()
          setNoticias(data.results)
        }

      }
      consultarNoticia()
    } catch (error) {
      console.log(error)
    }
  },[categoria,pais])

  const handleChangeCategoria =(e) =>{
    setCategoria(e.target.value)
  }
  const handleChangePais =(e) =>{
    setPais(e.target.value)
  }
  return (
    <>
    <FormularioNoticia categorias={categorias} handleChangeCategoria={handleChangeCategoria} paises={paises} handleChangePais={handleChangePais}/>
    {noticias.length === 0  ?<Alert variant='danger'>No hay noticias</Alert> : <ListaNoticias noticias={noticias}></ListaNoticias>}
    </>
  )
}

export default App
