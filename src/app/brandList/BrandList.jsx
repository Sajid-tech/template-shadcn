/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Page from "../dashboard/page";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import { createTheme, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import { Delete, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
const BrandList = () => {
  const [brandData, setBrandData] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);

  useEffect(() => {
    const fetchBrandData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://houseofonzone.com/admin/public/api/fetch-brand-list`,
          {
            headers: {
              Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMmQyNGQyYzIwY2I3NDAzZmVjZjdmZTY4ZDEzNWIxNTE4ZTE5OTVhOTUwYmNjNTEzMTg0NGEwM2NhZTM5MjYyMDBiY2QwZWMxM2Y0OGRjMWMiLCJpYXQiOjE3Mjk2NjUxNzcuMDE3MTc4MDU4NjI0MjY3NTc4MTI1LCJuYmYiOjE3Mjk2NjUxNzcuMDE3MTgyMTExNzQwMTEyMzA0Njg3NSwiZXhwIjoxNzYxMjAxMTc3LjAwODQ2MjkwNTg4Mzc4OTA2MjUsInN1YiI6IjIiLCJzY29wZXMiOltdfQ.hLWh3nfZJXer1-a5FMs0q0kNd01DDpP8CUCHVn3RCkHPQj2NDa88_-6zXZSLMna6_TR2WMZJhoPLB1qHhImQtRnF1UZdeiEecMnagnu1Rg_q604uR93rSq0npimBckbBkOIehFcuY1UDMpCdpInChDHRYWLM7cMl0ERKq3_-wKybDdfkqjAgdI6CX-WzyFxa2R8ZkGtQVjz56x2iOcmAqrG-UOx5_e_Z6KGiluP6KtZh4XiZ6kmp5DVj9R5MkwPdMi_P-q6QCjRhzMB0mMBW5HGygltr38BG7Utr_b6JxCZ0gOro7LrtVv47zo2-BjgbLBUKZVimkGrsmmZTv7Yq8O5Lw-S0EhfqEi20jRlXR38i8RyU2vGPQOCG3yW1v2Atr-dEFlzKpVx2KqtooBc6e_tU1LLqsttoefFpBHGmnlIqUK9swopXnFwHR3eOUKao425N6pyzbr39nqKKc6h8MTxCh4K_fNrMLSStMyXjwMSrT9RCa1CmoHUxzK_shfdBjXTtw0wBq0MunPW_sCLO8iTjnrOyKSz5wUQM7-7w3OMJGcauPX3oMGafV4ZZ3lXLRUeKTv871Cop-LWVng69nPsy_gL8bffrIGAl4BZCC7fWFg-Wd1nkz-_FCiLUh268L1xoG1DxpbFBEzXZGB2fLE1m5LNyTDYyJHZ0R0F9Pg4`,
            },
          }
          
        );

        setBrandData(response.data?.brand);
      } catch (error) {
        console.error("Error fetching brand data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBrandData();
  }, []);

  const handleEditClick = (id) => {
    setSelectedBrand(id); // Set the brand to be edited
    setOpenEdit(true);
  };

  const columns = [
    {
      name: "slNo",
      label: "SL No",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta) => {
          return tableMeta.rowIndex + 1;
        },
      },
    },

    {
      name: "fabric_brand_brands",
      label: "Brand",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "fabric_brand_status",
      label: "Status",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "id",
      label: "Action",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (id) => { 
          return (
            <div className="flex gap-2">
              <div className="flex items-center space-x-2">
              <Edit
                  title="Edit"
                  className="h-5 w-5 cursor-pointer hover:text-blue-500"
                  onClick={() => handleEditClick(id)} // Open edit modal with the brand
                />
              </div>

              <div className="flex items-center space-x-2">
                <Delete
                  title="Delete"
                  className="h-5 w-5 cursor-pointer hover:text-red-500"
                />
              </div>
            </div>
          );
        },
      },
    },
  ];

  const options = {
    selectableRows: "none",
    elevation: 0,
    responsive: "standard",
    viewColumns: true,
    download: false,
    print: false,
  };

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      background: {
        default: "210 40% 98%", // Dark background
        paper: "#18181B", // Table background
      },
      text: {
        primary: "#ffffff", // White text
      },
    },
  });

  return (
    <Page>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <div>
          <MUIDataTable
            title="Brand List"
            data={brandData ? brandData : []}
            columns={columns}
            options={options}
          />
        </div>

        {openEdit && selectedBrand && (
          <Sheet open={openEdit} onOpenChange={setOpenEdit}>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Edit Brand {selectedBrand.id}</SheetTitle>
                <SheetDescription>
                  Here you can edit the details of the brand: {selectedBrand.id}.
                </SheetDescription>
                {/* Add your form fields for editing here */}
                
              </SheetHeader>
            </SheetContent>
          </Sheet>
        )}
      </ThemeProvider>
    </Page>
  );
};

export default BrandList;
