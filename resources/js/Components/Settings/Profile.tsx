import { Text, Title, Stack, ModalProps, Modal, TextInput, Button } from "@mantine/core";
import { ReactNode } from "react";
import { SettingsProps, SettingItem, createModalControls } from "./Settings";

function NameForm(props: ModalProps & SettingsProps): ReactNode {
  return (
    <Modal {...props} >
      <form>
        <Stack>
          <TextInput label="Current name" placeholder={props.user.name} disabled />
          <TextInput label="New name" />
          <Button>Confirm</Button>
        </Stack>
      </form>
    </Modal>
  )
}

function DisplayNameForm(props: ModalProps & SettingsProps): ReactNode {
  return (
    <Modal {...props} >
      <form>
        <Stack>
          <TextInput label="Current display name" placeholder={props.user.displayName} disabled />
          <TextInput label="New display name" />
          <Button>Confirm</Button>
        </Stack>
      </form>
    </Modal>
  )
}

function SocialForm(props: ModalProps & SettingsProps): ReactNode {
  return (
    <Modal {...props} >
      <form>
        <Stack>
          <TextInput label="Current social URL" placeholder={props.user.socialUrl} disabled />
          <TextInput label="New social URL" />
          <Button>Confirm</Button>
        </Stack>
      </form>
    </Modal>
  )
}

export default function ProfileSettings(props: SettingsProps): ReactNode {
  let nameModalControls = createModalControls();
  let displayNameModalControls = createModalControls();
  let socialModalControls = createModalControls();

  return (
    <>
      <NameForm opened={nameModalControls.opened} onClose={nameModalControls.close} {...props} />
      <DisplayNameForm opened={displayNameModalControls.opened} onClose={displayNameModalControls.close} {...props} />
      <SocialForm opened={socialModalControls.opened} onClose={socialModalControls.close} {...props} />

      <Stack flex="1" align="stretch" justify="flex-start" gap="xl">
        <Title>Profile</Title>
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
          peek=<Text>{props.user.displayName}</Text>
          action={{
            text: "Edit",
            color: "blue",
            onClick: displayNameModalControls.open
          }} />
        <SettingItem
          title="Social URL"
          description="The social media account to be displayed on your profile."
          peek=<Text>{props.user.socialUrl}</Text>
          action={{
            text: "Edit",
            color: "blue",
            onClick: socialModalControls.open
          }} />
      </Stack>
    </>
  );
}
