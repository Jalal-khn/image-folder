import { getSingleImage } from "@/actions/script";
import UpdateImage from "@/components/updateRecord";

export default async function UpdatePage({params}) {
    if(!params.id){
        return(
            <div>id is required</div>
        )
    } 

    const data = await getSingleImage(params.id);
    if(!data){
        return(
            <div>data is not found</div>
        )
    }
 
return(
    <UpdateImage data={data}/>
)
}