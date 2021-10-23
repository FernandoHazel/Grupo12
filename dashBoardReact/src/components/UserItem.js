import {React} from 'react'
import UserDetail from './UserDetail';
import {Link} from 'react-router-dom'

function UserItem(props){

    let route = "users/detail/"+props.id
    //console.log(route)

    return (
            <tr >
                <td>
                    {props.id}
                </td>

                <td>
                    {props.name}
                </td>
                <td>
                    {props.email}
                </td>

                <td>
                    <Link to={route}>Ver</Link>  
                </td>
                  
            </tr>
    )
}


export default UserItem