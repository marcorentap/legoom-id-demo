import { ApplicationTable } from "@/components/admin/applications"
import { User, UserTable } from "@/components/admin/user"
import AdminDashboardLayout from "@/Layouts/AdminDashboardLayout"
import { ColumnDef } from "@tanstack/react-table"

export interface Application{
  app_id: string
  app_name: string
  app_secret: string
  app_callback: string
  organization_name: string
  organization_logo: string
  profile_picture: string
}

export interface ApplicationProps {
  apps: Application[]
}

export default function Applications(props: ApplicationProps) {
  return (
    <AdminDashboardLayout title="Applications" {...props}>
      <ApplicationTable {...props} />
    </AdminDashboardLayout>
  )
}

