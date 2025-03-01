import { usePage } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function AuthenticationLayout(props: PropsWithChildren) {
    const user = usePage().props.auth.user;
    return (
        <div className="flex h-screen w-screen items-center justify-center">
            <div className="w-96">{props.children}</div>
        </div>
    );
}
