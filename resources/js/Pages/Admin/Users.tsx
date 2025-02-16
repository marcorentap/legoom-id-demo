import { User, UserTable } from "@/components/admin/user"
import AdminDashboardLayout from "@/Layouts/AdminDashboardLayout"
import { ColumnDef } from "@tanstack/react-table"


export interface UsersProps {
  organization_name: string
  organization_logo: string
  profile_picture: string
  users: User[]
}

export default function Users(props: UsersProps) {
  return (
    <AdminDashboardLayout title="Users" {...props}>
      <UserTable users={props.users} />
    </AdminDashboardLayout>
  )
}

