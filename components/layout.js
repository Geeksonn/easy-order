import React from 'react';

import Context from '../components/context';

import Head from 'next/head';
import Link from 'next/link';

import { CogIcon, ShoppingBagIcon } from '@heroicons/react/outline';

const Layout = ({ children }) => {
    const { tokenCtx } = React.useContext(Context);
    const { token } = tokenCtx;

    return (
        <>
            <Head>
                <title>Easy Order - Brassicole</title>
            </Head>
            <div className='flex flex-col'>
                <div className='w-screen bg-gray-900 text-gray-50 flex justify-between items-center p-4'>
                    <Link href='/'>Easy Order - Brassicole</Link>
                    {/*
                    <div className='h-8 rounded-lg bg-gray-200 text-gray-900 flex justify-between items-center'>
                        <ShoppingBagIcon className='h-5 w-5 text-inherit' />
                    </div>
    */}
                    {token && (
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
