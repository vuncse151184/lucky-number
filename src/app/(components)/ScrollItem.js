'use client'

import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { Button } from '@/components/ui/button'
import { useStoreData } from '@/app/stores/useStoreData'
import { useStorePrize } from '@/app/stores/useStorePrize'
import WinnerModal from './WinnerModal'
import { toast, Bounce } from 'react-toastify'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuCheckboxItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useStoreResult } from '@/app/stores/useStoreResult'


const ScrollItem = () => {
    const digitsRef = useRef([]) // Array of refs for each digit
    const [start, setStart] = useState(false)
    const { storeData, setStoreData } = useStoreData() // Get data from store
    const duration = 2 // Duration for scrolling animation
    const staggerDelay = 0.5 // Delay between each digit animation
    const [open, setOpen] = useState(false)
    const handleCloseModal = () => setOpen(false)
    const [currentWinner, setCurrentWinner] = useState('')  // Winner's name
    const { currentPrize, setCurrentPrize } = useStorePrize() // Get data from store
    const [prizeData, setPrizeData] = useState([])
    const [isEnoughForPrize, setIsEnoughForPrize] = useState(false)
    const [result, setResult] = useState([]) // Store the result of each prize
    const { setStoreResult } = useStoreResult()
    useEffect(() => {
        // Get prizeData from localStorage 
        if (typeof window !== 'undefined') {
            const parsedPrizeData = localStorage.getItem('prizeData')
            setPrizeData(JSON.parse(parsedPrizeData))
            let resultArr = JSON.parse(parsedPrizeData).reduce((acc, prize) => {
                acc[prize["Loại"]] = new Array(prize["Số lượng"]);
                return acc;
            }, {});
            setResult(resultArr)
        }
    }, [])
    useEffect(() => {
        if (currentPrize.quantity === 0 && currentPrize.name) {
            toast.success(`Đã đủ số lượng ${currentPrize.name}`)
        }
    }, [currentPrize.quantity])
    const randomData = () => {
        let data = storeData
        // Get data from localStorage if storeData is empty
        if (storeData.length === 0) {
            const parsedData = localStorage.getItem('data')
            data = JSON.parse(parsedData) || []
        }
        if (data.length === 0) {
            toast.warn('Không đủ số lượng nhân viên', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }

        console.log("TEST", data[11])
        //Random and remove the winner from the list
        const randomItem = data.splice(Math.floor(Math.random() * data.length), 1)[0]
        setStoreData(data)// Remove the winner from storeData
        setCurrentWinner(randomItem)
        // Double check to remove the winner in case still in the store userData list (zustand)
        setStoreData(data.filter((item) => item["Mã nhân viên"] !== randomItem["Mã nhân viên"]))
        //result[currentPrize.name].push(randomItem["Mã nhân viên"])
        for (let index = 0; index < result[currentPrize.name].length; index++) {
            if (index === parseInt(currentPrize.quantity - 1)) {
                result[currentPrize.name][index] = (randomItem["Mã nhân viên"]);
            }
        }
        SpinPrize(randomItem["Mã nhân viên"])
        setStoreResult(result)
        currentPrize.quantity = currentPrize.quantity - 1

    }

    const SpinPrize = (result) => {
        const digits = result.slice(-6).split('') // Get last 6 digits of "Mã nhân viên"

        const tl = gsap.timeline({
            onComplete: () => {
                setStart(false)
                setOpen(true)
            },
        })
        digitsRef.current.forEach((digitRef, index) => {
            if (digitRef) {
                // Reset the position of each digit before starting the animation
                gsap.set(digitRef, { y: 0 })

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
        <div className="flex flex-col items-center justify-center">
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
                                    className="w-[100px] h-[100px] min flex justify-center items-center text-white text-4xl font-bold"
                                >
                                    {num}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

            </div>
            <div className='p-4'>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            className="bg-[#ffbc2d] hover:bg-[#ffbc2d]/80 text-white font-semibold border-white uppercase rounded-lg py-2 px-8"
                        >
                            {currentPrize.name ? currentPrize.name : 'Chọn giải thưởng'}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-48">
                        {prizeData && prizeData.map((prize, index) => (
                            <DropdownMenuCheckboxItem
                                key={index}
                                checked={currentPrize.name === prize['Loại']}
                                onCheckedChange={() => {
                                    setCurrentPrize({ name: prize['Loại'], quantity: prize['Số lượng'] })
                                }}
                            >
                                {prize['Loại']}
                            </DropdownMenuCheckboxItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>

                {currentPrize.name && (
                    <Button
                        onClick={handleTriggerScroll}
                        className={`bg-[#ffbc2d] ${start && currentPrize.quantity === 0 ? 'opacity-50 cursor-not-allowed' : ''} ml-4 hover:bg-[#ffbc2d]/80 text-white font-semibold border-white uppercase rounded-lg py-2 px-8`}
                        disabled={start} // Disable button during animation
                    >
                        Quay Số
                    </Button>
                )}
            </div>
            {/* Winner Modal */}
            <WinnerModal open={open} onClose={handleCloseModal} currentWinner={currentWinner} />
        </div>
    )
}

export default ScrollItem
