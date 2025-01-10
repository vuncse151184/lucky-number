import React, { useEffect, useState } from 'react'
import { useStorePrize } from '../stores/useStorePrize'
function WinnerPrizes() {
    const { storePrize, setStoreData } = useStorePrize()
    const [prize, setPrize] = useState([])
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const parsedData = localStorage.getItem('prizeData')
            setPrize(JSON.parse(parsedData))
        }
    }, [])
    console.log('prize', prize)
    return (
        <div>
            <div className='flex w-full justify-center gap-5'>
                {prize.map((item, index) => (
                    <div key={index} className='items-center p-5 pt-1 bg-white rounded-lg shadow-sm shrink-0 shadow-slate-400'>
                        {
                            Object.keys(item).map((key,index) => (
                                <div className='flex gap-5' key={index}>
                                    {key === "Hình ảnh" && (
                                        <img className="h-28 rounded-sm" key={key} src={item[key]} alt="prize" />
                                    )}
                                    {key !== "Hình ảnh" && (
                                        <div key={index}>
                                            {key === "Loại" && (
                                                <h1 className='text-black font-bold'>{key === "Số lượng" && (item[key])}  {item[key]}</h1>
                                            )}
                                            {key === "Tên giải thưởng" && (
                                                <h3 className='text-black'>{item[key]}</h3>

                                            )}
                                        </div>

                                    )}

                                </div>
                            ))
                        }


                    </div>
                ))}
            </div>

        </div>
    )
}

export default WinnerPrizes