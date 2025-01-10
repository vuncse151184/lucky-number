import React from 'react'
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
            <DialogContent >
                <DialogHeader>
                    <DialogTitle>
                    </DialogTitle>
                    <DialogDescription className=" items-center">
                 
                            <span className='text-xl text-orange-500 font-semibold'>
                                Chúc mừng <span className="font-bold text-red-900">{currentWinner}</span> đã trúng giải
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