import {React} from 'react';
import {useEffect, useState} from 'react';
import styles from '../styles.css';
import {Link} from 'react-router-dom'

function UserDetail(props){
    const[user, setUser] = useState({})
    console.log(props.match.params.id)

    useEffect(()=>{
        fetch(`/api/users/detail/${props.match.params.id}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setUser(data)
        })
        .catch(e => {console.log(e)})
    }, [])


    return (
        <div className="conteiner">
            <section className="basic-info">
                <div>
                    {user  && 
                    <>
                        <h2><strong>{user.first_name} {user.last_name}</strong></h2>
                        <h3>{user.email}</h3>
                        <h3> {user.age?`${user.age} años`: 'no hay una edad registrada'}</h3>
                        <h3> {user.active?'usuario activo':'usuario inactivo'}</h3>
                        <Link to={user.profile_img}>Imagen</Link>
                    </>
                }    
                </div>
            </section>

        </div>
    )
}

export default UserDetail