import { Text, Title, Stack, Button, Modal, ModalProps, TextInput, PasswordInput, Alert } from "@mantine/core";
import { ReactNode } from "react";
import { SettingsProps, SettingItem, createModalControls } from "./Settings";
import { useForm } from "@mantine/form";
import { router } from "@inertiajs/react";

function EmailForm(props: ModalProps & SettingsProps): ReactNode {
  let form = useForm({
    initialValues: {
      email: props.account.email
    }
  });

  function submit() {
    router.patch(route("account.update"), form.values);
  }

  return (
    <Modal {...props} >
      <form onSubmit={form.onSubmit(submit)}>
        <Stack>
          {props.errors.email && <Alert color='red'>{props.errors.email}</Alert>}
          <TextInput label="Current Email" placeholder={props.account.email} disabled />
          <TextInput label="New Email" key={form.key("email")} {...form.getInputProps("email")} />
          <Button type="submit">Confirm</Button>
        </Stack>
      </form>
    </Modal>
  )
}

function PasswordForm(props: ModalProps & SettingsProps): ReactNode {
  let form = useForm({
    initialValues: {
      current_password: "",
      password: "",
      password_confirmation: ""
    }
  });

  function submit() {
    router.patch(route("account.update"), form.values);
  }

  return (
    <Modal {...props} >
      <form onSubmit={form.onSubmit(submit)}>
        <Stack>
          {props.errors.current_password && <Alert color='red'>{props.errors.current_password}</Alert>}
          {props.errors.password && <Alert color='red'>{props.errors.password}</Alert>}
          <PasswordInput label="Current Password" key={form.key("current_password")} {...form.getInputProps("current_password")}/>
          <PasswordInput label="New Password" key={form.key("password")} {...form.getInputProps("password")} />
          <PasswordInput label="Confirm New Password" key={form.key("password_confirmation")} {...form.getInputProps("password_confirmation")} />
          <Button type="submit">Confirm</Button>
        </Stack>
      </form>
    </Modal>
  )
}

function DeleteForm(props: ModalProps & SettingsProps): ReactNode {
  let form = useForm({
  });

  function submit() {
    router.delete(route("account.delete"));
  }
  return (
    <Modal {...props} >
      <form onSubmit={form.onSubmit(submit)}>
        <Stack>
          <Text>Are you sure? You will lose access to all Legoom apps.</Text>
          <Button type="submit" color="red">Confirm</Button>
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
          peek=<Text>{props.account.id}</Text>
        />
        <SettingItem
          title="Email Address"
          description="The email address associated with your account."
          peek=<Text>{props.account.email}</Text>
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
