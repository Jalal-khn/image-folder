"use client"
import { dataDelete } from "@/actions/script"


export  function DeletePhoto({id}) {
    const handleDelete = async () =>{
        const data = await dataDelete(id);
    }
    

return(
    <p onClick={handleDelete} 
    className="bg-red-600 text-white font-bold rounded-md p-2 text-center cursor-pointer hover:opacity-80">Delete</p>
)
}