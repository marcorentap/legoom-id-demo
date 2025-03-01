import {
    AccountForm,
    AccountFormProps,
    PasswordForm,
    PasswordFormProps,
} from '@/components/settings';
import UserSettingsLayout from '@/Layouts/UserSettingsLayout';

type AccountSettingsProps = AccountFormProps & PasswordFormProps;

export default function AccountSettings(props: AccountSettingsProps) {
    return (
        <UserSettingsLayout title="Account Settings" {...props}>
            <div className="grid max-w-xl gap-5">
                <AccountForm {...props} />
                <PasswordForm {...props} />
            </div>
        </UserSettingsLayout>
    );
}
