import React from 'react'
import { useStoreResult } from '../stores/useStoreResult'

function ShowResults() {
    const { storeResult } = useStoreResult()
    console.log("storeResult", storeResult)
    return (
        <div>
            <div>
                <h1>Results</h1>
                <ul>
                    {storeResult && Object.keys(storeResult).map((key, index) => {
                        return (
                            <li key={index}>
                                <h2>{key}</h2>
                                <ul>
                                    {storeResult[key].map((item, index) => {
                                        return (
                                            <li key={index}>{item}</li>
                                        )
                                    })}
                                </ul>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default ShowResults