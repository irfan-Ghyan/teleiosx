// components/Navbar.jsx
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="flex items-center my-10">
      <div className="flex justify-center flex-grow">
        <Link href='/'>
        <Image
          src="/assets/images/logo.png" 
          alt="Logo"
          width={164} 
          height={122} 
          className='h-[122px]'
        />
        </Link>
        <span className='mx-4 my-12'>|</span>
        <Image
          src="/assets/images/leap.png" 
          alt="Logo"
          width={164} 
          height={90} 
          className='h-[90px] mt-4'

        />
      </div>

      {/* <ul className="flex space-x-6 text-white">
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Contact</a></li>
      </ul> */}
    </nav>
  );
};

export default Navbar;
