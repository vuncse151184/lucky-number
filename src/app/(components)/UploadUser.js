import React, { useEffect, useState } from 'react'
import * as XLSX from 'xlsx'
import { useStoreData } from './../stores/useStoreData'


function UploadUser() {
    const { setStoreData, storeData } = useStoreData()
    const [data, setData] = useState([])

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedData = localStorage.getItem('data')
            if (storedData) {
                setData(JSON.parse(storedData))
                setStoreData(JSON.parse(storedData))
            }
        }
    }, [])

    const handleFileUpload = (event) => {
        const file = event.target.files[0]
        const reader = new FileReader()
        reader.onload = (e) => {
            const binaryStr = e.target.result
            const workbook = XLSX.read(binaryStr, { type: 'binary' })
            const sheetName = workbook.SheetNames[0]
            const worksheet = workbook.Sheets[sheetName]
            const jsonData = XLSX.utils.sheet_to_json(worksheet)
            setData(jsonData)
            localStorage.setItem('data', JSON.stringify(jsonData))
            setStoreData(jsonData)
        }

        reader.readAsArrayBuffer(file)
    }


    return (
        <div className='flex-col pt-5'>
            <div className='flex justify-start gap-5 mb-2'>
                <h2 className='text-black pl-28 text-2xl font-bold'>Thông tin user</h2>
                <div className="button-wrapper text-center rounded-lg h-[40px] hover:cursor-pointer  bg-neutral-300 text-neutral-900 hover:bg-neutral-400/80 dark:bg-neutral-800 dark:text-neutral-50 dark:hover:bg-neutral-800/80">
                    <span className="flex justify-center items-center w-full h-full  ">
                        <span className=" relative w-full h-full flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                            </svg>

                        </span>
                    </span>
                    <input
                        type="file"
                        name="upload"
                        id="upload"
                        className="upload-box"
                        placeholder="Tải tệp lên"
                        onChange={handleFileUpload} />
                </div>
            </div>
            {data.length > 0 && (
                <div className='flex flex-col justify-center'>

                    <div className='flex justify-center'>

                        <table className='table-auto w-[90%] text-black'>
                            <thead className='bg-gray-200 sticky top-0'>
                                <tr>
                                    <th className='px-4 py-2 border-black'>STT</th>
                                    {Object.keys(data[0]).map((key) => (
                                        <th key={key} className='px-4 py-2 border-black'>{key}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className='overflow-y-scroll '>
                                {data.map((row, index) => (
                                    <tr key={index}>
                                        <td className='border px-4 py-2'>{index + 1}</td>
                                        {Object.values(row).map((value, i) => (
                                            <td key={i} className='border px-4 py-2'>{value}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>
                </div>

            )}
        </div>
    )
}

export default UploadUser