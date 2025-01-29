import { Alert, Anchor, Button, Card, Center, Checkbox, Container, Image, MantineProvider, PasswordInput, Space, Stack, TextInput, Title } from '@mantine/core';
import { Head, Link, router } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import LegoomIDLogo from '../../images/LegoomID.svg';
import { useViewportSize } from '@mantine/hooks';
import { Text } from '@mantine/core';
import { useForm } from '@mantine/form';

interface PageProps {
  status: string
  errors: {
    email: string
  }
}

export default function ForgotPassword(props: PageProps) {
  const { status, errors } = props;
  const { height, width } = useViewportSize();
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      remember: false as boolean
    }
  });

  function submit() {
    router.post(route("password.email"), form.values);
  }

  return (
    <>
      <Head title="Forgot Password" >
        <link rel="icon" href={LegoomIDLogo} />
      </Head>

      <Center h={height} w={width}>
        <Stack align='stretch' w={400} gap="xs">
          <Center>
            <Image src={LegoomIDLogo} w={70} />
          </Center>
          <Center>
            <Title ta="center">Reset your password</Title>
          </Center>
          {status && <Alert>{status}</Alert>}
          {errors.email && <Alert color='red'>{errors.email}</Alert>}

          <form onSubmit={form.onSubmit(submit)}>
            <Stack>
              <TextInput label="Email" key={form.key("email")} {...form.getInputProps("email")} />
              <Space />
              <Button type="submit">Reset</Button>
              <Center>
                <Text size="xs">Check your email for a password reset link.</Text>
              </Center>
            </Stack>
          </form>
        </Stack>
      </Center>
    </>
  );
}
