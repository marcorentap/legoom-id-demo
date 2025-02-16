import { HTMLAttributes, ReactNode } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export interface LoginFormProps {
  organization_name: string
  organization_logo: string
}

export interface RegisterFormProps {
  organization_name: string
  organization_logo: string
}

export function LoginForm(props: LoginFormProps) {
  return (
    <Card>
      <CardHeader>
        <div>
          <img className="m-auto h-14" src={props.organization_logo} />
          <div className="font-bold text-xl text-center mt-2">Sign in to {props.organization_name}</div>
        </div>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full rounded-full mt-5">
              Sign in
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <a href="#" className="underline underline-offset-4">
              Sign up
            </a>
          </div>
        </form>
      </CardContent>

    </Card>
  )
}

export function RegisterForm(props: RegisterFormProps) {
  return (
    <Card>
      <CardHeader>
        <div>
          <img className="m-auto h-14" src={props.organization_logo} />
          <div className="font-bold text-xl text-center mt-2">Sign up to {props.organization_name}</div>
        </div>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="name"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm_password">Confirm Password</Label>
              <Input id="confirm_password" type="password" required />
            </div>
            <Button type="submit" className="w-full rounded-full mt-5">
              Sign up
            </Button>
          </div>
        </form>
      </CardContent>

    </Card>
  )
}
