import PrimaryButton from '@/Components/PrimaryButton';
import { Head, useForm } from '@inertiajs/react'
import { Button, MantineProvider, Title } from '@mantine/core'
import { FormEventHandler } from 'react';
interface PageProps {
  client: {id: string},
  user: object,
  scopes: { description: string }[],
  request: { state: any},
  authToken: string,
  csrfToken: string
};

export default function Authorize(props: PageProps) {
  let { client, user, scopes, request, authToken, csrfToken } = props

  return (
    <MantineProvider>
      <Head title="authorize" />
      <Title> Legoom App</Title>
      <br />

      <p><strong>This application will be able to:</strong></p>

      <ul>
        {scopes.map(scope => {
          return <li> {scope.description} </li>
        })}
      </ul>

      <form method="post" action={route('passport.authorizations.approve')}>
        <input type="hidden" name="_token" value={csrfToken} />
        <input type="hidden" name="client_id" value={client.id} />
        <input type="hidden" name="auth_token" value={authToken} />
        <input type="hidden" name="state" value={request.state} />
        <PrimaryButton color="blue">Authorize</PrimaryButton>
      </form>
      <form method="post" action={route('passport.authorizations.deny')}>
        <input type="hidden" name="_token" value={csrfToken} />
        <input type="hidden" name="client_id" value={client.id} />
        <input type="hidden" name="auth_token" value={authToken} />
        <input type="hidden" name="state" value={request.state} />
        <Button color="red">Cancel</Button>
      </form>

    </MantineProvider>
  )
}
