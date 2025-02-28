import { MembershipForm, MembershipTable } from '@/components/admin/membership';
import AdminDashboardLayout from '@/Layouts/AdminDashboardLayout';
import { Membership } from '@/types/app';

export interface ApplicationProps {
    memberships: Membership[];
}

export default function Applications(props: ApplicationProps) {
    return (
        <AdminDashboardLayout title="Membership">
            <div className="grid gap-5">
                <MembershipForm {...props} />
                <MembershipTable {...props} />
            </div>
        </AdminDashboardLayout>
    );
}
