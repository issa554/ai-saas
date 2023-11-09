import { Menu } from "lucide-react"
import { Button } from "./ui/button"
import { UserButton } from "@clerk/nextjs"
import MobileSidbar from "@/components/mobile-sidbar"
import { getApiLimitCount } from "@/lib/api-limits"

 async function navbar() {
  const apiLimitCount = await getApiLimitCount();
  return (
    <div className="flex items-center p-4">
    <MobileSidbar apiLimitCount={apiLimitCount} />
        <div className="flex w-full justify-end">
           <UserButton afterSignOutUrl="/"/>
        </div>
    </div>
  )
}

export default navbar