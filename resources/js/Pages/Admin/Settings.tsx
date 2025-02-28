import { LoginForm, RegisterForm } from '@/components/auth';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
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
        let values = form.getValues();
        form.reset();
        router.post(route('admin.settings.update'), values);
    };

    return (
        <>
            <Head title="Platform Settings" />
            <AdminDashboardLayout title="Settings" {...props}>
                <div className="max-w-xl">
                    <Card className="mb-5 p-5">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <FormField
                                    control={form.control}
                                    name="organization_name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Organization Name
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder={settings.name}
                                                    {...field}
                                                    value={field.value ?? ''}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="organization_logo"
                                    render={({ field: { onChange, ref } }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Organization Logo
                                            </FormLabel>
                                            <FormControl>
                                                <div className="relative rounded-md border-4 border-dotted p-1">
                                                    <Input
                                                        type="file"
                                                        onChange={(e) => {
                                                            if (
                                                                e.target.files
                                                            ) {
                                                                const file =
                                                                    e.target
                                                                        .files[0];
                                                                if (file) {
                                                                    onChange(
                                                                        file,
                                                                    );
                                                                    setFilename(
                                                                        file.name,
                                                                    );
                                                                }
                                                            }
                                                        }}
                                                        ref={ref}
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
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button
                                    className="mt-5 rounded-full"
                                    type="submit"
                                >
                                    Submit
                                </Button>
                            </form>
                        </Form>
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
