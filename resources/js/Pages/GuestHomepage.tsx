import { Text, AppShell, Group, Image, Card, Title, Center, Anchor, Container } from "@mantine/core";
import LegoomIDLogo from "../../images/LegoomID.svg";
import { Head, Link } from "@inertiajs/react";

interface PageProps {
}

export default function Homepage(props: PageProps) {
  return (
    <>
      <Head title="Home" />
      <AppShell header={{ height: 60 }}>
        <AppShell.Header withBorder={false}>
          <Center h="100%">
            <Group w={1200} px="md" justify="space-between">
              <Anchor href="/">
                <Image src={LegoomIDLogo} h={32} w="auto" />
              </Anchor>
              <Group>
                <Text fw="700" size="sm" component="a" href={route("register")}>Register</Text>
                <Text fw="700" size="sm" component="a" href={route("login")}>Login</Text>
              </Group>
            </Group>
          </Center>
        </AppShell.Header>
        <AppShell.Main>
          <Center>
            <Card>
              <Title>You are not logged in</Title>
            </Card>
          </Center>
        </AppShell.Main>
      </AppShell>
    </>
  )
}

