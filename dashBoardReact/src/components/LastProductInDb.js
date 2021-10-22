import React from 'react';
import imagenFondo from '../assets/images/mandalorian.jpg';
import {useEffect,useState} from 'react'



function LastProductInDb(){

    const [lastProduct, setLastProduct]=useState([])
     
    useEffect(()=>{
        fetch('api/products/all')
            .then(respuesta =>{
                return respuesta.json()
            })
            .then(product =>{
               let  len=Object.keys(product.products).length
                console.log('len='+len)
              let  lastP=product.products[len-1]
                console.log('last='+lastP.id)
                //Agregamos el name del último producto
                //a lastProduct
                //setLastProduct([lastP.name,lastP.description])
                //return lastP.id
                return lastP
            })
            .then(lastP =>{
                console.log(lastP)
                fetch(`api/products/detail/${lastP.id}`)
                    .then(respuesta =>{
                        return respuesta.json()
                    })
                    .then(detail=>{
                        console.log('ImagenQ')
                        console.log(detail.image)
                        lastP.image=detail.image
                        console.log('añadirImageb')
                         console.log(lastP)
                         setLastProduct([lastP.name,lastP.description,lastP.image])
                        return lastP
                    })
                    .catch(error=> console.log('HAY un'+error))
                    console.log('añadirImage2')
                    console.log(lastP)
                    return lastP
            })
            .catch(error => console.log(error))
    },[])
    console.log('verImagen')
    console.log(lastProduct[2])
    return(
        
        <div className="col-lg-6 mb-4">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h5 className="m-0 font-weight-bold text-gray-800">Último producto agrgado</h5>
                    <p  className={`text-xs font-weight-bold text-primary text-uppercase mb-1`}>{lastProduct[0]} </p>
                </div>
                <div className="card-body">
                    <div className="text-center">
                        <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{width: 40 +'rem'}} src={lastProduct[2]} alt=" Star Wars - Mandalorian "/>
                    </div>
                    <p> {lastProduct[1]}  </p>
                    <a className="btn btn-danger" target="_blank" rel="nofollow" href="/">View product detail</a>
                </div>
            </div>
        </div>
    )
}

export default LastProductInDb;
