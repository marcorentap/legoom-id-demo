import {
    ApplicationForm,
    ApplicationFormProps,
    ApplicationTable,
    ApplicationTableProps,
} from '@/components/admin/applications';
import AdminDashboardLayout from '@/Layouts/AdminDashboardLayout';

type ApplicationProps = ApplicationFormProps & ApplicationTableProps;

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
