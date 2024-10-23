
import { useParams } from "react-router-dom";
import Page from "../dashboard/page";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
  
const BrandEdit = () => {
    const { id } = useParams();
  return (
    <Page>
     
        <Sheet>
          <SheetTrigger>Edit Brand</SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Edit Brand {id}</SheetTitle>
              <SheetDescription>
                Update the details for the brand here. You are editing brand ID: {id}.
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
     
    </Page>
  )
}

export default BrandEdit