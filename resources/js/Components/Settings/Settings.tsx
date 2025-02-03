import { Text, AppShell, Group, Image, Card, Title, Center, Anchor, Container, NavLink, Stack, Button, StyleProp, MantineColor } from "@mantine/core";
import { Head, Link } from "@inertiajs/react";
import { ReactNode, useState } from "react";
import AccountSettings from "@/Components/Settings/Account";
import ProfileSettings from "@/Components/Settings/Profile";
import MembershipSettings from "@/Components/Settings/Membership";
import { useDisclosure } from "@mantine/hooks";

export interface SettingItemProps {
  title: string,
  description: string,
  peek?: ReactNode
  action?: {
    text: string,
    href?: string
    color: StyleProp<MantineColor>
    onClick?: () => void
  }
}

export interface SettingsProps {
  user: {
    id: string,
    name: string,
    email: string
  }

  profile: {
    displayName: string,
    socialUrl: string
    avatar: string,
    membership: string,
  }

  errors: {
    email: string
    password: string
    avatar_file: string
    social_url: string
  }
}

interface ModalControls {
  opened: boolean,
  readonly open: () => void;
  readonly close: () => void;
  readonly toggle: () => void;
};

export function createModalControls(): ModalControls {
  let [opened, { open, close, toggle }] = useDisclosure(false);
  return {
    opened, open, close, toggle
  }
};


export function SettingItem(props: SettingItemProps): ReactNode {
  let { title, description, peek, action } = props;
  return (
    <Group justify="space-between">
      <Stack justify="flex-start" gap="xs">
        <Text fw={700} size="md">{title}</Text>
        <Text c="dimmed">{description}</Text>
        <Group justify="flex-start" hiddenFrom="md">
          {peek}
          {action && <Anchor href={action.href} onClick={action.onClick} c={action.color}>{action.text}</Anchor>}
        </Group>
      </Stack>
      <Group justify="flex-end" visibleFrom="md">
        {peek}
        {action && <Anchor href={action.href} onClick={action.onClick} c={action.color}>{action.text}</Anchor>}
      </Group>
    </Group>
  );
}
