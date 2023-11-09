import Navbar from "@/components/navbar"
import  Sidebar  from "@/components/sidbar"
import { getApiLimitCount } from "@/lib/api-limits"
import { checkSubscription } from "@/lib/api-limits";

export default  async function   DashLayout({
    children
  }: {
    children: React.ReactNode
  }) {
    const apiLimitCount = await getApiLimitCount()
    const isPro = await checkSubscription();

    return (
   
  
      <div className="h-full relative">
        <div className="hidden h-full md:flex md:flex-col md:w-72
        md:fixed md:inset-y-0  bg-gray-900">
           <Sidebar apiLimitCount={apiLimitCount} isPro={isPro} />

        </div>
        <main className="md:pl-72">
         <Navbar />
       {children}
        </main>
      </div>

    )
  }
  