import {Link, Outlet, useNavigate} from 'react-router-dom'
import '../../index.css'
import Logo from '../../assets/logo/logo.png'
import { LOGIN_ROUTE, STUDENT_DASHBOARD_ROUTE, TEACHER_DASHBOARD_ROUTE } from '../../router'
import { useUserContext } from '../../context/StudentContext'
import { StudentDropdownmenu } from '../ui/StudentUI/StudentDropdownmenu'
import UserApi from '../../services/api/UserApi'
import { useEffect, useState } from 'react'
import { GaugeIcon, LayoutPanelLeft } from 'lucide-react'
import { ModeToggle } from '../../components/dark-mode/mode-toggle'
import { TeacherSideBar } from '../ui/TeacherUI/TeacherSidebar'
import { Button } from '../../components/ui/button'
export default function TeacherLayout(){
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)
    const {setUser, setAuthenticated, Authenticated, user , logout} = useUserContext()

    useEffect(() => {
      if(Authenticated === true){
        setIsLoading(false)
        UserApi.getUser().then(({data}) =>{
            const { role } = data
            console.log(role)
            if(role !== 'teacher') {
             navigate(redirectToDashboard(role));
           }
            setUser(data)
            setAuthenticated(true)
          }).catch((reason) => {
            logout()
          })
      }
      else{
        navigate(LOGIN_ROUTE)
      }
    }, [Authenticated])
    return <>
    <header>
        <div
            className="items-center bg-gray-800 justify-between flex bg-opacity-90 px-12 py-4 mb-4 mx-auto">
            <div className="text-2xl text-white font-semibold inline-flex items-center">
            <img src={Logo} alt="Logo" className="w-16 h-16" />

            </div>
            <div>
                <ul className="flex text-white place-items-center">
                    <li className="ml-5 px-2 py-1">
                        <Link className={'flex'} to={TEACHER_DASHBOARD_ROUTE}><Button><LayoutPanelLeft className={'mx-1'} /> Dashboard</Button></Link>

                    </li>
                    <li className="ml-5 px-2 py-1">
                        <StudentDropdownmenu/>
                    </li>
                    <li className="ml-5 px-2 py-1">
                        <ModeToggle/>
                    </li>
                </ul>
            </div>
        </div>
    </header>
    <main className={'mx-auto px-10 space-y-4 py-4'}>
        <div className="flex">
            <div className={'w-full md:w-1/6'}>
                <TeacherSideBar/>
            </div>
            <div className={'w-full md:w-5/6'}>
                <Outlet/>
            </div>
        </div>
    </main>
</>
}