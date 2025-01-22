'use client'

import { useRouter } from 'next/router';
import Link from 'next/link';

const BookNow = () => {


  return (
    <Link
      className=" bg-gradient-to-r from-[#C09E5D] via-[#FCE6A2] to-[#C09E5D] text-[#063828] py-3 rounded-lg border-none text-lg cursor-pointer self-center transition duration-300 hover:opacity-80 px-20 text-4xl"
      href="/booking"
    >
      Book Now
    </Link>
  );
};

export default BookNow;
