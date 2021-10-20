import React from 'react';
import SmallCard from './SmallCard';
import {useEffect,useState} from 'react'

function SimplePanels(){

    let [cartProps,setCartProps]=useState([])




useEffect(()=>{
    fetch('api/users/all')
        .then(respuesta =>{
            return respuesta.json()
        })
        .then(gen =>{
     console.log('2do then')
     console.log(gen.count)
      /* <!-- Actors quantity --> */
      let actorsQuantity = {
        title:' Total de usuarios',
        color:'warning',
        cuantity: gen.count,
        icon:'fa-user-check'
    }
     return actorsQuantity
        })
        .then(usersQuantity=>{

        
        fetch('api/products/all')
        .then(respuesta =>{
            return respuesta.json()
        })
        .then(gen =>{
            console.log(gen)
             /* <!-- Movies in DB --> */
                let moviesInDB = {
                    title: 'Total de productos',
                    color: 'primary', 
                    cuantity: gen.count,
                    icon: 'fa-clipboard-list'
                }
                /* <!-- Total awards --> */
                let longitud=gen.countByCategory
                let totalAwards = {
                    title:'Total de categorías', 
                    color:'success', 
                    cuantity:Object.keys(gen.countByCategory).length,
                    icon:'fa-award'
                }
                
                 setCartProps([moviesInDB, totalAwards,usersQuantity])
           // this.setState({genresList:genres.data})
        })
        .catch(error => console.log(error))
        })


        .catch(error => console.log(error))
},[])




    return (
    
        <div className="row">
            
            {cartProps.map( (movie, i) => {

                return <SmallCard {...movie} key={i}/>
            
            })}

        </div>
    )
}

export default SimplePanels;