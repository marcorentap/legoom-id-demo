import { Text, AppShell, Group, Image, Card, Title, Center, Anchor, Container, NavLink, Stack, Button, StyleProp, MantineColor } from "@mantine/core";
import { Head, Link } from "@inertiajs/react";
import LegoomIDLogo from "../../../images/LegoomID.svg";
import { ReactNode, useState } from "react";

interface SettingItemProps {
  title: string,
  description: string,
  peek?: ReactNode
  action?: {
    text: string,
    href: string
    color: StyleProp<MantineColor>
  }
}

interface PageProps {
  user: {
    id: string,
    name: string,
    email: string
    displayName: string,
    socialUrl: string
  }
}

function SettingItem(props: SettingItemProps): ReactNode {
  let { title, description, peek, action } = props;
  return (
    <Group justify="space-between">
      <Stack justify="flex-start" gap="xs">
        <Text fw={700} size="md">{title}</Text>
        <Text c="dimmed">{description}</Text>
        <Group justify="flex-start" hiddenFrom="md">
          {peek}
          {action && <Anchor href={action.href} c={action.color}>{action.text}</Anchor>}
        </Group>
      </Stack>
      <Group justify="flex-end" visibleFrom="md">
        {peek}
        {action && <Anchor href={action.href} c={action.color}>{action.text}</Anchor>}
      </Group>
    </Group>
  );
}

function AccountSettings(props: PageProps): ReactNode {
  return (
    <Stack flex="1" align="stretch" justify="flex-start" gap="xl">
      <Title>Account</Title>
      <SettingItem
        title="Account ID"
        description="Your Legoom account identifier."
        peek=<Text>{props.user.id}</Text>
      />
      <SettingItem
        title="Email address"
        description="The email address associated with your account."
        peek=<Text>{props.user.email}</Text>
        action={{
          text: "Edit",
          href: "#",
          color: "blue"
        }} />
      <SettingItem
        title="Password"
        description="Set a unique password to protect your account."
        action={{
          text: "Edit",
          href: "#",
          color: "blue"
        }} />
      <SettingItem
        title="Delete Account"
        description="Permanently delete your Legoom account. You will lose access to all Legoom apps."
        action={{
          text: "Delete",
          href: "",
          color: "red"
        }} />
    </Stack>
  );
}
function ProfileSettings(props: PageProps): ReactNode {
  return (
    <Stack flex="1" align="stretch" justify="flex-start" gap="xl">
      <Title>Profile</Title>
      <SettingItem
        title="Name"
        description="Your full name."
        peek=<Text>{props.user.name}</Text>
        action={{
          text: "Edit",
          href: "#",
          color: "blue"
        }} />
      <SettingItem
        title="Display Name"
        description="The name to be displayed on your profile."
        peek=<Text>{props.user.displayName}</Text>
        action={{
          text: "Edit",
          href: "#",
          color: "blue"
        }} />
      <SettingItem
        title="Social URL"
        description="The social media account to be displayed on your profile."
        peek=<Text>{props.user.socialUrl}</Text>
        action={{
          text: "Edit",
          href: "#",
          color: "blue"
        }} />
    </Stack>
  );
}
function MembershipSettings(): ReactNode {
  return (
    <Stack flex="1" align="stretch" justify="flex-start" gap="xl">
      <Title>Membership</Title>
      <SettingItem
        title="Email address"
        description="The email address associated with your account."
        peek=<Text>myemail@email.com</Text>
        action={{
          text: "Edit",
          href: "#",
          color: "blue"
        }} />
      <SettingItem
        title="Password"
        description="Set a unique password to protect your account."
        action={{
          text: "Edit",
          href: "#",
          color: "blue"
        }} />
      <SettingItem
        title="Delete Account"
        description="Permanently delete your Legoom account. You will lose access to all Legoom apps."
        action={{
          text: "Delete",
          href: "",
          color: "red"
        }} />
    </Stack>
  );
}

export default function Account(props: PageProps): ReactNode {

  const [section, setSection] = useState('Account');
  return <>
    <Head title="Settings" >
      <link rel="icon" href={LegoomIDLogo} />
    </Head>
    <AppShell header={{ height: 60 }}>
      <AppShell.Header withBorder={false}>
        <Center h="100%">
          <Group w={1200} px="md" justify="space-between">
            <Image src={LegoomIDLogo} h={32} w="auto" />
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
          <Group w={1200} px="md" justify="flex-start" wrap="nowrap" align="start">
            <Stack w={200} visibleFrom="md" justify="flex-start" gap="0">
              <NavLink href="#required-for-focus" label="Account" fw={700} active={section == "Account"} onClick={() => setSection("Account")} />
              <NavLink href="#required-for-focus" label="Profile" fw={700} active={section == "Profile"} onClick={() => setSection("Profile")} />
              <NavLink href="#required-for-focus" label="Membership" fw={700} active={section == "Membership"} onClick={() => setSection("Membership")} />
            </Stack>

            {section == 'Account' && <AccountSettings {...props} />}
            {section == 'Profile' && <ProfileSettings {...props} />}
            {section == 'Membership' && <MembershipSettings />}
          </Group>
        </Center>
      </AppShell.Main>
    </AppShell>
  </>;
}
