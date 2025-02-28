import { MembershipForm, MembershipTable } from '@/components/admin/membership';
import AdminDashboardLayout from '@/Layouts/AdminDashboardLayout';
import { Membership } from '@/types/app';

export interface ApplicationProps {
    memberships: Membership[];
    organization_name: string;
    organization_logo: string;
    profile_picture: string;
}

export default function Applications(props: ApplicationProps) {
    return (
        <AdminDashboardLayout title="Membership" {...props}>
            <div className="grid gap-5">
                <MembershipForm {...props} />
                <MembershipTable {...props} />
            </div>
        </AdminDashboardLayout>
    );
}
