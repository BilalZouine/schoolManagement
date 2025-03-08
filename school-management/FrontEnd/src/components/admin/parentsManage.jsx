import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent
} from "@/components/ui/Tabs"
import {
  Separator
} from "@/components/ui/Separator"

import {
} from "@/components/ui/scroll-area"

import ParentUpsertCreate from "../forms/parentUpsertCreate";
import AdminParantList from "../data-table/adminParantList";
import { ParentApi } from "../../service/api/student/parentApi";

function ParentsManage() {



  return (

    <>
      <div className="hidden md:block">
        <div >
          <div className="bg-background">
            <div >
              <div className="col-span-3 lg:col-span-4 ">
                <div className="h-full px-4 py-6 lg:px-8">
                  <Tabs defaultValue="listParent" className="h-full space-y-6">

                    <div className="space-between flex items-center">
                      {/* list of definitions of all tabs */}
                      <TabsList>


                        <TabsTrigger
                          value="listParent"
                          className="relative"
                        >
                          parent
                        </TabsTrigger>

                        <TabsTrigger
                          value="addParent"
                          className="relative"
                        >
                          Add parent
                        </TabsTrigger>

                      </TabsList>

                      {/* <div className="ml-auto mr-4">
                        <Button>
                          <PlusCircle />
                          Add parent
                        </Button>
                      </div> */}
                    </div>

                    {/* tabs list of parents */}
                    <TabsContent
                      value="listParent"
                      className="border-none p-0 outline-none"
                    >
                      <div >
                        <div className="space-y-1">
                          <h2 className="text-2xl font-semibold tracking-tight text-center uppercase">
                            List Of Parent
                          </h2>
                          <AdminParantList />
                          {/* <ListsOfParents/> */}
                          {/* component list parents */}
                        </div>
                      </div>

                    </TabsContent>
                    {/* tabs createparent */}

                    <TabsContent
                      value="addParent"
                      className="h-full flex-col border-none p-0 data-[state=active]:flex"
                    >
                      <div>
                        <div className="space-y-1">
                          <h2 className="text-2xl text-center font-semibold tracking-tight uppercase">
                            Add New Parent
                          </h2>
                          <ParentUpsertCreate handleUpsertParent={(value)=>ParentApi.create(value)} />  {/* component list create new parent */}
                        </div>
                      </div>
                      <Separator className="my-4" />
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ParentsManage;
