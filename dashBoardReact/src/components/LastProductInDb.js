import React from 'react';
import imagenFondo from '../assets/images/mandalorian.jpg';
import {useEffect,useState} from 'react'
import {Link} from 'react-router-dom'

function LastProductInDb(){

    const [lastProduct, setLastProduct]=useState([])
     
    useEffect(()=>{
        fetch('api/products/all')
            .then(respuesta =>{
                return respuesta.json()
            })
            .then(product =>{
                //Calculo de cuantos productos hay en products
               let  len=Object.keys(product.products).length
                //Obtenemos el último producto de la base
              let  lastP=product.products[len-1]
                return lastP
            })
            .then(lastP =>{
                console.log(lastP)
                fetch(`api/products/detail/${lastP.id}`)
                    .then(respuesta =>{
                        return respuesta.json()
                    })
                    .then(detail=>{
                         setLastProduct([lastP.name,lastP.description,detail.image,'/product/detail/'+lastP.id])
                    })
                    .catch(error=> console.log('HAY un'+error))  
            })
            .catch(error => console.log(error))
    },[])


    return(
        
        <div className="col-lg-6 mb-4">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h5 className="m-0 font-weight-bold text-gray-800">Último producto agregado</h5>
                    <p  className={`text-xs font-weight-bold text-primary text-uppercase mb-1`}>{lastProduct[0]} </p>
                </div>
                <div className="card-body">
                    <div className="text-center">
                        <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{width: 40 +'rem'}} src={lastProduct[2]} alt=" Star Wars - Mandalorian "/>
                    </div>
                    <p> {lastProduct[1]}  </p>
                    <Link className="btn btn-danger"  rel="nofollow" to={lastProduct[3]} >View product detail</Link>
                </div>
            </div>
        </div>
    )
}

export default LastProductInDb;
