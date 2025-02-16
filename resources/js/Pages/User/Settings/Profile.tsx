import ProfileCard from "@/components/card";
import { AccountForm, PasswordForm, ProfileForm } from "@/components/settings";
import UserSettingsLayout from "@/Layouts/UserSettingsLayout";

export interface ProfileSettingsProps {
  organization_name: string
  organization_logo: string
  name: string
  email: string
  display_name: string
  social_url: string
  profile_picture: string
  membership: string
}

export default function ProfileSettings(props: ProfileSettingsProps) {
  console.log(props)
  return (
    <UserSettingsLayout title="Profile Settings" {...props}>
      <div className="max-w-xl grid gap-5">
        <ProfileForm {...props} />
        <div>
          <div className="text-xl font-semibold">Preview Profile Card</div>
          <ProfileCard {...props} />
        </div>
      </div>
    </UserSettingsLayout>
  )
}
