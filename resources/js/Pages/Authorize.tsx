import { Head, useForm } from '@inertiajs/react'
import { Button, Card, Center, Grid, List, MantineProvider, SimpleGrid, Title } from '@mantine/core'

interface PageProps {
  client: { id: string, name: string },
  user: object,
  scopes: { description: string }[],
  request: { state: any },
  authToken: string,
  csrfToken: string
};

export default function Authorize(props: PageProps) {
  let { client, user, scopes, request, authToken, csrfToken } = props

  return (
    <MantineProvider>
      <Head title="Authorize" />
      <Center>
        <Card>
          <Title>Legoom ID</Title>
          <br />

          <p>The application <strong>{client.name}</strong> will be able to: </p>
          <br />

          <List>
            {scopes.map(scope => {
              return <List.Item> {scope.description} </List.Item>
            })}
          </List>

          <form method="post" action={route('passport.authorizations.approve')}>
            <input type="hidden" name="_token" value={csrfToken} />
            <input type="hidden" name="client_id" value={client.id} />
            <input type="hidden" name="auth_token" value={authToken} />
            <input type="hidden" name="state" value={request.state} />
            <SimpleGrid cols={2}>
              <Button fullWidth formAction={route('passport.authorizations.approve')} color="blue" type="submit">Authorize</Button>
              <Button fullWidth formAction={route('passport.authorizations.approve')} color="red" type="submit">Cancel</Button>
            </SimpleGrid>
          </form>
        </Card>
      </Center>

    </MantineProvider>
  )
}
