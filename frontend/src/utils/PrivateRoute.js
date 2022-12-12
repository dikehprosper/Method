import { Outlet, Navigate } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'

const PrivateRoute = ({children, ...rest}) => {
    let {user} = useContext(AuthContext)
    return(
        <Outlet {...rest}>{!user ? <Navigate to={"/login"}/> :   children}</Outlet>
    )
}

export default PrivateRoute;