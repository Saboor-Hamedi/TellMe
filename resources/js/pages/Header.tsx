
import { Head, Link, usePage } from '@inertiajs/react';
import { SharedData } from '@/types';
export default function Header() {
    const { auth } = usePage<SharedData>().props;
    return (
        <header className="w-full">
            <div className="mx-auto max-w-7xl px-6 py-4 lg:px-8">
                <nav className="flex items-center justify-end gap-4">
                    {auth.user ? (
                        <Link
                            href={route('dashboard')}
                            className="inline-block rounded-lg bg-black px-5 py-2 text-sm font-medium text-white transition hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route('login')}
                                className="inline-block rounded-lg border border-black px-5 py-2 text-sm font-medium text-black transition hover:bg-gray-100 dark:border-white dark:text-white dark:hover:bg-gray-900"
                            >
                                Log in
                            </Link>
                            <Link
                                href={route('register')}
                                className="inline-block rounded-lg bg-black px-5 py-2 text-sm font-medium text-white transition hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
}