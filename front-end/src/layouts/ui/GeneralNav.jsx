import { ModeToggle } from "../../components/dark-mode/mode-toggle";
import { LOGIN_ROUTE} from "../../router";
import Logo from '../../assets/logo/logo.png'
import {LogIn, } from "lucide-react";
import { Link } from "react-router-dom";
import { GeneralDropdownmenu } from "./GeneralDropdownmenu";

export default function GeneralNav(){
    return <>
            <div
            className="items-center bg-gray-800 justify-between flex bg-opacity-90 px-12 py-4 mb-4 mx-auto">
            <div className="text-2xl text-white font-semibold inline-flex items-center">
            <img src={Logo} alt="Logo" className="w-16 h-16" />

            </div>
            <div>
                <ul className="flex text-white place-items-center">
                    <li className="ml-5 px-2 py-1">
                    <Link className={'flex'} to={LOGIN_ROUTE}><LogIn size={28} className={'mx-3'} />Login</Link>
                    </li>
                    <li className="ml-5 px-2 py-1">
                        <GeneralDropdownmenu/>
                    </li>
                    <li className="ml-5 px-2 py-1">
                        <ModeToggle/>
                    </li>
                </ul>
            </div>
        </div>

    </>
}