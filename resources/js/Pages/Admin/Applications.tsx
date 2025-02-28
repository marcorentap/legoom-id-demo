import {
    ApplicationForm,
    ApplicationTable,
} from '@/components/admin/applications';
import AdminDashboardLayout from '@/Layouts/AdminDashboardLayout';

export interface Application {
    app_id: string;
    app_name: string;
    app_secret: string;
    app_callback: string;
}

export interface ApplicationProps {
    apps: Application[];
}

export default function Applications(props: ApplicationProps) {
    return (
        <AdminDashboardLayout title="Applications">
            <div className="grid gap-5">
                <ApplicationForm {...props} />
                <ApplicationTable {...props} />
            </div>
        </AdminDashboardLayout>
    );
}
