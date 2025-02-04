import { Text, AppShell, Group, Image, Card, Title, Center, Anchor, Container } from "@mantine/core";
import LegoomIDLogo from "../../images/LegoomID.svg";
import { Head, Link } from "@inertiajs/react";
import ProfileCard from "@/Components/ProfileCard";
import { UserProfile } from "@/Types/LegoomID";
import { useViewportSize } from "@mantine/hooks";
interface PageProps {
}

export default function GuestHomepage(props: PageProps) {
  let { height, width } = useViewportSize();
  height = height - 60
  return (
    <>
      <Head title="Home" >
        <link rel="icon" href={LegoomIDLogo} />
      </Head>
      <AppShell header={{ height: 60 }}>
        <AppShell.Header withBorder={false}>
          <Center h="100%">
            <Group w={1200} px="md" justify="space-between">
              <Anchor href="/">
                <Image src={LegoomIDLogo} h={32} w="auto" />
              </Anchor>
              <Group>
                <Link href={route("login")}>
                  <Text fw="700" size="sm">Login</Text>
                </Link>
                <Link href={route("register")}>
                  <Text fw="700" size="sm">Register</Text>
                </Link>
              </Group>
            </Group>
          </Center>
        </AppShell.Header>
        <AppShell.Main>
          <Center h={height} w={width}>
            <Title> You are not logged in </Title>
          </Center>
        </AppShell.Main>
      </AppShell>
    </>
  )
}

