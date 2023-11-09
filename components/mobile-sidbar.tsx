"use client";

import Sidebar from "./sidbar";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet , SheetContent, SheetTrigger } from "./ui/sheet";
import { useEffect, useState } from "react";
import { boolean } from "zod";

interface mobileSidbarProps{
  apiLimitCount:number
  isPro :boolean
}

export default function MobileSidbar({apiLimitCount , isPro}: mobileSidbarProps) {
    const [isMounted , setIsMounted] = useState(false)

    useEffect(()=>{
      setIsMounted(true)
    },[])
    if(!isMounted){
        return null ;
    }
  return (
    <Sheet >

    <SheetTrigger >

 <Button variant='ghost' size='icon' className="md:hidden" >
    <Menu />
 </Button>
    </SheetTrigger>
    <SheetContent side="left" className="p-0">
 <Sidebar apiLimitCount={apiLimitCount} isPro={isPro} />
    </SheetContent>
    </Sheet>
  )
}
