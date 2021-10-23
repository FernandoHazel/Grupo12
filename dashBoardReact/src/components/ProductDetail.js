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
                <div className="left">
                    <section className="basic-info">
                        <div>
                            {product  && 
                            <>
                                <div className="img-content">
                                    <img src={product.image} className="p-img"/>
                                </div>
                                
         
                                <h2><strong>{product.name}</strong></h2>
                                <p>{product.description}</p> 
                                <h2>Detalles</h2>
                                <h5><strong>Precio:   </strong> ${product.price} MXN</h5>
                                <h5><strong>Descuento:  </strong> {product.discount}%</h5>
                                <h5><strong>Precio de venta:  </strong> ${product.real_price} MXN</h5>
                                <h5><strong>Categoria:  </strong> {product.category} </h5>
                                <h5><strong>Disponibilidad:  </strong> {product.stock} </h5>
                                <h5><strong>Vendidos:  </strong> {product.sold_units} </h5>
                         </>
                        }    
                        </div>
                    </section>
            
                    <section className="seller">
                        <div>
                            {
                                product && product.seller &&
                                <>
                                    <h2>Contacto vendedor</h2>
                                    <h5><strong>Nombre:  </strong>{product.seller.name} {product.seller.last_name}</h5>
                                    <h5><strong>Correo:  </strong>{product.seller.email}</h5>
                                </>
                            }
                        </div>
                    </section>

                    <section className="sales">
                            {
                                product && product.sales &&
                                <>
                                    <h2>Ventas</h2>
                                    <div className="sales-conteiner">
                                        <table className="table table-bordered" id="dataTable"  width="100%" cellSpacing="0">
                                            <thead>
                                                <tr>
                                                    <th>Fecha Compra</th>
                                                    <th>Precio/unidad MXN</th>
                                                    <th>Cantidad</th>
                                                    <th>Subtotal MXN</th>
                                                </tr>
                                            </thead>
                                                <tbody>
                                                    {
                                                        
                                                        product.sales.map(sale =>{
                                                            return <tr>
                                                                <td>
                                                                    {sale.date}
                                                                </td>
                                                                <td>
                                                                   <strong>$</strong> {sale.unit_price}
                                                                </td>
                                                                <td>
                                                                    {sale.quantity}
                                                                </td>
                                                                <td>
                                                                    <strong>$</strong>{sale.sale_price}
                                                                </td>
                                                                
                                                            </tr>
                                                        })
                                                    }
                                                </tbody>
                                          
                                        </table>
                                    </div>
                                </>
                            }
                    </section>
               </div>
            
                    
            <div className="right">
            
            </div>
            
             </div>
    )
}

export default ProductDetail