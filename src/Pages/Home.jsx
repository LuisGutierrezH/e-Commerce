import { useState, useEffect } from 'react'
import { getAllItemsService, getOneItemService } from '@/services/itemServices'

const Home = () => {
  const [itemsList, setItemList] = useState([])
  const placeholderImage =
    'https://images.unsplash.com/photo-1542010589005-d1eacc3918f2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cmVjaXBlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'

  const handleImageError = (e) => {
    e.target.src = placeholderImage
  }
  useEffect(() => {
    const fetchItemsData = async () => {
      try {
        const response = await getAllItemsService()
        if (response.status === 200) {
          setItemList(response.data)
        }
      } catch (error) {
        console.log('Ocurrio un error en Home', error)
      }
    }
    fetchItemsData()
  }, [])
  return (
    <>
      <h1>Home</h1>
      <div className='d-flex flex-row flex-wrap justify-content-center'>
        {/* Si itemsData no esta vacio, recorro el arreglo con Map y creo un Card de Bootstrap para cada elemento */}
        {itemsList && itemsList.map((product) => (
          <div className='card' style={{ width: '18rem' }} key={product.id}>
            <img className='card-img-top' style={{ maxHeight: '300px' }} src={product.image || placeholderImage} alt={product.product_name} onError={handleImageError} />
            <div className='card-body'>
              <h5 className='card-title'>{product.product_name}</h5>
              <p className='card-text'>{product.description}</p>
              {/* Aqui no se implementa el botón, pero basta con sustituir "a" por Link de react-router-dom y la ruta del enlace indicar el componente que mostrará la información de un solo producto, seguido del id del producto */}
              <a href='/carrito' className='btn btn-primary'>Comprar</a>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Home
