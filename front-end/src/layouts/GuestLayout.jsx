import {Outlet, useNavigate} from 'react-router-dom'
import '../index.css'
    import { useEffect } from 'react'
import { useUserContext } from '../context/StudentContext.jsx'
import {LOGIN_ROUTE, STUDENT_DASHBOARD_ROUTE} from '../router/index.jsx'
import GeneralNav from './ui/GeneralNav.jsx'

export default function GuestLayout(){
    const navigate = useNavigate();
    const context = useUserContext()

    useEffect(() => {
        if(context.Authenticated){
            navigate(STUDENT_DASHBOARD_ROUTE)
        }
    }, [])
    const handleLogout = () => {
        context.logout()
        navigate(LOGIN_ROUTE)
    }
    return<>
    <header>
        <GeneralNav/>
    </header>
        <main className={'container'}>
            <Outlet/>
        </main>
    </>
}