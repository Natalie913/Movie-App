import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Switch from './Switch'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import avatar from '../assets/avatar.jpg'

export default function Navbar() {
  const { currentUser, logOut } = useAuth()

  const links = [
    { to: '/login', label: 'Login', visible: !currentUser },
    { to: '/register', label: 'Register', visible: !currentUser },
    { to: '/', label: 'Logout', visible: currentUser, onClick: logOut },
  ]

  return (
    <>
      <nav className='bg-neutral-100 dark:bg-gray-900 py-3 dark:text-white w-full'>
        <div className='mx-auto px-2 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-between'>
            <Link to='/' className='text-2xl font-semibold pr-2'>
              React Movie App
            </Link>
            <div className='inset-y-0 right-9 flex items-center'>
              {currentUser && (
                <h5 className='mr-2 capitalize'>{currentUser.displayName}</h5>
              )}
              <Switch />
              {/* Profile dropdown */}
              <Menu as='div' className='relative ml-3'>
                <MenuButton className='relative rounded-full bg-gray-800 text-sm focus:ring-2 dark:fous:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
                  <img
                    alt='avatar'
                    src={currentUser?.photoURL || avatar}
                    className='h-8 w-8 rounded-full'
                  />
                </MenuButton>

                <MenuItems
                  anchor={{ to: 'bottom end', gap: '2px' }}
                  transition
                  className='absolute right-0 mt-2 origin-top-right transition duration-200 ease-out data-[closed]:scale-95 data-[cloased]:opacity-0 top-20 w-32 bg-white shadow-lg focus:outline-none'
                >
                  {links
                    .filter((item) => item.visible)
                    .map((item, index) => (
                      <MenuItem key={index}>
                        {({ focus }) => (
                          <Link
                            onClick={item?.onClick}
                            to={item.to}
                            className={`block px-2 py-2 text-sm text-gray-700 ${
                              focus ? 'bg-gray-200' : ''
                            }`}
                          >
                            {item.label}
                          </Link>
                        )}
                      </MenuItem>
                    ))}
                </MenuItems>
              </Menu>
            </div>
          </div>
        </div>
      </nav>
      <div className='h-[55px]'></div>
    </>
  )
}
