"use client"

import { navLinks } from '@/constants/types'
import { UserButton, useUser } from '@clerk/nextjs'
import { CircleUserIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'


const LeftSideBar = () => {
  const pathname = usePathname();
  const { user } = useUser();

  return (
    <div className='h-screen left-0 top-0 sticky p-10 flex flex-col gap-16 bg-blue-2 shadow-xl max-lg:hidden'>
      <Image 
        src="/logo.png"
        alt='Logo'
        width={150}
        height={70}
        priority
      />

      <div className='flex flex-col gap-12'>
        {navLinks.map((link) => (
          <Link 
            href={link.url} 
            key={link.label}
            className={`flex gap-4 text-body-medium ${pathname === link.url ? "text-blue-1" : ""}`}
          >
            {link.icon}
            <p>{link.label}</p>
          </Link>
        ))}
      </div>

      <div className='flex gap-4 text-body-medium items-center'>
        {/* <UserButton /> */}
        {user ? (
          <UserButton />
        ) : (
          <Link href="/sign-in">
            <CircleUserIcon />
          </Link>
        )}
        <p>Edit Profile</p>
      </div>
    </div>
  )
}

export default LeftSideBar