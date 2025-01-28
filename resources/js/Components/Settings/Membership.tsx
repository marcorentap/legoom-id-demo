import { Text, Title, Stack, ModalProps, Modal, TextInput, Button } from "@mantine/core";
import { ReactNode } from "react";
import { SettingsProps, SettingItem, createModalControls } from "./Settings";

function PaymentForm(props: ModalProps & SettingsProps): ReactNode {
  return (
    <Modal {...props} >
      <form>
        <Stack>
          <TextInput label="Current payment information" placeholder={props.user.paymentCard} disabled />
          <TextInput label="New payment information" />
          <Button>Confirm</Button>
        </Stack>
      </form>
    </Modal>
  )
}

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
  let paymentModalControls = createModalControls();
  let planDeleteModalControls = createModalControls();

  return (
    <>
      <PaymentForm opened={paymentModalControls.opened} onClose={paymentModalControls.close} {...props} />
      <PlanDeleteForm opened={planDeleteModalControls.opened} onClose={planDeleteModalControls.close} {...props} />
      <Stack flex="1" align="stretch" justify="flex-start" gap="xl">
        <Title>Membership</Title>
        <SettingItem
          title="Payment Information"
          description="Update and view your payment options."
          peek=<Text>{props.user.paymentCard}</Text>
          action={{
            text: "Edit",
            color: "blue",
            onClick: paymentModalControls.open
          }} />
        <SettingItem
          title="Plan"
          description="Your Legoom membership plan."
          peek=<Text>{props.user.membership}</Text>
          action={{
            text: "Cancel",
            color: "red",
            onClick: planDeleteModalControls.open
          }} />
      </Stack>
    </>
  );

}

