'use client'
import React, { useEffect, useState } from 'react'
import * as XLSX from 'xlsx'

function UploadPrize() {

    const [prizeData, setPrizeData] = useState([])
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const data = localStorage.getItem('prizeData')
            if (data) {
                setPrizeData(JSON.parse(data))
            }
        }
    }, [])
    const handlePrizeUpload = (event) => {
        const file = event.target.files[0]
        const reader = new FileReader()
        reader.onload = (e) => {
            const binaryStr = e.target.result
            const workbook = XLSX.read(binaryStr, { type: 'binary' })
            const sheetName = workbook.SheetNames[0]
            const worksheet = workbook.Sheets[sheetName]
            const jsonData = XLSX.utils.sheet_to_json(worksheet)
            setPrizeData(jsonData)
            localStorage.setItem('prizeData', JSON.stringify(jsonData))
        }
        reader.readAsArrayBuffer(file)
    }

    return (
        <div>
            <div className='flex justify-start gap-5 mb-2'>
                <h2 className='text-black pl-28 text-2xl font-bold'>Thông tin giải thưởng</h2>
                <div className="button-wrapper text-center rounded-lg w-[80px] h-[40px] hover:cursor-pointer  bg-neutral-300 text-neutral-900 hover:bg-neutral-400/80 dark:bg-neutral-800 dark:text-neutral-50 dark:hover:bg-neutral-800/80">
                    <span className=" relative w-full h-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                        </svg>
                    </span>

                    <input
                        type="file"
                        name="upload"
                        id="upload"
                        className="upload-box hover:cursor-pointer"
                        placeholder="Tải tệp lên"
                        onChange={handlePrizeUpload} />
                </div>
            </div>
            <div className='flex  justify-center'>
                {prizeData.length > 0 && (
                    <table className='table-auto w-[90%] text-black'>
                        <thead className='bg-gray-200 sticky top-0'>
                            <tr>
                                <th className='px-4 py-2 border-black'>STT</th>
                                {Object.keys(prizeData[0]).map((key) => (
                                    <th key={key} className='px-4 py-2 border-black'>{key}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className='overflow-y-scroll'>
                            {prizeData.map((row, index) => (
                                <tr key={index}>
                                    <td className='border px-4 py-2 text-center'>{index + 1}</td>
                                    {Object.values(row).map((value, i) => (
                                        <td key={i} className='border px-4 py-2'>{value}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
}

export default UploadPrize