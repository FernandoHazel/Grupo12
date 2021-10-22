import {React} from 'react';
import {useEffect, useState} from 'react';
import styles from '../styles.css';

function ProductDetail(props){
    const[product, setProduct] = useState({})
    console.log(props.match.params.id)

    useEffect(()=>{
        fetch(`/api/products/detail/${props.match.params.id}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setProduct(data)
        })
        .catch(e => {console.log(e)})
    }, [])


    return (
        <div className="conteiner">
            <section className="basic-info">
                <div>
                    {product  && 
                    <>
                        <h2><strong>{product.name}</strong></h2>
                        <p>{product.description}</p> 
                        <h3><strong>Precio: </strong> ${product.real_price} MXN</h3>
                        <h3><strong>Categoria: </strong> {product.category} </h3>
                        <h3><strong>Disponibilidad: </strong> {product.stock} </h3>
                        <h3><strong>Vendidos: </strong> {product.sold_units} </h3>
                    </>
                }    
                </div>
            </section>
            
            <section className="seller">
                <div>
                    {
                        product && product.seller &&
                        <>
                            <p>Contacto vendedor</p>
                            <h4><strong>Nombre: </strong>{product.seller.name} {product.seller.last_name}</h4>
                            <h4><strong>Correo: </strong>{product.seller.email}</h4>
                        </>
                    }
                </div>
            </section>

            <section className="sales">

            </section>
        </div>
    )
}

export default ProductDetail