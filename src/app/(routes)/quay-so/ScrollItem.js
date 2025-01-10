'use client'

import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { Button } from '@/components/ui/button'
import { useStoreData } from '@/app/stores/useStoreData'
import WinnerModal from './WinnerModal'


const ScrollItem = () => {
    const digitsRef = useRef([]) // Array of refs for each digit
    const [start, setStart] = useState(false)
    const { storeData, setStoreData } = useStoreData() // Get data from store
    const duration = 2 // Duration for scrolling animation
    const staggerDelay = 0.5 // Delay between each digit animation
    const [open, setOpen] = useState(false)
    const handleCloseModal = () => setOpen(false)
    const [currentWinner, setCurrentWinner] = useState('')  // Winner's name

    const randomData = () => {
        let data = storeData

        // Get data from localStorage if storeData is empty
        if (storeData.length === 0) {
            const parsedData = localStorage.getItem('data')
            data = JSON.parse(parsedData) || []
        }

        const randoms = []
        const randomItem = data.splice(Math.floor(Math.random() * data.length), 1)[0]
        randoms.push(randomItem["Mã nhân viên"])
        setStoreData(data)
        setCurrentWinner(randomItem["Tên"])
        localStorage.setItem('data', JSON.stringify(data))// Remove the winner from localStorage
        setStoreData(data.filter((item) => item["Mã nhân viên"] !== randomItem["Mã nhân viên"])) // Remove the winner from the store list (zustand)
        SpinPrize(randoms)
    }

    const SpinPrize = (result) => {

        const digits = result[0].slice(-6).split('') // Get last 6 digits of "Mã nhân viên"
        console.log("digits", digits)
        const tl = gsap.timeline({
            onComplete: () => {
                setStart(false)
                setOpen(true)
            },
        })
        digitsRef.current.forEach((digitRef, index) => {
            console.log("digitRef", index)
            if (digitRef) {
                // Reset the position of each digit before starting the animation
                gsap.set(digitRef, { y: -100 })

                // Animate each digit
                tl.to(digitRef, {
                    y: -((10 + parseInt(digits[index])) * 100), // Move up by 10 numbers (100px height per number)
                    ease: 'power1.inOut',
                    duration,
                }, staggerDelay * index)

            }
        })
    }

    const handleTriggerScroll = () => {
        setStart(true)
        randomData() // Randomize 10 "Mã nhân viên"
    }

    const arr = Array.from({ length: 20 }, (_, i) => i % 10) // Array of numbers [0-9, repeated twice]

    return (
        <div className="flex items-center justify-center">



            <div className="flex space-x-2 items-center">
                {/* Digits Display */}
                {Array(6).fill(0).map((_, index) => (
                    <div
                        key={index}
                        className="relative w-[100px] h-[100px] overflow-hidden rounded-lg border-2 border-yellow-400 bg-red-500"
                    >
                        <div
                            className="absolute top-0 left-0"
                            ref={(el) => (digitsRef.current[index] = el)}
                        >
                            {/* Stack numbers vertically */}
                            {arr.map((num, i) => (
                                <div
                                    key={i}
                                    className="w-[100px] h-[100px] flex justify-center items-center text-white text-4xl font-bold"
                                >
                                    {num}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                <Button
                    onClick={handleTriggerScroll}
                    className={`bg-[#ffbc2d] ${start ? 'opacity-50 cursor-not-allowed' : ''} hover:bg-[#ffbc2d]/80 text-white font-semibold border-white uppercase rounded-lg py-2 px-8`}
                    disabled={start} // Disable button during animation
                >
                    Quay Số
                </Button>
            </div>

            {/* Winner Modal */}
            <WinnerModal open={open} onClose={handleCloseModal} currentWinner={currentWinner} />
        </div>
    )
}

export default ScrollItem
