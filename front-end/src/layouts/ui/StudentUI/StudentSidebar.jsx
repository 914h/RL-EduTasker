import { cn } from "@/lib/utils"
import {Button} from "../../../components/ui/button";
import {ScrollArea} from "../../../components/ui/scroll-area.tsx";
import { BookCheck, HelpCircleIcon, LibraryBig, LogOut, LucideLibraryBig, NotebookIcon, QuoteIcon, UserMinus } from "lucide-react";
export function StudentSidebar({ className}) {
    const playlists = [
        'Playlist 1',
        'Playlist 2',
    ]
    return (
        <div className={cn("", className)}>
            <div >
                <div className="px-3 py-2">
                    <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                        Dashboard
                    </h2>
                    <div className="space-y-1">
                        <Button variant="secondary" className="w-full justify-start">
                            <LibraryBig/> Mes cours
                        </Button>
                        <Button variant="ghost" className="w-full justify-start">
                           <NotebookIcon/> Mes travaux Pratique
                        </Button>
                        <Button variant="ghost" className="w-full justify-start">
                            <BookCheck/> Mes notes
                        </Button>
                    </div>
                </div>
                <div className="px-3 ">
                    <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                        Library
                    </h2>
                    <div className="space-y-1">
                        <Button variant="ghost" className="w-full justify-start">
                            <UserMinus/> Mes Absences
                        </Button>
                        <Button variant="ghost" className="w-full justify-start">
                            <LucideLibraryBig/> Mes modules
                        </Button>
                        <Button variant="ghost" className="w-full justify-start">
                            <HelpCircleIcon/> A propos
                        </Button>
                        <Button variant="ghost" className="w-full justify-start">
                            <LogOut/> Quitter
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}