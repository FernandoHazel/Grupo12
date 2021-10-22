import React from 'react';


function ChartUsersRow(props){
    return (
                <tr>
                    <td>{props.id}</td>
                    <td>{props.name}</td>
                    <td>{props.email}</td>
                    <td>{props.detail}</td>
                </tr>
            )
    }
    
        

export default ChartUsersRow;