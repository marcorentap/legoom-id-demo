import { RegisterForm, LoginFormProps, RegisterFormProps } from '@/components/auth';
import AuthenticationLayout from '@/Layouts/AuthenticationLayout';
import { Head } from '@inertiajs/react';

export default function Register(props: RegisterFormProps) {
  return (
    <>
      <Head title="Sign up" />
      <AuthenticationLayout>
        <RegisterForm {...props} />
      </AuthenticationLayout>
    </>
  )
}

