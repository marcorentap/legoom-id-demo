import { UserProfile } from "@/Types/LegoomID";
import { Avatar, Card, Center, Stack, Text } from "@mantine/core"
import QRCode from "react-qr-code";

interface ProfileCardProps {
  profile: UserProfile
};

export default function ProfileCard(props: ProfileCardProps) {
  const { profile } = props;
  if (profile.socialUrl == "" || profile.socialUrl == null) {
    profile.socialUrl = "http://example.com"
  }
  return (
    <Card withBorder={true} w={250} padding="lg">
      <Stack align="center" justify="flex-start" gap="sm">
        <Avatar src={profile.avatar} size={50} />
        <Text size="lg" fw={700} ta="center">{profile.displayName} </Text>
        <Text size="lg">{profile.membership}</Text>
        <QRCode value={profile.socialUrl} size={50} />
      </Stack>
    </Card>
  )
}
