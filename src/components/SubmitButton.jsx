import React, { useEffect, useState } from 'react'

export default function SubmitButton({ onClick, label, loadingState, classString, errors }) {
    const [isLoading, setIsLoading] = useState(false)
    const [localErrors, setLocalErrors] = useState(errors)


    const handleClick = () => {
        if (loadingState || isLoading) {
            return
        }

        onClick()
        setIsLoading(true)
    }

    useEffect(() => {
        if (!loadingState) {
            setIsLoading(false)
        }
    }, [loadingState])

    return (
        <button onClick={handleClick} className={classString}>
            {isLoading ? <div className="flex items-center">
                <span className="loading loading-dots loading-sm m-auto"></span>
            </div> : label}
        </button>
    )
}
