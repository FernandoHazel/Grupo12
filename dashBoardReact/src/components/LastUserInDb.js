import React from "react";

import { useEffect,useState } from "react";
import { Link } from "react-router-dom";                

function LastUserInDb() {
    const [lastUser, setLastUser]=useState(['a','b','c','/'])
    
    
    useEffect(()=>{
        fetch('api/users/all')
        .then(respuesta =>{
            return respuesta.json()
        })
        .then(user =>{
            console.log('userInfomraaaa')
            console.log(user)
            let longitud= user.count
            let lastU=user.users[longitud-1]
            return lastU
        })
        .then(lastU =>{
            console.log('id de Usuario')
            console.log(lastU.id)
                fetch(`api/users/detail/${lastU.id}`)
                .then(respuesta =>{
                    return respuesta.json()
                })
                .then(detail =>{
                    console.log('imagen de Usuario')
                    console.log(detail.profile_img)
                    setLastUser([lastU.name,lastU.email,detail.profile_img,'/user/detail'+lastU.id])
                })
                .catch(error=> console.log('HAY un'+error)) 
        })
        .catch(error => console.log(error))



    },[])
    


return(
        
    <div className="col-lg-6 mb-4">
        <div className="card shadow mb-4">
            <div className="card-header py-3">
                <h5 className="m-0 font-weight-bold text-gray-800">Último usuario agregado</h5>
                <p  className={`text-xs font-weight-bold text-primary text-uppercase mb-1`}>{lastUser[0]} </p>
            </div>
            <div className="card-body">
                <div className="text-center">
                    <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{width: 40 +'rem'}} src={lastUser[2]} alt=" Star Wars - Mandalorian "/>
                </div>
                <p> {lastUser[1]}  </p>
                <Link className="btn btn-danger"  rel="nofollow" to={lastUser[3]} >View user detail</Link>
            </div>
        </div>
    </div>
)
}


export default LastUserInDb