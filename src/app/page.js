'use client'
import React from 'react'
import { useState } from 'react'
import { Constants } from '@/app/Constants'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import UploadPrize from './(components)/UploadPrize'
import UploadUser from './(components)/UploadUser'


const Page = () => {
  const router = useRouter()
  const handleNavigate = () => {
    router.push('/quay-so')
  }

  return (
    // bg-hero-pattern
    <div className='h-full w-full bg-contain bg-center'>
      <div className='flex items-center mt-10 flex-col'>
        {/* logo */}
        <div className='flex items-center gap-5'>
          <img src="/favicon.png" alt="logo" className='w-20' />
          <h1 className='text-[#0864b4] text-4xl sm:text-sm '>{Constants.TITLE}</h1>
        </div>
        <div className='flex gap-5 justify-end w-[90%]'>
          <Button onClick={handleNavigate} >
            Trang chính
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
            </svg>
          </Button>
        </div>

      </div>

      <UploadPrize />

      <UploadUser />

    </div>
  )
}

export default Page