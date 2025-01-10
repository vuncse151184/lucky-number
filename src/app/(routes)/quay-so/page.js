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
import ScrollItem from './ScrollItem';
import WinnerPrizes from '@/app/(components)/WinnerPrizes';
const LandingPage = () => {

    return (
        <div className='h-[100vw] w-[100vw] bg-blue-900'>
            <div className='flex items-center justify-center pt-5'>

                <img src="/favicon.png" alt="logo" className='w-20 ' color='white' />

                <h1 className='text-white font-bold text-4xl '>{Constants.TITLE}</h1>
            </div>
            <div className='flex-col w-full justify-center items-center mt-10'>
                {/* giải thưởng  */}
                <ScrollItem />
                <div className='flex items-center justify-center mt-10'>
                    <h1 className='gradient-text'>{Constants.EVENTS}</h1>
                </div>
                <WinnerPrizes />
            </div>

        </div>
    )
}

export default LandingPage