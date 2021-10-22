import React from 'react';
import ChartUsersRow from './ChartUsersRow';
import {useEffect,useState} from 'react'

//Respuesta harcodeada de prueba
let apiResponseHc = [
    {
    "id": 4,
    "name": " ",
    "email": "fernando@gmail.com",
    "detail": "http://localhost:3031/api/users/detail/4"
    },
    {
    "id": 4,
    "name": " ",
    "email": "fernando@gmail.com",
    "detail": "http://localhost:3031/api/users/detail/4"
    },
    {
    "id": 4,
    "name": "Fernando Ascencio",
    "email": "fernando@gmail.com",
    "detail": "http://localhost:3031/api/users/detail/4"
    },
    {
    "id": 4294967295,
    "name": "Juana Chong",
    "email": "jchong@gmail.com",
    "detail": "http://localhost:3031/api/users/detail/4294967295"
    },
    {
    "id": 1634173488,
    "name": "Fernando Ascencio",
    "email": "A01229544@itesm.mx",
    "detail": "http://localhost:3031/api/users/detail/1634173488"
    },
    {
    "id": 1,
    "name": " ",
    "email": "geastment0@soup.io",
    "detail": "http://localhost:3031/api/users/detail/1"
    },
    {
    "id": 2,
    "name": " ",
    "email": "acarneck1@wikispaces.com",
    "detail": "http://localhost:3031/api/users/detail/2"
    },
    {
    "id": 3,
    "name": " ",
    "email": "ccastelin2@posterous.com",
    "detail": "http://localhost:3031/api/users/detail/3"
    }
]

function UsersChart (){
    let [apiResponse, setResponse] = useState ([]);

    useEffect(() => {
        fetch('api/users/all')
        .then(res => res.json())
        .then(response => {
            setResponse(response.users)
        })
        .catch(error => console.log(error))
    },[])
    console.log(`apiResponse = ${apiResponse[0]}`)

    return (
        /* <!-- DataTales Example --> */
        <div className="card shadow mb-4">
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nombre</th>
                                <th>Email</th>
                                <th>Detalle</th>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th>Id</th>
                                <th>Nombre</th>
                                <th>Email</th>
                                <th>Detalle</th>
                            </tr>
                        </tfoot>
                        <tbody>
                            {
                            apiResponse[0].map( ( row , i) => {
                                return <ChartUsersRow { ...row} key={i}/>
                            })
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    )
}

export default UsersChart;