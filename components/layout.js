import React from 'react';

import Head from 'next/head';
import Link from 'next/link';

import { CogIcon, ShoppingBagIcon } from '@heroicons/react/outline';

const Layout = ({ authenticated, children }) => {
    return (
        <>
            <Head>
                <title>Easy Order - Brassicole</title>
            </Head>
            <div className='flex flex-col'>
                <div className='w-screen bg-gray-900 text-gray-50 flex justify-between items-center p-4'>
                    <Link href='/'>Easy Order - Brassicole</Link>
                    {authenticated && (
                        <Link href='/config'>
                            <CogIcon className='h-7 w-7 text-gray-50 cursor-pointer' />
                        </Link>
                    )}
                </div>
                <main>{children}</main>
            </div>
        </>
    );
};

export default Layout;
