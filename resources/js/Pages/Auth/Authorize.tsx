import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import AuthenticationLayout from '@/Layouts/AuthenticationLayout'
import { Info } from 'lucide-react';

interface AuthorizePageProps {
  organization_logo: string,
  organization_name: string,
  application_name: string,
  client: { id: string, name: string },
  user: object,
  scopes: { description: string }[],
  request: { state: any },
  authToken: string,
  csrfToken: string
};

function AuthorizationForm(props: AuthorizePageProps) {
  let { client, user, scopes, request, authToken, csrfToken } = props
  return (
    <Card>
      <CardHeader>
        <div>
          <img className="m-auto h-14" src={props.organization_logo} />
          <div className="font-bold text-xl text-center mt-2">Authorize with {props.organization_name}</div>
        </div>
      </CardHeader>
      <CardContent>
        <div><span className='font-bold'>{props.client.name}</span> will be able to: </div>

        {scopes.map(scope => {
          return (
            <div className='flex'>
              <Info className='w-4 mr-1' />
              <div>{scope.description}</div>
            </div>
          )
        })}
      </CardContent>
      <form method="post">
        <input type="hidden" name="_token" value={csrfToken} />
        <input type="hidden" name="client_id" value={client.id} />
        <input type="hidden" name="auth_token" value={authToken} />
        <input type="hidden" name="state" value={request.state} />

        <CardFooter className='flex gap-5'>
          <Button className="w-full" formAction={route('passport.authorizations.approve')}>Authorize</Button>
          <Button variant='destructive' className="w-full" formAction={route('passport.authorizations.deny')}>Deny</Button>
        </CardFooter>
      </form>
    </Card>
  )
}

export default function Authorize(props: AuthorizePageProps) {
  let { client, user, scopes, request, authToken, csrfToken } = props

  return (
    <AuthenticationLayout>
      <AuthorizationForm {...props} />
    </AuthenticationLayout>
  )
}
