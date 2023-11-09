"use client"


import axios from "axios"
import * as z from "zod"
import Heading from "@/components/heading"
import { MessageSquare, Music, Video } from "lucide-react"
import { useForm } from "react-hook-form"

import { formSchema } from "./constans"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { ChatCompletionRequestMessage } from "openai"
import { currentUser } from "@clerk/nextjs/app-beta"
import Empty from "@/components/Empty"
import Loader from "@/components/Loader"
import { cn } from "@/lib/utils"
import { UserAvatar } from "@/components/userAvatar"
import { BotAvatar } from "@/components/botAvatar"
import { useProModal } from "@/hooks/use-pro-modal"
export default function videoPage() {
    const proModal = useProModal()

    const router = useRouter();
    const [video,setVideo] = useState<string>();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver : zodResolver(formSchema),
        defaultValues:{
            prompt:""
        }
    })

    const isLoading = form.formState.isSubmitting;

    const onSubmit =async (values :z.infer<typeof formSchema>) => {
        try {

            setVideo(undefined)
        
        const res = await axios.post("/api/video",values)

        setVideo(res.data[0])
        form.reset();
        } catch (error : any) {
            if (error?.response?.status === 403) {
                proModal.onOpen();
             }
        } finally{
            router.refresh();

        }
    }
  return (
    <div>
        <Heading
         title= 'Video'
         icon= {Video}
         description="Turn your prompt into video."
         iconColor= "text-orange-700"
         bgColor= "bg-orange-700/10"/>
         <div className="px-4 lg:px-8">
            <div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}
                    className="rounded-lg  border w-full p-4 px-3 md:px-6
                     focus-within:shadow-sm grid grid-cols-12 gap-2     ">
                        <FormField 
                        name="prompt"
                        render={({field})=>(
                            <FormItem className="col-span-12 lg:col-span-10">
                                <FormControl className="m-0 p-0">
                                    <Input className="border-0 outline-none
                                    focus-visible:ring-0 focus-visible:ring-transparent "
                                    disabled={isLoading}
                                    placeholder="hors swming in home......"
                                    {...field}
                                    />
                                </FormControl>

                            </FormItem>

                        )}
                        />
                        <Button className="col-span-12 lg:col-span-2 w-full" disabled={isLoading}>
                            Gentate
                        </Button>

                    </form>
                </Form>
            </div>
            <div className="space-y-4 mt-4"></div>
            <div className="flex flex-col-reverse gap-y-4">
                {isLoading &&(
                    <div className="p-8 rounded-lg bg-muted w-full  flex text-center justify-center ">
                        <Loader />
                    </div>
                )}
                {!video && !isLoading &&(
                    <Empty label="No video genrated . " />
                )}

                {video &&(
                    
                    <video controls className="w-full mt-8 rounded-lg aspect-video border bg-black">
                        <source src={video} />
                    </video>
                )}
            </div>
         </div>
    </div>
  )
}
