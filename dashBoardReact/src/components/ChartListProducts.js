import React from 'react';
import ChartRow from './ChartRow';
import {useEffect, useState} from 'react' 
import ProductItem from './ProductItem'

let tableRowsData = [
    {
        Title: 'Billy Elliot ',
        Length: '123',
        Rating: '5',
        Categories: ['Drama','Comedia'],
        Awards: 2
    },
    {
        Title: 'Alicia en el país de las maravillas',
        Length: '142',
        Rating: '4.8',
        Categories: ['Drama','Acción','Comedia'],
        Awards: 3
    },
    
]


function ChartListProducts(){

    //  state
    const [products, setProducts] = useState([])
        // initital content
        useEffect(()=>{
            fetch("/api/products/all",{
                'mode': 'cors',
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                }
            })
            .then(result => result.json())
            .then(data => {
                setProducts(data.products)
            })
            .catch(e => console.log(e))
        }, [])


    return (
        /* <!-- DataTales Example --> */
        <div className="card shadow mb-4">
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Título</th>
                                <th>Descripcion</th>
                                <th>Total Ventas</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
    
                        <tbody>
                            {
                            products.map( ( row , i) => {

                                return <ProductItem {...row} key={i}/>
                                //return <ChartRow { ...row} key={i}/>
                            })
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

function Chart (){
    return (
        /* <!-- DataTales Example --> */
        <div className="card shadow mb-4">
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                        <thead>
                            <tr>
                                <th>Título</th>
                                <th>Duración</th>
                                <th>Rating</th>
                                <th>Género</th>
                                <th>Premios</th>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th>Título</th>
                                <th>Duración</th>
                                <th>Rating</th>
                                <th>Género</th>
                                <th>Premios</th>
                            </tr>
                        </tfoot>
                        <tbody>
                            {
                            tableRowsData.map( ( row , i) => {
                                return <ChartRow { ...row} key={i}/>
                            })
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    )
}

export default ChartListProducts;