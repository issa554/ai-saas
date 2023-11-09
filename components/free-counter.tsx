import React, { useEffect, useState } from 'react'
import { Card, CardContent } from './ui/card'
import { FREE_REQ } from '@/constants'
import { Progress } from './ui/progress'
import { Button } from './ui/button'
import { Zap } from 'lucide-react'
import { useProModal } from '@/hooks/use-pro-modal'

interface FreeCounterProps{
    apiLimitCount: number,
    isPro:boolean
}


export const FreeCounter = ({apiLimitCount = 0  , isPro = false} : FreeCounterProps) => {
    const [mounted , setMounted] = useState(false)
    const proModal = useProModal()

    useEffect(()=>{
        setMounted(true)
    },[])

    if(!mounted){
        return null
    }
    if (isPro) {
        return null;
      }
  return (
    <div className='px-3'>
        <Card className='bg-white/10 border-0'>
            <CardContent className='py-6'>
                <div className='text-center text-sm text-white space-y-2'>
                    <p>
                        {apiLimitCount} / {FREE_REQ} Free Generations 
                    </p>
                    <Progress className='h-3' value={(apiLimitCount/FREE_REQ)*100} />
                </div>
                <Button onClick={proModal.onOpen} variant="premium" className='w-full' >
                    Upgrade 
                    <Zap className='w-4 h-4 ml-2 fill-white' />
                </Button>
            </CardContent>

        </Card>

    </div>
  )
}

