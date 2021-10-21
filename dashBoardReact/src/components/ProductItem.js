import {React} from 'react'


function ProductItem(props){
    let total = 0

    props.sales.forEach(sale => {
        total += sale.quantity
    })
    return (
            <tr>
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
            </tr>
    )
}


export default ProductItem