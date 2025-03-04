import { useState } from 'react'
import { GoSun } from 'react-icons/go'
import { IoMoon } from 'react-icons/io5'


export default function Switch() {
    const [darkMode, setDarkMode] = useState(false)

    if (darkMode) document.documentElement.classList.add('dark')
        else document.documentElement.classList.remove('dark')
    return(
        <div className='flex col-span-1 justify-end'>
            <button
            type='button'
            className='flex items-center p-2 mr-2 font-medium  text-gray bg-white rounded-lg border-gray-200 hover:bg-gray-100 dark:text-gray-400 dark:border-600 dark:hover:text-white dark:hover:bg-gray-700'
        onClick={() => setDarkMode(!darkMode)}
        >
            {darkMode && <GoSun className='w-4 h-4' /> }
            {!darkMode && <IoMoon className='w-4 h-4' />}
            </button>
        </div>
    )
}