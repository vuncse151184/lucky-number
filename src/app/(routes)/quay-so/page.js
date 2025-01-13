'use client'

import React, { useEffect, useState } from 'react'
import { Constants } from '@/app/Constants'
import * as XLSX from "xlsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from 'next/navigation';
import ScrollItem from '../../(components)/ScrollItem';
import ShowPrizes from '@/app/(components)/ShowPrizes';
import ShowResults from '@/app/(components)/ShowResults';
const LandingPage = () => {

    return (
        <div className=' w-[100vw] bg-blue-900 h-[100vh]'>
            <div className='flex items-center justify-center gap-5 pt-5'>

                <img src="/favicon.png" alt="logo" className='w-20 ' color='white' />

                <h1 className='text-white font-bold text-4xl '>{Constants.TITLE}</h1>
            </div>
            <div className='flex sm:block  items-center justify-evenly relative'>
                <div className='absolute top-10 left-20'>
                    <ShowPrizes />
                </div>
                <div className='flex-col justify-center items-center mt-10'>
                    {/* giải thưởng  */}
                    <ScrollItem />
                </div>
            </div>
            <div className='flex items-center justify-center my-10'>
                <h1 className='gradient-text'>{Constants.EVENTS}</h1>
            </div>
            <ShowResults />
        </div>
    )
}

export default LandingPage