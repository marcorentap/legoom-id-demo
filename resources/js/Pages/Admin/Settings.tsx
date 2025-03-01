import { LoginForm, RegisterForm } from '@/components/auth';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AdminDashboardLayout from '@/Layouts/AdminDashboardLayout';
import { Head, router, usePage } from '@inertiajs/react';
import { Upload } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export interface SettingsProps {
    errors?: {
        organization_name: string;
        organization_logo: string;
    };
}

export default function Settings(props: SettingsProps) {
    const form = useForm();
    const { settings } = usePage().props;
    const [filename, setFilename] = useState<string | null>(null);

    const onSubmit = function (data, e) {
        const values = form.getValues();
        if (values.organization_logo) {
            values.organization_logo = values.organization_logo[0];
        }
        router.post(route('admin.settings.update'), values, {
            preserveState: 'errors',
        });
    };

    return (
        <>
            <Head title="Platform Settings" />
            <AdminDashboardLayout title="Settings" {...props}>
                <div className="max-w-xl">
                    <Card className="mb-5 p-5">
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="flex flex-col gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="organization_name">
                                        Organization Name
                                    </Label>
                                    <Input
                                        id="organization_name"
                                        placeholder={settings.name}
                                        {...form.register('organization_name')}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="organization_name">
                                        Organization Logo
                                    </Label>
                                    <div className="relative flex-col rounded-md border-4 border-dotted p-1">
                                        <Upload className="m-auto" />
                                        <div className="text-center font-semibold">
                                            Upload Picture
                                        </div>
                                        {filename ? (
                                            <div className="text-center">
                                                {filename}
                                            </div>
                                        ) : null}
                                        <Input
                                            className="full absolute inset-0 h-full cursor-pointer opacity-0"
                                            type="file"
                                            {...form.register(
                                                '...organization_logo',
                                                {
                                                    onChange: (e) => {
                                                        const logo =
                                                            form.getValues()
                                                                .organization_logo[0];
                                                        setFilename(logo.name);
                                                    },
                                                },
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <Button
                                    className="mt-5 rounded-full"
                                    type="submit"
                                >
                                    Submit
                                </Button>
                            </div>
                        </form>
                    </Card>
                    <div className="mb-1 text-xl font-semibold">Preview</div>
                    <div className="grid gap-5">
                        <LoginForm
                            organization_name={settings.name}
                            organization_logo={settings.logo}
                            fake={true}
                        />
                        <RegisterForm
                            organization_name={settings.name}
                            organization_logo={settings.logo}
                            fake={true}
                        />
                    </div>
                </div>
            </AdminDashboardLayout>
        </>
    );
}
