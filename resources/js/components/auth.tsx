import { HTMLAttributes, ReactNode } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useForm } from "react-hook-form";
import { router } from "@inertiajs/react";

export interface LoginFormProps {
  organization_name: string
  organization_logo: string
  errors?: {
    email: string
    password: string
  }
  fake: boolean
}

export interface RegisterFormProps {
  organization_name: string
  organization_logo: string
  errors?: {
    name: string
    email: string
    password: string
    password_confirmation: string
  }
  fake: boolean
}

function handleLogin(e) {
  router.post(route('login'), e)
}

function handleRegister(e) {
  router.post(route('register'), e)
}

export function LoginForm(props: LoginFormProps) {
  const form = useForm();
  const emailError = props.errors?.email;
  const passwordError = props.errors?.password;

  return (
    <Card>
      <CardHeader>
        <div>
          <img className="m-auto h-14" src={props.organization_logo} />
          <div className="font-bold text-xl text-center mt-2">Sign in to {props.organization_name}</div>
        </div>
      </CardHeader>
      <CardContent>
        {emailError ? <div className="text-red-500 text-sm">{emailError}</div> : null}
        {passwordError ? <div className="text-red-500 text-sm">{passwordError}</div> : null}
        <form onSubmit={props.fake ? () => { } : form.handleSubmit(handleLogin)}>
          <div className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                required
                {...form.register('email')}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required {...form.register('password')} />
            </div>
            <Button type="submit" className="w-full rounded-full mt-5">
              Sign in
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <a href={route("register")} className="underline underline-offset-4">
              Sign up
            </a>
          </div>
        </form>
      </CardContent>

    </Card>
  )
}

export function RegisterForm(props: RegisterFormProps) {
  const form = useForm();
  const nameError = props.errors?.name;
  const emailError = props.errors?.email;
  const passwordError = props.errors?.password;
  const passwordConfirmationError = props.errors?.password_confirmation;
  return (
    <Card>
      <CardHeader>
        <div>
          <img className="m-auto h-14" src={props.organization_logo} />
          <div className="font-bold text-xl text-center mt-2">Sign up to {props.organization_name}</div>
        </div>
      </CardHeader>
      <CardContent>
        {nameError ? <div className="text-red-500 text-sm">{nameError}</div> : null}
        {emailError ? <div className="text-red-500 text-sm">{emailError}</div> : null}
        {passwordError ? <div className="text-red-500 text-sm">{passwordError}</div> : null}
        {passwordConfirmationError ? <div className="text-red-500 text-sm">{passwordConfirmationError}</div> : null}
        <form onSubmit={props.fake ? () => { } : form.handleSubmit(handleRegister)}>
          <div className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                required
                {...form.register('name')}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                required
                {...form.register('email')}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required {...form.register('password')} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password_confirmation">Confirm Password</Label>
              <Input id="password_confirmation" type="password" required {...form.register('password_confirmation')} />
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
