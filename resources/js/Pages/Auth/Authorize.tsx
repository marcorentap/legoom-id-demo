import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from '@/components/ui/card';
import AuthenticationLayout from '@/Layouts/AuthenticationLayout';
import { Head, usePage } from '@inertiajs/react';
import { Info } from 'lucide-react';

interface AuthorizePageProps {
    application_name: string;
    client: { id: string; name: string };
    user: object;
    scopes: { description: string }[];
    request: { state: any };
    authToken: string;
    csrfToken: string;
}

function AuthorizationForm(props: AuthorizePageProps) {
    const { client, scopes, request, authToken, csrfToken } = props;
    const { settings } = usePage().props;
    return (
        <Card>
            <CardHeader>
                <div>
                    <img className="m-auto h-14" src={settings.logo} />
                    <div className="mt-2 text-center text-xl font-bold">
                        Authorize with {settings.name}
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div>
                    <span className="font-bold">{props.client.name}</span> will
                    be able to:{' '}
                </div>

                {scopes.map((scope) => {
                    return (
                        <div key={scope.description} className="flex">
                            <Info className="mr-1 w-4" />
                            <div>{scope.description}</div>
                        </div>
                    );
                })}
            </CardContent>
            <form method="post">
                <input type="hidden" name="_token" value={csrfToken} />
                <input type="hidden" name="client_id" value={client.id} />
                <input type="hidden" name="auth_token" value={authToken} />
                <input type="hidden" name="state" value={request.state} />

                <CardFooter className="flex gap-5">
                    <Button
                        className="w-full"
                        formAction={route('passport.authorizations.approve')}
                    >
                        Authorize
                    </Button>
                    <Button
                        variant="destructive"
                        className="w-full"
                        formAction={route('passport.authorizations.deny')}
                    >
                        Deny
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}

export default function Authorize(props: AuthorizePageProps) {
    return (
        <>
            <Head title="Authorize" />
            <AuthenticationLayout>
                <AuthorizationForm {...props} />
            </AuthenticationLayout>
        </>
    );
}
