import React, { useEffect } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'



const WinnerModal = ({ open, onClose, currentWinner }) => {
    return (
        <Dialog open={open} className="bg-black" onClose={onClose}>
            <DialogContent className='bg-[url(/competti-bg.gif)]  bg-center bg-no-repeat bg-cover' >
                <DialogHeader className={`flex items-center justify-center`}>
                    <DialogTitle>
                    </DialogTitle>
                    <DialogDescription className=" items-center">
                        <span className='text-xl text-orange-500 font-semibold'>
                            Chúc mừng <span className="font-bold text-red-900">{currentWinner["Tên"]} - {currentWinner["Mã nhân viên"]}</span> đã trúng giải
                        </span>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="h-6">
                    <DialogClose asChild onClick={onClose}>
                        <Button className=' hover:cursor-pointer bg-transparent hover:bg-transparent text-slate-400 font-semibold border-white uppercase rounded-lg'>
                            Đóng
                        </Button>
                    </DialogClose>
                </DialogFooter>

            </DialogContent>
        </Dialog>

    )
}

export default WinnerModal