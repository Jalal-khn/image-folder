"use server";
import prisma from "@/lib/db"; 
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function imageData(uploadedImageUrl) {
    try {
    
        if (!uploadedImageUrl) {
            return { error: "Please provide the image URL" };
        }

    
        await prisma.user.create({
            data: {
                url: uploadedImageUrl, 
            },
        });

        return { success: "file is stored" };
         
    } catch (err) {
        console.error("Error creating user:", err);
        return { error: "An error occurred while creating the user" }; 
    }
}
export async function getData() {
try{
const data = await prisma.user.findMany();
return data;
} catch(err){
    return err;
}
}
export async function dataDelete(id) {
    try{
    const res = await prisma.user.delete({
        where:{id}
    });
     revalidatePath("/dashboard")
} catch (error) {
    return null;
}  
}

export async function getSingleImage(id) {
    try{
    const data = await prisma.user.findUnique({
        where:{id}
    });
     return data;
    } catch(err) {
        return err;
    }
}

export async function updateImageData({id,url}){
    const data = await prisma.user.update({
        where:{id},
        data:{
                url
        }
    })
    redirect("/dashboard")
}