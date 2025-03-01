import { router, usePage } from '@inertiajs/react';
import { Upload } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';

export interface AccountFormProps {
    errors?: {
        name: string;
        email: string;
    };
}

export interface PasswordFormProps {
    errors?: {
        password: string;
        password_confirmation: string;
        current_password: string;
    };
}

export interface ProfileFormProps {
    errors?: {
        social_url: string;
        display_name: string;
        profile_picture: string;
    };
}

export function AccountForm(props: AccountFormProps) {
    const form = useForm();
    const nameError = props.errors?.name;
    const emailError = props.errors?.email;
    const { user } = usePage().props;

    const onSubmit = function () {
        const values = form.getValues();
        form.reset();
        router.post(route('user.settings.account.info'), values);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Account Information</CardTitle>
            </CardHeader>
            <CardContent>
                {nameError ? (
                    <div className="text-sm text-red-500">{nameError}</div>
                ) : null}
                {emailError ? (
                    <div className="text-sm text-red-500">{emailError}</div>
                ) : null}
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                placeholder={user.account.name}
                                {...form.register('name')}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                placeholder={user.account.email}
                                {...form.register('email')}
                            />
                        </div>
                        <div>
                            <Button type="submit" className="mt-5 rounded-full">
                                Update
                            </Button>
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}

export function PasswordForm(props: PasswordFormProps) {
    const form = useForm();
    const currentPasswordError = props.errors?.current_password;
    const passwordConfirmationError = props.errors?.password_confirmation;
    const passwordError = props.errors?.password;

    const onSubmit = function () {
        const values = form.getValues();
        form.reset();
        router.post(route('user.settings.account.password'), values);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Password</CardTitle>
            </CardHeader>
            <CardContent>
                {currentPasswordError ? (
                    <div className="text-sm text-red-500">
                        {currentPasswordError}
                    </div>
                ) : null}
                {passwordError ? (
                    <div className="text-sm text-red-500">{passwordError}</div>
                ) : null}
                {passwordConfirmationError ? (
                    <div className="text-sm text-red-500">
                        {passwordConfirmationError}
                    </div>
                ) : null}

                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="current_password">
                                Current Password
                            </Label>
                            <Input
                                id="current_password"
                                type="password"
                                {...form.register('current_password')}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">New Password</Label>
                            <Input
                                id="password"
                                type="password"
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
                                {...form.register('password_confirmation')}
                            />
                        </div>
                        <div>
                            <Button type="submit" className="mt-5 rounded-full">
                                Update
                            </Button>
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}

export function ProfileForm(props: ProfileFormProps) {
    const form = useForm();
    const displayNameError = props.errors?.display_name;
    const socialUrlError = props.errors?.social_url;
    const profilePictureError = props.errors?.profile_picture;
    const [filename, setFilename] = useState<string | null>(null);
    const { user } = usePage().props;

    const onSubmit = function () {
        const values = form.getValues();
        const profilePicture = values.profile_picture[0];
        const upload = {
            ...values,
            profile_picture: profilePicture ? profilePicture : null,
        };
        router.post(route('user.settings.profile'), upload, {
            preserveState: 'errors',
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Profile</CardTitle>
            </CardHeader>
            <CardContent>
                {displayNameError ? (
                    <div className="text-sm text-red-500">
                        {displayNameError}
                    </div>
                ) : null}
                {socialUrlError ? (
                    <div className="text-sm text-red-500">{socialUrlError}</div>
                ) : null}
                {profilePictureError ? (
                    <div className="text-sm text-red-500">
                        {profilePictureError}
                    </div>
                ) : null}

                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="display_name">Display Name</Label>
                            <Input
                                id="display_name"
                                placeholder={user.profile.display_name}
                                {...form.register('display_name')}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="social_url">Social URL</Label>
                            <Input
                                id="social_url"
                                placeholder={user.profile.social_url}
                                {...form.register('social_url')}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="profile_picture">
                                Profile Picture
                            </Label>
                            <div className="relative rounded-md border-4 border-dotted p-1">
                                <Input
                                    id="profile_picture"
                                    type="file"
                                    {...form.register('profile_picture', {
                                        onChange: (e) => {
                                            const file = e.target.files?.[0];
                                            setFilename(file.name);
                                        },
                                    })}
                                    className="full absolute inset-0 h-full cursor-pointer opacity-0"
                                />
                                <Upload className="m-auto" />
                                <div className="m-auto text-center font-semibold">
                                    Upload Picture
                                </div>
                                <div className="m-auto text-center text-sm">
                                    {filename
                                        ? filename
                                        : 'Click or drag a file here'}
                                </div>
                            </div>
                        </div>
                        <div>
                            <Button type="submit" className="mt-5 rounded-full">
                                Update
                            </Button>
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
