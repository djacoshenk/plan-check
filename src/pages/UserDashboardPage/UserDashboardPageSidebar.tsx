import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {
  HiX,
  HiOutlineCalendar,
  HiOutlineChartBar,
  HiOutlineCog,
  HiOutlineFolder,
  HiOutlineHome,
  HiOutlineInbox,
  HiOutlineQuestionMarkCircle,
  HiOutlineShieldCheck,
  HiOutlineUsers,
} from 'react-icons/hi';
import { Link } from 'react-router-dom';

const primaryNavigation = [
  { name: 'Dashboard', icon: HiOutlineHome, path: '#', current: false },
  { name: 'Team', icon: HiOutlineUsers, path: '#', current: false },
  { name: 'Projects', icon: HiOutlineFolder, path: '#', current: false },
  { name: 'Calendar', icon: HiOutlineCalendar, path: '#', current: false },
  { name: 'Documents', icon: HiOutlineInbox, path: '#', current: false },
  { name: 'Reports', icon: HiOutlineChartBar, path: '#', current: false },
];

const secondaryNavigation = [
  { name: 'Settings', path: '#', icon: HiOutlineCog },
  { name: 'Help', path: '#', icon: HiOutlineQuestionMarkCircle },
  { name: 'Privacy', path: '#', icon: HiOutlineShieldCheck },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export function UserDashboardPageSidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as='div'
          static
          className='fixed inset-0 flex z-40 lg:hidden'
          open={sidebarOpen}
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter='transition-opacity ease-linear duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='transition-opacity ease-linear duration-300'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-gray-600 bg-opacity-75' />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter='transition ease-in-out duration-300 transform'
            enterFrom='-translate-x-full'
            enterTo='translate-x-0'
            leave='transition ease-in-out duration-300 transform'
            leaveFrom='translate-x-0'
            leaveTo='-translate-x-full'
          >
            <div className='relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-gray-700'>
              <Transition.Child
                as={Fragment}
                enter='ease-in-out duration-300'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                leave='ease-in-out duration-300'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
              >
                <div className='absolute top-0 right-0 -mr-12 pt-2'>
                  <button
                    className='ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className='sr-only'>Close sidebar</span>
                    <HiX className='h-6 w-6 text-white' aria-hidden='true' />
                  </button>
                </div>
              </Transition.Child>
              <div className='flex-shrink-0 flex items-center px-4'>
                <img
                  className='h-8 w-auto'
                  src='https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg'
                  alt='Workflow'
                />
              </div>
              <nav
                className='mt-5 flex-shrink-0 h-full divide-y divide-gray-800 overflow-y-auto'
                aria-label='Sidebar'
              >
                <div className='px-2 space-y-1'>
                  {primaryNavigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={classNames(
                        item.current
                          ? 'bg-gray-800 text-white'
                          : 'text-gray-100 hover:text-white hover:bg-gray-600',
                        'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      <item.icon
                        className='mr-4 flex-shrink-0 h-6 w-6 text-gray-200'
                        aria-hidden='true'
                      />
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className='mt-6 pt-6'>
                  <div className='px-2 space-y-1'>
                    {secondaryNavigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.path}
                        className='group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-100 hover:text-white hover:bg-gray-600'
                      >
                        <item.icon
                          className='mr-4 h-6 w-6 text-gray-200'
                          aria-hidden='true'
                        />
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </nav>
            </div>
          </Transition.Child>
          <div className='flex-shrink-0 w-14' aria-hidden='true'></div>
        </Dialog>
      </Transition.Root>
      <div className='hidden lg:flex lg:flex-shrink-0'>
        <div className='flex flex-col w-64'>
          <div className='flex flex-col flex-grow bg-gray-800 pt-5 pb-4 overflow-y-auto'>
            <div className='flex items-center flex-shrink-0 px-4'>
              <img
                className='h-8 w-auto'
                src='https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg'
                alt='Workflow'
              />
            </div>
            <nav
              className='mt-5 flex-1 flex flex-col divide-y divide-gray-900 overflow-y-auto'
              aria-label='Sidebar'
            >
              <div className='px-2 space-y-1'>
                {primaryNavigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={classNames(
                      item.current
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    <item.icon
                      className={classNames(
                        item.current
                          ? 'text-gray-300'
                          : 'text-gray-400 group-hover:text-gray-300',
                        'mr-3 flex-shrink-0 h-6 w-6'
                      )}
                      aria-hidden='true'
                    />
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className='mt-6 pt-6'>
                <div className='px-2 space-y-1'>
                  {secondaryNavigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className='group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md text-gray-300 hover:text-white hover:bg-gray-700'
                    >
                      <item.icon
                        className='mr-4 h-6 w-6 text-gray-300'
                        aria-hidden='true'
                      />
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </nav>
          </div>
          <div className='flex-shrink-0 flex bg-gray-700 p-4'>
            <Link to='#' className='flex-shrink-0 w-full group block'>
              <div className='flex items-center'>
                <div>
                  <img
                    className='inline-block h-9 w-9 rounded-full'
                    src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                    alt=''
                  />
                </div>
                <div className='ml-3'>
                  <p className='text-sm font-medium text-white'>Tom Cook</p>
                  <p className='text-xs font-medium text-gray-300 group-hover:text-gray-200'>
                    View profile
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
