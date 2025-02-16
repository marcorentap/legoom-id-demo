import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { Avatar } from "./ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { CircleUser } from "lucide-react"

export interface ProfileCardProps {
  name: string
  email: string
  display_name: string
  social_url: string
  profile_picture: string
  membership: string
}

export default function ProfileCard(props: ProfileCardProps) {
  return (
    <Card >
      <CardHeader>
      </CardHeader>
      <CardContent>
        <div>
          <Avatar className="h-20 w-20 m-auto">
            <AvatarImage src={props.profile_picture} className="h-full w-full object-cover" />
            <AvatarFallback className="h-full w-full object-cover"><CircleUser className="h-full w-full"/></AvatarFallback>
          </Avatar>
        </div>
        <div className="text-center font-bold">{props.display_name}</div>
        <div className="text-center font-bold">{props.membership}</div>
        <div className="text-center">{props.social_url}</div>
      </CardContent>
    </Card>
  )
}
