import { User, UserTable } from "@/components/admin/user"
import AdminDashboardLayout from "@/Layouts/AdminDashboardLayout"
import { ColumnDef } from "@tanstack/react-table"


export interface UsersProps {
  users: User[]
}

export default function Users(props: UsersProps) {
  return (
    <AdminDashboardLayout title="Users">
      <UserTable users={props.users} />
    </AdminDashboardLayout>
  )
}

