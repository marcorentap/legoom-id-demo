import {
    MembershipForm,
    MembershipFormProps,
    MembershipTable,
    MembershipTableProps,
} from '@/components/admin/membership';
import AdminDashboardLayout from '@/Layouts/AdminDashboardLayout';

type MembershipProps = MembershipFormProps & MembershipTableProps;
export default function Membership(props: MembershipProps) {
    return (
        <AdminDashboardLayout title="Membership">
            <div className="grid gap-5">
                <MembershipForm {...props} />
                <MembershipTable {...props} />
            </div>
        </AdminDashboardLayout>
    );
}
