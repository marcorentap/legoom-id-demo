import { Text, Title, Stack, ModalProps, Modal, TextInput, Button } from "@mantine/core";
import { ReactNode } from "react";
import { SettingsProps, SettingItem, createModalControls } from "./Settings";

function PlanDeleteForm(props: ModalProps & SettingsProps): ReactNode {
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


export default function MembershipSettings(props: SettingsProps): ReactNode {
  let planDeleteModalControls = createModalControls();

  return (
    <>
      <PlanDeleteForm opened={planDeleteModalControls.opened} onClose={planDeleteModalControls.close} {...props} />
      <Stack flex="1" align="stretch" justify="flex-start" gap="xl">
        <Title>Membership</Title>
        <SettingItem
          title="Plan"
          description="Your Legoom membership plan."
          peek=<Text>{props.profile.membership}</Text>
          action={{
            text: "Cancel",
            color: "red",
            onClick: planDeleteModalControls.open
          }} />
      </Stack>
    </>
  );

}

