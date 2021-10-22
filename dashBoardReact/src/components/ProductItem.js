import {React} from 'react'
import ProductDetail from './ProductDetail';
import {Link} from 'react-router-dom'

function ProductItem(props){
    let total = 0

    props.sales.forEach(sale => {
        total += sale.quantity
    })
   
    let route = "/product/detail/"+props.id
    console.log(route)
    
    let toggle= ()=>{
        return 
    }
    return (
            <tr >
                <td>
                    {props.id}
                </td>

                <td>
                    {props.name}
                </td>
                <td>
                    {props.description}
                </td>

                <td>
                    {total}
                </td> 
                <td>
                    <Link to={route}>Ver</Link>  
                </td>
                  
            </tr>
    )
}


export default ProductItem