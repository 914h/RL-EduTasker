import { Outlet } from 'react-router-dom'
import '../index.css'
import GeneralNav from './ui/GeneralNav.jsx'

export default function Layout(){

    return<>
    <header>
        <GeneralNav/>
    </header>
        <main className={'container'}>
            <Outlet/>
        </main>
    </>
}