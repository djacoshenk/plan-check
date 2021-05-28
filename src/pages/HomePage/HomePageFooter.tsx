const navigation = {
  main: [
    { name: 'Solutions', path: '#' },
    { name: 'Company', path: '#' },
  ],
};

export function HomePageFooter() {
  return (
    <footer className='bg-gray-800'>
      <div className='max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8'>
        <nav
          className='-mx-5 -my-2 flex flex-wrap justify-center'
          aria-label='Footer'
        >
          {navigation.main.map((item) => (
            <div key={item.name} className='px-5 py-2'>
              <a
                href={item.path}
                className='text-base text-gray-300 hover:text-white'
              >
                {item.name}
              </a>
            </div>
          ))}
        </nav>

        <p className='mt-8 text-center text-base text-gray-300'>
          &copy; 2020 Plan Check, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
