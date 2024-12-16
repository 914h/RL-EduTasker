import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "../../../components/ui/avatar";
  
  export function StudentMarks() {
    return (
      <div className="space-y-8">
        <div className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/avatars/01.png" alt="Avatar" />
            <AvatarFallback>C</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">Language C</p>
            <p className="text-sm text-muted-foreground">Full Semester</p>
          </div>
          <div className="ml-auto text-right">
            <p className="font-medium">Moyenne General: 17</p>
          </div>
        </div>
        <div className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/avatars/02.png" alt="Avatar" />
            <AvatarFallback>JV</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">JAVA</p>
            <p className="text-sm text-muted-foreground">Full Semester</p>
          </div>
          <div className="ml-auto text-right">
            <p className="font-medium">Moyenne General: 12</p>
          </div>
        </div>
        <div className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/avatars/03.png" alt="Avatar" />
            <AvatarFallback>JS</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">Java Script</p>
            <p className="text-sm text-muted-foreground">Full Semester</p>
          </div>
          <div className="ml-auto text-right">
            <p className="font-medium">Moyenne General: 14</p>
          </div>
        </div>
        <div className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/avatars/04.png" alt="Avatar" />
            <AvatarFallback>ENG</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">English</p>
            <p className="text-sm text-muted-foreground">Full Semester</p>
          </div>
          <div className="ml-auto text-right">
            <p className="font-medium">Moyenne General: 15</p>
          </div>
        </div>
        <div className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/avatars/05.png" alt="Avatar" />
            <AvatarFallback>Py</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">Phyton</p>
            <p className="text-sm text-muted-foreground">Full Semester</p>
          </div>
          <div className="ml-auto text-right">
            <p className="font-medium">Moyenne General: 10</p>
          </div>
        </div>
      </div>
    );
  }
  