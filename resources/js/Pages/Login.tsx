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

export default function Login(props: PageProps) {
  let { status, errors } = props;
  const { height, width } = useViewportSize();
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      remember: false as boolean
    }
  });

  function submit() {
    router.post(route("login"), form.values);
  }

  return (
    <>
      <Head title="Sign in" >
        <link rel="icon" href={LegoomIDLogo} />
      </Head>

      <Center h={height} w={width}>
        <Stack align='stretch' w={400} gap="xs">
          <Center>
            <Image src={LegoomIDLogo} w={70} />
          </Center>
          <Center>
            <Title ta="center"> Sign in with Legoom ID</Title>
          </Center>
          {status && <Alert>{status}</Alert>}
          {errors.email && <Alert color='red'>{errors.email}</Alert>}
          <form onSubmit={form.onSubmit(submit)}>
            <Stack>
              <TextInput label="Email" key={form.key("email")} {...form.getInputProps("email")} />
              <PasswordInput label="Password" key={form.key("password")} {...form.getInputProps("password")} />
              <Checkbox label="Remember me" key={form.key("remember")} {...form.getInputProps("remember")} />
              <Space />
              <Button type="submit">Sign in</Button>
              <Stack gap={0}>
                <Text size="xs">Don't have an account? <Anchor href={route("register")}>Sign up</Anchor></Text>
                <Text size="xs">Forgot password? <Anchor>Reset it</Anchor></Text>
              </Stack>
            </Stack>
          </form>
        </Stack>
      </Center>
    </>
  );
}
