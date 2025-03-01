import { usePage } from '@inertiajs/react';
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { CircleUser } from 'lucide-react';
import { Avatar } from './ui/avatar';
import { Card, CardContent, CardHeader } from './ui/card';

export default function ProfileCard(props: ProfileCardProps) {
    const { user } = usePage().props;
    return (
        <Card>
            <CardHeader></CardHeader>
            <CardContent>
                <div>
                    <Avatar className="m-auto h-20 w-20">
                        <AvatarImage
                            src={user.profile.profile_picture}
                            className="h-full w-full object-cover"
                        />
                        <AvatarFallback className="h-full w-full object-cover">
                            <CircleUser className="h-full w-full" />
                        </AvatarFallback>
                    </Avatar>
                </div>
                <div className="text-center font-bold">
                    {user.profile.display_name}
                </div>
                <div className="text-center font-bold">
                    {user.membership.name}
                </div>
                <div className="text-center">{user.profile.social_url}</div>
            </CardContent>
        </Card>
    );
}
