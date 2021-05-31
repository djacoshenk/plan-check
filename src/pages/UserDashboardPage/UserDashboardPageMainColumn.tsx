import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import {
  HiChevronRight,
  HiDotsVertical,
  HiPencilAlt,
  HiTrash,
  HiUserAdd,
} from 'react-icons/hi';
import { Link } from 'react-router-dom';

const projects = [
  {
    id: 1,
    title: 'GraphQL API',
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export function UserDashboardMainColumn() {
  return (
    <div className='flex flex-col w-0 flex-1 overflow-hidden'>
      <main className='flex-1 relative z-0 overflow-y-auto focus:outline-none'>
        <div className='border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8'>
          <div className='flex-1 min-w-0'>
            <h1 className='text-lg font-medium leading-6 text-gray-900 sm:truncate'>
              Home
            </h1>
          </div>
          <div className='mt-4 flex sm:mt-0 sm:ml-4'>
            <button
              type='button'
              className='order-1 ml-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:order-0 sm:ml-0'
            >
              Share
            </button>
            <button
              type='button'
              className='order-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:order-1 sm:ml-3'
            >
              Create
            </button>
          </div>
        </div>

        <div className='mt-10 sm:hidden'>
          <div className='px-4 sm:px-6'>
            <h2 className='text-gray-500 text-xs font-medium uppercase tracking-wide'>
              Projects
            </h2>
          </div>
          <ul className='mt-3 border-t border-gray-200 divide-y divide-gray-100'>
            {projects.map((project) => (
              <li key={project.id}>
                <Link
                  to='#'
                  className='group flex items-center justify-between px-4 py-4 hover:bg-gray-50 sm:px-6'
                >
                  <span className='flex items-center truncate space-x-3'>
                    <span className='font-medium truncate text-sm leading-6'>
                      {project.title}{' '}
                    </span>
                  </span>
                  <HiChevronRight
                    className='ml-4 h-5 w-5 text-gray-400 group-hover:text-gray-500'
                    aria-hidden='true'
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className='hidden sm:block'>
          <div className='align-middle inline-block min-w-full border-b border-gray-200'>
            <table className='min-w-full'>
              <thead>
                <tr className='border-t border-gray-200'>
                  <th className='px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    <span className='lg:pl-2'>Projects</span>
                  </th>
                  <th className='pr-6 py-3 border-b border-gray-200 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider' />
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-100'>
                {projects.map((project) => (
                  <tr key={project.id}>
                    <td className='px-6 py-3 max-w-0 w-full whitespace-nowrap text-sm font-medium text-gray-900'>
                      <div className='flex items-center space-x-3 lg:pl-2'>
                        <Link to='#' className='truncate hover:text-gray-600'>
                          <span>{project.title} </span>
                        </Link>
                      </div>
                    </td>
                    <td className='pr-6'>
                      <Menu
                        as='div'
                        className='relative flex justify-end items-center'
                      >
                        {({ open }) => (
                          <>
                            <Menu.Button className='w-8 h-8 bg-white inline-flex items-center justify-center text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                              <span className='sr-only'>Open options</span>
                              <HiDotsVertical
                                className='w-5 h-5'
                                aria-hidden='true'
                              />
                            </Menu.Button>
                            <Transition
                              show={open}
                              as={Fragment}
                              enter='transition ease-out duration-100'
                              enterFrom='transform opacity-0 scale-95'
                              enterTo='transform opacity-100 scale-100'
                              leave='transition ease-in duration-75'
                              leaveFrom='transform opacity-100 scale-100'
                              leaveTo='transform opacity-0 scale-95'
                            >
                              <Menu.Items
                                static
                                className='mx-3 origin-top-right absolute right-7 top-0 w-48 mt-1 rounded-md shadow-lg z-10 bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none'
                              >
                                <div className='py-1'>
                                  <Menu.Item>
                                    {({ active }) => (
                                      <Link
                                        to='#'
                                        className={classNames(
                                          active
                                            ? 'bg-gray-100 text-gray-900'
                                            : 'text-gray-700',
                                          'group flex items-center px-4 py-2 text-sm'
                                        )}
                                      >
                                        <HiPencilAlt
                                          className='mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500'
                                          aria-hidden='true'
                                        />
                                        Edit
                                      </Link>
                                    )}
                                  </Menu.Item>
                                  <Menu.Item>
                                    {({ active }) => (
                                      <Link
                                        to='#'
                                        className={classNames(
                                          active
                                            ? 'bg-gray-100 text-gray-900'
                                            : 'text-gray-700',
                                          'group flex items-center px-4 py-2 text-sm'
                                        )}
                                      >
                                        <HiUserAdd
                                          className='mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500'
                                          aria-hidden='true'
                                        />
                                        Share
                                      </Link>
                                    )}
                                  </Menu.Item>
                                </div>
                                <div className='py-1'>
                                  <Menu.Item>
                                    {({ active }) => (
                                      <Link
                                        to='#'
                                        className={classNames(
                                          active
                                            ? 'bg-gray-100 text-gray-900'
                                            : 'text-gray-700',
                                          'group flex items-center px-4 py-2 text-sm'
                                        )}
                                      >
                                        <HiTrash
                                          className='mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500'
                                          aria-hidden='true'
                                        />
                                        Delete
                                      </Link>
                                    )}
                                  </Menu.Item>
                                </div>
                              </Menu.Items>
                            </Transition>
                          </>
                        )}
                      </Menu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
