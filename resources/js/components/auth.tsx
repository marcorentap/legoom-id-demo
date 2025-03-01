import { router, usePage } from '@inertiajs/react';
import { useForm } from 'react-hook-form';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';

export interface LoginFormProps {
    errors?: {
        email: string;
        password: string;
    };
    fake: boolean;
}

export interface RegisterFormProps {
    errors?: {
        name: string;
        email: string;
        password: string;
        password_confirmation: string;
    };
    fake: boolean;
}

function handleLogin(e) {
    router.post(route('login'), e);
}

function handleRegister(e) {
    router.post(route('register'), e);
}

export function LoginForm(props: LoginFormProps) {
    const form = useForm();
    const emailError = props.errors?.email;
    const passwordError = props.errors?.password;
    const { settings } = usePage().props;

    return (
        <Card>
            <CardHeader>
                <div>
                    <img className="m-auto h-14" src={settings.logo} />
                    <div className="mt-2 text-center text-xl font-bold">
                        Sign in to {settings.name}
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                {emailError ? (
                    <div className="text-sm text-red-500">{emailError}</div>
                ) : null}
                {passwordError ? (
                    <div className="text-sm text-red-500">{passwordError}</div>
                ) : null}
                <form
                    onSubmit={
                        props.fake ? () => {} : form.handleSubmit(handleLogin)
                    }
                >
                    <div className="flex flex-col gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                required
                                {...form.register('email')}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                required
                                {...form.register('password')}
                            />
                        </div>
                        <Button
                            type="submit"
                            className="mt-5 w-full rounded-full"
                        >
                            Sign in
                        </Button>
                    </div>
                    <div className="mt-4 text-center text-sm">
                        Don&apos;t have an account?{' '}
                        <a
                            href={route('register')}
                            className="underline underline-offset-4"
                        >
                            Sign up
                        </a>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}

export function RegisterForm(props: RegisterFormProps) {
    const form = useForm();
    const nameError = props.errors?.name;
    const emailError = props.errors?.email;
    const passwordError = props.errors?.password;
    const passwordConfirmationError = props.errors?.password_confirmation;
    const { settings } = usePage().props;
    return (
        <Card>
            <CardHeader>
                <div>
                    <img className="m-auto h-14" src={settings.logo} />
                    <div className="mt-2 text-center text-xl font-bold">
                        Sign up to {settings.name}
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                {nameError ? (
                    <div className="text-sm text-red-500">{nameError}</div>
                ) : null}
                {emailError ? (
                    <div className="text-sm text-red-500">{emailError}</div>
                ) : null}
                {passwordError ? (
                    <div className="text-sm text-red-500">{passwordError}</div>
                ) : null}
                {passwordConfirmationError ? (
                    <div className="text-sm text-red-500">
                        {passwordConfirmationError}
                    </div>
                ) : null}
                <form
                    onSubmit={
                        props.fake
                            ? () => {}
                            : form.handleSubmit(handleRegister)
                    }
                >
                    <div className="flex flex-col gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                required
                                {...form.register('name')}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                required
                                {...form.register('email')}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                required
                                {...form.register('password')}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password_confirmation">
                                Confirm Password
                            </Label>
                            <Input
                                id="password_confirmation"
                                type="password"
                                required
                                {...form.register('password_confirmation')}
                            />
                        </div>
                        <Button
                            type="submit"
                            className="mt-5 w-full rounded-full"
                        >
                            Sign up
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
