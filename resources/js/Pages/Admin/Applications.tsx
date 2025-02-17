import { ApplicationForm, ApplicationTable } from "@/components/admin/applications"
import { User, UserTable } from "@/components/admin/user"
import AdminDashboardLayout from "@/Layouts/AdminDashboardLayout"
import { ColumnDef } from "@tanstack/react-table"

export interface Application {
  app_id: string
  app_name: string
  app_secret: string
  app_callback: string
}

export interface ApplicationProps {
  apps: Application[]
  organization_name: string
  organization_logo: string
  profile_picture: string
}

export default function Applications(props: ApplicationProps) {
  return (
    <AdminDashboardLayout title="Applications" {...props}>
      <div className="grid gap-5">
      <ApplicationForm {...props} />
      <ApplicationTable {...props} />
      </div>
    </AdminDashboardLayout>
  )
}

