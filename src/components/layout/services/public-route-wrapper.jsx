import { Navigate, Outlet } from 'react-router-dom'
import { WebUrl } from 'util/constants'

export const PublicRouteWrapper = () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn')

    const renderPublic = () => {
        if (isLoggedIn) {
            return <Navigate to={WebUrl._DASHBOARD} />
        } else {
            return <Outlet />
        }
    }

    return renderPublic()
}
export default PublicRouteWrapper
