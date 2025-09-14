import AppLogoIcon from '@/components/app-logo-icon';
import { home } from '@/routes';
import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    title?: string;
    description?: string;
}

export default function AuthSplitLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
    const { name, quote } = usePage<SharedData>().props;

    return (
        <div className="relative grid h-dvh flex-col items-center justify-center sm:px-0 lg:max-w-none lg:grid-cols-2 ">
            <div className="relative h-full flex-col text-white flex dark:border-r bg-login">
                <div className='bg-primary-dark/70 w-full h-full p-10 flex flex-col space-y-10'>
                    <div>
                        <Link href={home()} className="relative z-20 flex items-center text-lg font-medium">
                            <img src="assets/sunrise-horizontal-logo.avif" alt="Sunrise Logo" className="mr-2 " />

                            {/* <AppLogoIcon className="mr-2 size-8 fill-current text-white" />
                    {name} */}
                        </Link>
                    </div>
                    <div className='mt-10 lg:mt-30 space-y-6 lg:w-lg w-full'>
                        <h3 className="text-5xl font-extrabold text-secondary ">Nursing Home Scheduler</h3>
                        <p className='text-white text-justify'>Our system allows you to conveniently book and manage appointments with Sunrise Pointe. 
                            Stay connected, save time, and ensure your loved ones receive the care they 
                            need without the hassle of phone calls or long wait times.</p>
                    </div>
                </div>
            </div>
            <div className="w-full lg:p-8 px-8 py-5">
                <div className="bg-secondary/30 border-2 border-secondary/30 p-5 rounded-xl overflow-hidden shadow-2xl mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
                    <Link href={home()} className="relative z-20 flex items-center justify-center ">
                       <img src="assets/sunrise-horizontal-logo.avif" alt="Sunrise Logo" className="mr-2 " />
                    </Link>
                    <div className="flex flex-col items-start gap-2 text-left sm:items-center sm:text-center">
                        
                        <h1 className="text-2xl font-bold text-secondary">{title}</h1>
                        <p className="text-sm text-balance text-muted-foreground">{description}</p>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
