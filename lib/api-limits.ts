import { auth } from "@clerk/nextjs";

import prismadb from "./prismadb";

import { FREE_REQ } from "@/constants";

export const incrementApiLimit =async () => {
    const  { userId } = auth()
    if(!userId){
        return;
    }

    
    const userApilmit = await prismadb.userApiLimait.findUnique({
        where : {
            userId
        }
    })
    if(userApilmit){
        await prismadb.userApiLimait.update({
            where :{ userId : userId},
            data :{ count : userApilmit.count+1 }
        })
    }else{
        await prismadb.userApiLimait.create({
            data :{ userId : userId,  count : 1 }
        })
    }
}


export const checkApiLimit =async () => {
    const  { userId } = auth()
    if(!userId){
        return false;
    }

    
    const userApilmit = await prismadb.userApiLimait.findUnique({
        where : {
            userId
        }
    })


    if(!userApilmit || userApilmit.count < FREE_REQ){
        return true
    }else{
        return false
    }

}


export const getApiLimitCount =async () => {
    const  { userId } = auth()
    if(!userId){
        return 0;
    }

    
    const userApilmit = await prismadb.userApiLimait.findUnique({
        where : {
            userId
        }
    })


    if(!userApilmit){
        return 0
    }else{
        return userApilmit.count
    }

}




export const checkSubscription =async () => {
    const  { userId } = auth()
    if(!userId){
        return false;
    }

    
    const prouser = await prismadb.proUser.findUnique({
        where : {
            userId
        }
    })


    if(prouser){
        return true
    }else{
        return false
    }

}

