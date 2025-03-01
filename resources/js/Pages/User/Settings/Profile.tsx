import ProfileCard from '@/components/card';
import { ProfileForm, ProfileFormProps } from '@/components/settings';
import UserSettingsLayout from '@/Layouts/UserSettingsLayout';

type ProfileSettingsProps = ProfileFormProps;

export default function ProfileSettings(props: ProfileSettingsProps) {
    console.log(props);
    return (
        <UserSettingsLayout title="Profile Settings">
            <div className="grid max-w-xl gap-5">
                <ProfileForm {...props} />
                <div>
                    <div className="text-xl font-semibold">
                        Preview Profile Card
                    </div>
                    <ProfileCard />
                </div>
            </div>
        </UserSettingsLayout>
    );
}
