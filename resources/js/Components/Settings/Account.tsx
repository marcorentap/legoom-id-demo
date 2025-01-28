import { Text, Title, Stack, Button, Modal, ModalProps, TextInput, PasswordInput } from "@mantine/core";
import { ReactNode } from "react";
import { SettingsProps, SettingItem, createModalControls } from "./Settings";

function EmailForm(props: ModalProps & SettingsProps): ReactNode {
  return (
    <Modal {...props} >
      <form>
        <Stack>
          <TextInput label="Current Email" placeholder={props.user.email} disabled />
          <TextInput label="New Email" />
          <Button>Confirm</Button>
        </Stack>
      </form>
    </Modal>
  )
}

function PasswordForm(props: ModalProps & SettingsProps): ReactNode {
  return (
    <Modal {...props} >
      <form>
        <Stack>
          <PasswordInput label="Current Password" />
          <PasswordInput label="New Password" />
          <PasswordInput label="Confirm New Password" />
          <Button>Confirm</Button>
        </Stack>
      </form>
    </Modal>
  )
}

function DeleteForm(props: ModalProps & SettingsProps): ReactNode {
  return (
    <Modal {...props} >
      <form>
        <Stack>
          <Text>Are you sure? You will lose access to all Legoom apps.</Text>
          <Button color="red">Confirm</Button>
        </Stack>
      </form>
    </Modal>
  )
}

export default function AccountSettings(props: SettingsProps): ReactNode {
  let emailModalControls = createModalControls();
  let passwordModalControls = createModalControls();
  let deleteModalControls = createModalControls();

  return (
    <>
      <EmailForm opened={emailModalControls.opened} onClose={emailModalControls.close} {...props} />
      <PasswordForm opened={passwordModalControls.opened} onClose={passwordModalControls.close} {...props} />
      <DeleteForm opened={deleteModalControls.opened} onClose={deleteModalControls.close} {...props} />

      <Stack flex="1" align="stretch" justify="flex-start" gap="xl">
        <Title>Account</Title>
        <SettingItem
          title="Account ID"
          description="Your Legoom account identifier."
          peek=<Text>{props.user.id}</Text>
        />
        <SettingItem
          title="Email Address"
          description="The email address associated with your account."
          peek=<Text>{props.user.email}</Text>
          action={{
            text: "Edit",
            color: "blue",
            onClick: emailModalControls.open
          }} />
        <SettingItem
          title="Password"
          description="Set a unique password to protect your account."
          action={{
            text: "Edit",
            color: "blue",
            onClick: passwordModalControls.open
          }} />
        <SettingItem
          title="Delete Account"
          description="Permanently delete your Legoom account. You will lose access to all Legoom apps."
          action={{
            text: "Delete",
            color: "red",
            onClick: deleteModalControls.open
          }} />
      </Stack>
    </>
  );
}
