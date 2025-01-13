import React, { useEffect, useState } from 'react'
import { useStoreResult } from '../stores/useStoreResult'
import { open_sans } from '@/lib/fontUtils'
function ShowResults() {
    const { storeResult } = useStoreResult()
    const [localUserData, setLocalUserData] = useState([])
    const [isDisplayed, setIsDisplayed] = useState(false)

    const handleChangeDisplay = () => {
        setIsDisplayed(!isDisplayed)
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const parsedData = localStorage.getItem('data')
            setLocalUserData(JSON.parse(parsedData) || [])
        }
    }, [])

    const getWinnerName = (id) => {
        return localUserData.find((item) => item['Mã nhân viên'] === id)['Tên']
    }
    return (
        Object.keys(storeResult).length > 0 && (

            <div className='flex items-center justify-center relative w-[100%]'>

                <h1 className='absolute top-0 left-32 underline hover:cursor-pointer text-white uppercase font-semibold' onClick={handleChangeDisplay}>Hiện kết quả </h1>
                {isDisplayed && (
                    <div className={`relative bg-white scroll-m-1 p-5 rounded-lg shadow-lg w-[40%] ${open_sans.className}`}>
                        <img src="/trophy.png" alt="award" className='w-20 h-20 z-10 absolute top-[-50px] right-[-30px]' />
                        <ul>
                            {Object.keys(storeResult).map((key, index) => {
                                return (
                                    Object.keys(storeResult[key]).length > 0 && (
                                        <li key={index}>
                                            <h2 className='text-blue-900 uppercase font-semibold'>{key}</h2>
                                            <ul className='pl-4'>
                                                {storeResult[key].map((item, index) => {
                                                    return (
                                                        <li key={index}>{item} - {getWinnerName(item)}</li>
                                                    )
                                                })}
                                            </ul>
                                        </li>
                                    )
                                )
                            })}
                        </ul>

                    </div>
                )}
            </div>
        )
    )
}

export default ShowResults