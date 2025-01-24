import { Text, AppShell, Group, Image, Card, Title, Center, Anchor, Container } from "@mantine/core";
import LegoomIDLogo from "../../images/LegoomID.svg";
import { Head, Link } from "@inertiajs/react";
interface PageProps {
  user_id: string
  user_name: string
}

export default function Homepage(props: PageProps) {
  const { user_id, user_name } = props;
  return (
    <>
      <Head title="Home" />
      <AppShell header={{ height: 60 }}>
        <AppShell.Header withBorder={false}>
          <Center h="100%">
            <Group w={1200} px="md" justify="space-between">
              <Image src={LegoomIDLogo} h={32} w="auto" />
              <Group>
                <Link href={route("profile.edit")}>
                  <Text fw="700" size="sm">Manage</Text>
                </Link>
                <Link method="post" href={route("logout")}>
                  <Text fw="700" size="sm" c="red">Logout</Text>
                </Link>
              </Group>
            </Group>
          </Center>
        </AppShell.Header>
        <AppShell.Main>
          <Center>
            <Card>
              <Text>Welcome back</Text>
              <Title >{user_name}</Title>
            </Card>
          </Center>
        </AppShell.Main>
      </AppShell>
    </>
  )
}

