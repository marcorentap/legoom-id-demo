import { Text, Title, Stack, ModalProps, Modal, TextInput, Button, Group, Avatar, Anchor, FileInput, StyleProp, MantineColor } from "@mantine/core";
import { ReactNode } from "react";
import { SettingsProps, SettingItem, createModalControls } from "./Settings";
import { useForm } from "@mantine/form";
import { router } from "@inertiajs/react";

function NameForm(props: ModalProps & SettingsProps): ReactNode {

  let form = useForm({
    initialValues: {
      name: props.user.name
    }
  });

  function submit() {
    router.patch(route("profile.update"), form.values);
  }

  return (
    <Modal {...props} >
      <form onSubmit={form.onSubmit(submit)}>
        <Stack>
          <TextInput label="Current name" placeholder={props.user.name} disabled />
          <TextInput label="New name" key={form.key("name")} {...form.getInputProps("name")} />
          <Button type="submit">Confirm</Button>
        </Stack>
      </form>
    </Modal>
  )
}

function DisplayNameForm(props: ModalProps & SettingsProps): ReactNode {
  let form = useForm({
    initialValues: {
      display_name: props.profile.displayName
    }
  });

  function submit() {
    router.patch(route("profile.update"), form.values);
  }

  return (
    <Modal {...props} >
      <form onSubmit={form.onSubmit(submit)}>
        <Stack>
          <TextInput label="Current display name" placeholder={props.profile.displayName} disabled />
          <TextInput label="New display name" key={form.key("display_name")} {...form.getInputProps("display_name")} />
          <Button type="submit">Confirm</Button>
        </Stack>
      </form>
    </Modal>
  )
}

function SocialForm(props: ModalProps & SettingsProps): ReactNode {
  let form = useForm({
    initialValues: {
      social_url: props.profile.socialUrl
    }
  });

  function submit() {
    router.patch(route("profile.update"), form.values);
  }

  return (
    <Modal {...props} >
      <form onSubmit={form.onSubmit(submit)}>
        <Stack>
          <TextInput label="Current social URL" placeholder={props.profile.socialUrl} disabled />
          <TextInput label="New social URL" key={form.key("social_url")} {...form.getInputProps("social_url")}/>
          <Button type="submit">Confirm</Button>
        </Stack>
      </form>
    </Modal>
  )
}

function ProfilePictureForm(props: ModalProps & SettingsProps): ReactNode {
  return (
    <Modal {...props} >
      <form>
        <Stack>
          <FileInput label="Upload file" accept="image/png,image/jpeg" clearable />
          <Button>Confirm</Button>
        </Stack>
      </form>
    </Modal>
  )
}

interface ProfilePictureSettingsProps {
  title: string,
  action: {
    text: string,
    color: StyleProp<MantineColor>
    onClick: () => void
  }
  avatar: string,
}

export function ProfilePictureItem(props: ProfilePictureSettingsProps): ReactNode {
  let { title, action, avatar } = props;
  return (
    <Group justify="flex-start">
      <Avatar src={props.avatar} size="xl" />
      <Stack justify="flex-start" gap="xs">
        <Text fw={700} size="md">{title}</Text>
        <Anchor onClick={action.onClick} c={action.color}>{action.text}</Anchor>
      </Stack>
    </Group>
  );
}

export default function ProfileSettings(props: SettingsProps): ReactNode {
  let nameModalControls = createModalControls();
  let displayNameModalControls = createModalControls();
  let socialModalControls = createModalControls();
  let profilePictureModalControls = createModalControls();

  return (
    <>
      <NameForm opened={nameModalControls.opened} onClose={nameModalControls.close} {...props} />
      <DisplayNameForm opened={displayNameModalControls.opened} onClose={displayNameModalControls.close} {...props} />
      <SocialForm opened={socialModalControls.opened} onClose={socialModalControls.close} {...props} />
      <ProfilePictureForm opened={profilePictureModalControls.opened} onClose={profilePictureModalControls.close} {...props} />

      <Stack flex="1" align="stretch" justify="flex-start" gap="xl">
        <Title>Profile</Title>
        <ProfilePictureItem
          title="Profile Picture"
          avatar={props.profile.avatar}
          action={{
            text: "Upload Picture",
            color: "blue",
            onClick: profilePictureModalControls.open
          }} />
        <SettingItem
          title="Name"
          description="Your full name."
          peek=<Text>{props.user.name}</Text>
          action={{
            text: "Edit",
            color: "blue",
            onClick: nameModalControls.open
          }} />
        <SettingItem
          title="Display Name"
          description="The name to be displayed on your profile."
          peek=<Text>{props.profile.displayName}</Text>
          action={{
            text: "Edit",
            color: "blue",
            onClick: displayNameModalControls.open
          }} />
        <SettingItem
          title="Social URL"
          description="The social media account to be displayed on your profile."
          peek=<Text>{props.profile.socialUrl}</Text>
          action={{
            text: "Edit",
            color: "blue",
            onClick: socialModalControls.open
          }} />
      </Stack>
    </>
  );
}
