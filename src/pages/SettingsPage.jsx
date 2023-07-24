import { useEffect, useState } from 'react'
import { themeChange } from 'theme-change'
import { capitalize } from 'lodash'

const themes = [
    'light',
    'dark',
    'cupcake',
    'bumblebee',
    'emerald',
    'corporate',
    'synthwave',
    'retro',
    'cyberpunk',
    'valentine',
    'halloween',
    'garden',
    'forest',
    'aqua',
    'lofi',
    'pastel',
    'fantasy',
    'wireframe',
    'black',
    'luxury',
    'dracula',
    'cmyk',
    'autumn',
    'business',
    'acid',
    'lemonade',
    'night',
    'coffee',
    'winter',
]

export default function SettingsPage() {
    const [html, sethtml] = useState(null)

    useEffect(() => {
        themeChange(false) // needed by theme-change to work in React (not sure why)

		sethtml(window.document.documentElement)

        // html.setAttribute('data-theme', 'synthwave')
    }, [])

    const handleMouseEnter = (theme) => {
        // html.setAttribute('data-theme', theme)
    }

    const handleClick = (theme) => {
        // html.setAttribute('data-theme', theme)
    }

    return (
        <div className='m-4'>
            <h1 className='text-3xl font-extrabold'>Settings</h1>
			{/* Combo of Daisy dropdown and theme-change */}
            <div data-choose-theme className='dropdown dropdown-open rounded mt-8'>
                <label tabIndex={0} className='btn m-1 text-lg normal-case'>
                    Select Theme
                </label>
                <ul
                    tabIndex={0}
                    className='dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52'
                >
                    <div className='w-[500px] grid grid-cols-4 gap-3 bg-base-200 p-2 rounded'>
                        {themes.map((theme) => (
                            <button
                                key={theme}
								data-theme={theme}
                                data-set-theme={theme}
                                data-act-class='ACTIVECLASS'
								className='bg-base-100 p-2 font-bold rounded'
								// onMouseEnter={() => handleMouseEnter(theme)}
                            >
                                {capitalize(theme)}
                            </button>

                        ))}
                    </div>
                </ul>
            </div>

			{/* First attempt. Using a select menu example from the theme-change docs (works but ugly) */}
			{/* <select data-choose-theme>
                <option value=''>Default</option>
                <option value='dark'>Dark</option>
                <option value='light'>Light</option>
            </select> */}

			{/* Second attempt. Vanilla setting html element attribute (works but no localStorage) */}
            {/* <div data-choose-theme className='dropdown dropdown-right'>
                <label tabIndex={0} className='btn m-1 normal-case'>
                    Select Theme
                </label>
                <ul
                    tabIndex={0}
                    className='dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52'
                >
                    {themes.map((theme) => (
                        <li key={theme}>
                            <a onMouseEnter={() => handleMouseEnter(theme)} onClick={() => handleClick(theme)}>{theme}</a>
                        </li>
                    ))}
                </ul>
            </div> */}
        </div>
    )
}
