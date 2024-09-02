import { getData } from "@/actions/script";
import Image from "next/image";
import { DeletePhoto } from "@/components/deleteImage";
import Link from "next/link";


export default async function ImageData(){

    const data = await getData()
    
    return(
        <main>
              <p className="text-3xl font-bold bg-red-700 rounded-sm text-center py-3 text-white">GALLERY</p>
            <div className="flex flex-row items-center my-5 justify-center">
            {data.map((item) => 
            <div key={item.id} className="flex flex-col gap-5 mx-2 my-5">
                <h1 className="uppercase font-bold">photo</h1>
                <Image className="w-[100px] h-[100px] object-cover"
                src={item.url}
                alt="image"
                width={1000}
                height={1000}
                />
                <DeletePhoto id={item.id}/>
                <Link 
                href={`/update/${item.id}`} 
                className="bg-green-600 text-white text-center font-bold rounded-md p-2 cursor-pointer hover:opacity-80">
                    Update
                </Link>
            </div>
            )}
            </div>               
            <div className="flex justify-center">
            <Link 
            className="bg-blue-800 rounded-md text-white font-bold p-2 border-4 border-blue-700 
            hover:bg-blue-500" 
            href="/">choose more files</Link> 
            </div>
        </main>
    )
}