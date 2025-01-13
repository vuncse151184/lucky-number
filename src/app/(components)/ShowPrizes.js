import React, { useEffect, useState } from 'react'
import { useStorePrize } from '../stores/useStorePrize'


function ShowPrizes() {
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
                        <div key={index} className='items-center p-8 pt-1 bg-white rounded-lg shadow-sm shrink-0 shadow-slate-400 relative'>
                            {Object.keys(item).map((key, index) => (
                                <div className='flex gap-5' key={index}>
                                    {key === "Hình ảnh" && (
                                        <img className="h-36 hover:cursor-pointer hover:scale-110 transition-transform max-w-48 shadow-slate-800 shadow-lg rounded-sm" key={key} src={item[key]} alt="prize" />
                                    )}
                                    {key === "Tên giải thưởng" && (
                                        <h1 key={key} className='text-lg p-2 pb text-slate-500 font-bold'>{item[key]}</h1>
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

export default ShowPrizes