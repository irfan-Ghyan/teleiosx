// components/Navbar.jsx
import Image from 'next/image';

const Navbar = () => {
  return (
    <nav className="flex items-center">
      <div className="flex justify-center flex-grow">
        <Image
          src="/assets/images/logo.png" 
          alt="Logo"
          width={164} 
          height={122} 
          priority
        />
        <Image
          src="/assets/images/leap.png" 
          alt="Logo"
          width={120} 
          height={40} 
          priority
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
