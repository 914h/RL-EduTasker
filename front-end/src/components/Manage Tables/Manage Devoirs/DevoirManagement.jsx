import { useUserContext } from "../../../context/StudentContext"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "../../ui/tabs";
import {Separator} from "../../ui/separator";
import {ScrollArea, ScrollBar} from "../../ui/scroll-area";
import DevoirList from "./DevoirList";
import DevoirForm from "./DevoirForm";
import DevoirApi from "../../../services/data-tables/DevoirApi";
export default function DevoirManagement(){
  const {user} = useUserContext()
    return <>
<div className="relative overflow-x-auto">
      <div className="hidden md:block">
        <div className="">
          <div className="bg-background">
            <div className="grid">
              <div className="col-span-3 lg:col-span-4">
                <div className="h-full px-4 py-6 lg:px-8">
                  <Tabs defaultValue="devoirs_list" className="h-full space-y-6">
                    <div className="space-between flex items-center">
                      <TabsList>
                        <TabsTrigger value="devoirs_list" className="relative">Devoirs</TabsTrigger>
                        <TabsTrigger value="add_item">Add new Devoir</TabsTrigger>
                      </TabsList>
                    </div>
                    <TabsContent
                      value="devoirs_list"
                      className="border-none p-0 outline-none"
                    >
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h2 className="text-2xl font-semibold tracking-tight">
                            All Devoirs
                          </h2>
                          <DevoirList/>
                        </div>
                      </div>
                      <Separator className="my-4"/>
                      <div className="relative">
                        <ScrollArea>
                          <div className="flex space-x-4 pb-4">
                          </div>
                          <ScrollBar orientation="horizontal"/>
                        </ScrollArea>
                      </div>
                      <div className="relative">
                        <ScrollArea>
                          <div className="flex space-x-4 pb-4">
                          </div>
                          <ScrollBar orientation="horizontal"/>
                        </ScrollArea>
                      </div>
                    </TabsContent>
                    <TabsContent
                      value="add_item">
                      <div className="space-y-1">
                        <DevoirForm handleSubmit={(values) => DevoirApi.create(values)}/>
                      </div>
                      <Separator className="my-4"/>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>  </>
}
