import React, { useEffect, useState } from 'react'
import { useStorePrize } from '../stores/useStorePrize'


function WinnerPrizes() {
    const { currentPrize } = useStorePrize()
    const [prize, setPrize] = useState([])
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const parsedData = localStorage.getItem('prizeData')
            setPrize(JSON.parse(parsedData))
        }
    }, [])
    return (
        <div>
            <div className='flex w-full justify-center gap-5'>
                {prize.map((item, index) => (
                    currentPrize.name === item['Loại'] ? (
                        <div key={index} className='items-center p-5 pt-1 bg-white rounded-lg shadow-sm shrink-0 shadow-slate-400 relative'>
                            {Object.keys(item).map((key, index) => (
                                <div className='flex gap-5' key={index}>
                                    {key === "Hình ảnh" && (
                                        <img className="h-28 rounded-sm" key={key} src={item[key]} alt="prize" />
                                    )}
                                    {key === "Tên giải thưởng" && (
                                        <h1 key={key} className='text-lg text-slate-500 font-bold'>{item[key]}</h1>
                                    )}
                                </div>
                            ))
                            }
                        </div>
                    ) : null
                ))}
            </div>

        </div>
    )
}

export default WinnerPrizes