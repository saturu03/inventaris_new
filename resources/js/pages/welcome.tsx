import { Head, Link, usePage } from '@inertiajs/react';
import { useLanguage } from '@/contexts/language-context';
import { dashboard, home, login } from '@/routes';

export default function Welcome() {
    const { auth } = usePage().props;
    const { t } = useLanguage();

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] dark:bg-[#0a0a0a] dark:text-[#EDEDEC]">
                <header className="mb-6 w-full max-w-[335px] text-sm lg:max-w-4xl">
                    <nav className="flex items-center justify-end gap-4">
                        <Link
                            href={home().url}
                            className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                        >
                            {t('checkItems')}
                        </Link>
                        {auth.user ? (
                            <Link
                                href={dashboard()}
                                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <Link
                                href={login()}
                                className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                            >
                                {t('login')}
                            </Link>
                        )}
                    </nav>
                </header>
                <div className="flex flex-1 w-full items-center justify-center">
                    <div className="flex flex-col items-center gap-6 text-center">
                        <img
                            src="/apple-touch-icon.png"
                            alt={t('inventraSchool')}
                            className="h-24 w-24 object-contain"
                        />
                        <h1 className="text-2xl font-semibold">
                            {t('inventraSchool')}
                        </h1>
                        <p className="text-sm text-[#706f6c] dark:text-[#A1A09A]">
                            {t('schoolInventorySystem')}
                        </p>
                        <div className="flex gap-3">
                            <Link
                                href={home().url}
                                className="inline-block rounded-sm border border-black bg-[#1b1b18] px-5 py-1.5 text-sm leading-normal text-white hover:border-black hover:bg-black dark:border-[#eeeeec] dark:bg-[#eeeeec] dark:text-[#1C1C1A] dark:hover:border-white dark:hover:bg-white"
                            >
                                {t('checkItems')}
                            </Link>
                            {!auth.user && (
                                <Link
                                    href={login()}
                                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                >
                                    {t('login')}
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
