import { Text, AppShell, Group, Image, Center, NavLink, Stack, Anchor, Space } from "@mantine/core";
import { Head, Link } from "@inertiajs/react";
import LegoomIDLogo from "../../images/LegoomID.svg";
import { ReactNode, useState } from "react";
import AccountSettings from "@/Components/Settings/Account";
import ProfileSettings from "@/Components/Settings/Profile";
import MembershipSettings from "@/Components/Settings/Membership";
import { SettingsProps } from "@/Components/Settings/Settings";
import { useHash } from "@mantine/hooks";

export default function Account(props: SettingsProps): ReactNode {

  const [hash, setHash] = useHash({ getInitialValueInEffect: false });
  const navigationItems = ["Account", "Profile", "Membership"]

  if (!hash) {
    setHash("Account");
  }

  return <>
    <Head title="Settings" >
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
              <Link href={route("settings")}>
                <Text fw="700" size="sm">Settings</Text>
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
          <Group w={1200} px="md" visibleFrom="md" justify="flex-start" wrap="nowrap" align="start" gap="xl">
            <Stack w={200} visibleFrom="md" justify="flex-start" gap="0">
              {navigationItems.map(item => (
                <NavLink label={item} fw={700} active={hash == "#".concat(item)} onClick={() => setHash(item)} styles={{ root: { borderRadius: 20 } }} />
              ))}
            </Stack>

            {hash == '#Account' && <AccountSettings {...props} />}
            {hash == '#Profile' && <ProfileSettings {...props} />}
            {hash == '#Membership' && <MembershipSettings {...props} />}
          </Group>

          <Stack w={1200} px="md" hiddenFrom="md" justify="flex-start" align="start" gap="xl">
            <AccountSettings {...props} />
            <ProfileSettings {...props} />
            <MembershipSettings {...props} />
            <Space/>
          </Stack>
        </Center>
      </AppShell.Main>
    </AppShell>
  </>;
}
