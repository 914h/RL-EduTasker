import { cn } from "@/lib/utils"
import {Button} from "../../../components/ui/button.tsx";
import { Link } from "react-router-dom";
import { ADMIN_MANAGE_PARENTS_ROUTE, ADMIN_MANAGE_STUDENTS_ROUTE } from "../../../router/index.jsx";
import { BookCheck, BookOpenText, BookPlus, ContactIcon, ContactRoundIcon, GraduationCap, UsersRound } from "lucide-react";
export function AdminAppSidebar({ className}) {
    const playlists = [
        'Playlist 1',
        'Playlist 2',
    ]
    return (
        <div className={cn("", className)}>
            <div >
                <div className="px-3 py-4">
                    <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                        Administration
                    </h2>
                    <div className="space-y-1">
                        <Link to={ADMIN_MANAGE_PARENTS_ROUTE}>
                        <Button variant="secondary" className="w-full justify-start">
                        <UsersRound />Manage Student Parents
                        </Button>
                            </Link>
                    </div>
                    <div className="space-y-1">
                        <Link to={ADMIN_MANAGE_STUDENTS_ROUTE}>
                        <Button variant="ghost" className="w-full justify-start">
                        <BookCheck />Manage Students
                        </Button>
                            </Link>
                    </div>
                    <div className="space-y-1">
                        <Link to={ADMIN_MANAGE_PARENTS_ROUTE}>
                        <Button variant="ghost" className="w-full justify-start">
                        <UsersRound />Manage Exams
                        </Button>
                            </Link>
                    </div>
                </div>
                <div className="px-3 py-4">
                    <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                        Library
                    </h2>
                    <div className="space-y-1">
                        <Button variant="ghost" className="w-full justify-start">
                            <ContactIcon/>
                            Teachers
                        </Button>
                        <Button variant="ghost" className="w-full justify-start">
                        <ContactRoundIcon/>
                            Classes
                        </Button>
                        <Button variant="ghost" className="w-full justify-start">
                        <BookOpenText/>
                            Modules
                        </Button>
                        <Button variant="ghost" className="w-full justify-start">
                        <BookPlus/>
                            Devoirs
                        </Button>
                        <Button variant="ghost" className="w-full justify-start">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="mr-2 h-4 w-4"
                            >
                                <path d="m16 6 4 14" />
                                <path d="M12 6v14" />
                                <path d="M8 8v12" />
                                <path d="M4 4v16" />
                            </svg>
                            Travaux Pratique
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}