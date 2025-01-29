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
    password: string
  }
}

export default function Register(props: PageProps) {
  const {status, errors} = props;
  const { height, width } = useViewportSize();
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    }
  });


  function submit() {
    router.post(route("register"), form.values);
  }

  return (
    <>
      <Head title="Sign up" >
        <link rel="icon" href={LegoomIDLogo} />
      </Head>

      <Center h={height} w={width}>
        <Stack align='stretch' w={400} gap="xs">
          <Center>
            <Image src={LegoomIDLogo} w={70} />
          </Center>
          <Center>
            <Title ta="center">Sign up to Legoom ID</Title>
          </Center>
          {status && <Alert>{status}</Alert>}
          {errors.email && <Alert color='red'>{errors.email}</Alert>}
          {errors.password && <Alert color='red'>{errors.password}</Alert>}
          <form onSubmit={form.onSubmit(submit)}>
            <Stack>
              <TextInput label="Name" key={form.key("name")} {...form.getInputProps("name")} />
              <TextInput label="Email" key={form.key("email")} {...form.getInputProps("email")} />
              <PasswordInput label="Password" key={form.key("password")} {...form.getInputProps("password")} />
              <PasswordInput label="Confirm Password" key={form.key("password_confirmation")} {...form.getInputProps("password_confirmation")} />
              <Button type="submit">Sign up</Button>
              <Space />
              <Text size="xs">Already have an account? <Anchor href={route("login")}>Sign in</Anchor></Text>
            </Stack>
          </form>
        </Stack>
      </Center>
    </>
  );
}
