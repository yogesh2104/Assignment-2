// import { ChevronRight } from "lucide-react"
// import { Checkbox } from "@/components/ui/checkbox"


// const SideBar =()=>{

    // const sidebarItems = [
    //     { name: "Home", },
    //     { name: "Stores", },
    //     { name: "Products", },
    //     { name: "Catalogue", },
    //     { name: "Promotions", },
    //     { name: "Reports", },
    //     { name: "Docs", },
    //     { name: "Settings",},
    // ]
//     return(
//         <aside className="w-72 bg-white p-6 flex flex-col justify-between">
//             <div>
//             <div className="bg-teal-600 text-white w-56 p-3 rounded-lg mb-6 text-center mx-auto">
//                 <div className="flex items-center">
//                 <div className="w-8 h-8 bg-white rounded-full mr-2"></div>
//                 <span className="font-bold">Lemon Inc.</span>
//                 </div>
//             </div>
//             <nav>
//                 {sidebarItems.map((item, index) => (
                // <div
                //     key={index}
                //     className={`flex items-center p-2 select-none rounded-lg mb-2 gap-2 cursor-pointer ${
                //     item.name === "Products" ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-100"
                //     }`}
                // >
                //     <Checkbox id={`sidebar-${index}`} disabled />
                //     <label
                //         htmlFor={`sidebar-${index}`}
                //         className="text-sm font-medium leading-none"
                //     >
                //     {item.name}
                //     </label>
                // </div>
//                 ))}
//             </nav>
//             </div>
//             <div className="flex items-center">
//             <div className="w-10 h-10 rounded-full mr-3 border" />
//             <div>
//                 <p className="font-semibold">Andy Samberg</p>
//                 <p className="text-sm text-gray-500">andy.samberg@gmail.com</p>
//             </div>
//             <ChevronRight className="w-5 h-5 ml-auto text-gray-400" />
//             </div>
//       </aside>
//     )
// }

// export default SideBar


import { ChevronRight } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"




const sidebarItems = [
    { name: "Home", },
    { name: "Stores", },
    { name: "Products", },
    { name: "Catalogue", },
    { name: "Promotions", },
    { name: "Reports", },
    { name: "Docs", },
    { name: "Settings",},
]

const SideBar = () =>{
    return(
        <div className="bg-white p-6 h-full flex flex-col justify-between">
        <div>
            <div className="bg-teal-600 text-white p-2 w-40 rounded-lg mb-6">
            <div className="flex items-center justify-start">
                <div className="w-8 h-8 bg-white rounded-full mr-2"></div>
                <span className="font-bold text-xl">Lemon Inc.</span>
            </div>
            </div>
            <hr/>
            <nav className="ml-2">
            {sidebarItems.map((item, index) => (
                <div
                key={index}
                className={`flex items-center p-2 select-none rounded-lg mb-2 gap-2 cursor-pointer ${
                item.name === "Products" ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-100"
                }`}
            >
                <Checkbox id={`sidebar-${index}`} disabled />
                <label
                    htmlFor={`sidebar-${index}`}
                    className="text-sm font-medium leading-none"
                >
                {item.name}
                </label>
            </div>
            ))}
            </nav>
        </div>
        <div className="flex items-center text-md">
            <div className="w-10 h-10 rounded-full mr-3 border" />
            <div>
            <p className="">Andy Samberg</p>
            <p className="text-sm text-gray-500">andy.samberg@gmail.com</p>
            </div>
            <ChevronRight className="w-5 h-5 ml-auto text-gray-400" />
        </div>
    </div>
    )
}

export default SideBar