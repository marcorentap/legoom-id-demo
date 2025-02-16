import { AccountForm, PasswordForm } from "@/components/settings";
import UserSettingsLayout from "@/Layouts/UserSettingsLayout";

export interface AccountSettingsProps {
  organization_name: string
  organization_logo: string
  name: string
  email: string
}

export default function AccountSettings(props: AccountSettingsProps) {
  return (
    <UserSettingsLayout title="Account Settings" {...props}>
      <div className="max-w-xl grid gap-5">
        <AccountForm {...props} />
        <PasswordForm {...props}/>
      </div>
    </UserSettingsLayout>
  )
}
