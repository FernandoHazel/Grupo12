import React from 'react';
import ChartUsersRow from './ChartUsersRow';
import UserItem from './UserItem';
import {useEffect,useState} from 'react'

//Respuesta harcodeada de prueba


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
                            apiResponse.map( ( row , i) => {
                                return <UserItem {...row} key={i}/>
                                //return <ChartUsersRow { ...row} key={i}/>
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