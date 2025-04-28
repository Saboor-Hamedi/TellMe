
import { Head, Link, router, usePage } from '@inertiajs/react';
import { SharedData } from '@/types';

export default function Header() {
    const { auth } = usePage<SharedData>().props;
    const homePage = () => {
       router.visit(route('home'), { preserveScroll: true }); 
    }
    return (
        <nav className="mx-auto border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-purple-50 px-6 py-4 shadow-md">
            <div className="flex items-center justify-between">
                <div className="cursor-pointer text-2xl font-bold text-indigo-600" onClick={homePage}>
                    Tell Me
                </div>
                <div className="hidden space-x-8 md:flex">
                    <a href="#" className="text-gray-600 hover:text-indigo-600">
                        Features
                    </a>
                    <a href="#" className="text-gray-600 hover:text-indigo-600">
                        Stories
                    </a>
                    <a href="#" className="text-gray-600 hover:text-indigo-600">
                        Pricing
                    </a>
                    <a href="#" className="text-gray-600 hover:text-indigo-600">
                        About
                    </a>
                </div>
                <div className="flex space-x-4">
                    {auth.user ? (
                        <Link href={route('dashboard')} className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link href={route('login')} className="rounded-lg px-4 py-2 text-gray-600 hover:bg-gray-100">
                                Log in
                            </Link>
                            <Link href={route('register')} className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}