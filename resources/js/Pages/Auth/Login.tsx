import { LoginForm, LoginFormProps } from '@/components/auth';
import AuthenticationLayout from '@/Layouts/AuthenticationLayout';
import { Head } from '@inertiajs/react';

export default function Login(props: LoginFormProps) {
  return (
    <>
      <Head title="Sign in" />
      <AuthenticationLayout>
        <LoginForm {...props} />
      </AuthenticationLayout>
    </>
  )
}

