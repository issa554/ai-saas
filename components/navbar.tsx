import { Menu } from "lucide-react"
import { Button } from "./ui/button"
import { UserButton } from "@clerk/nextjs"
import MobileSidbar from "@/components/mobile-sidbar"
import { checkSubscription, getApiLimitCount } from "@/lib/api-limits"

 async function navbar() {
  const apiLimitCount = await getApiLimitCount();
  const isPro = await checkSubscription();

  return (
    <div className="flex items-center p-4">
    <MobileSidbar apiLimitCount={apiLimitCount} isPro={isPro} />
        <div className="flex w-full justify-end">
           <UserButton afterSignOutUrl="/"/>
        </div>
    </div>
  )
}

export default navbar