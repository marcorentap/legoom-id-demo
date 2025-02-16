import { HTMLAttributes, ReactNode, useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useForm } from "react-hook-form";
import { router } from "@inertiajs/react";
import { Upload } from "lucide-react";

export interface AccountFormProps {
  name: string
  email: string
  errors?: {
    name: string
    email: string
  }
}

export interface PasswordFormProps {
  name: string
  email: string
  errors?: {
    password: string
    password_confirmation: string
    current_password: string
  }
}

export interface ProfileFormProps {
  display_name: string
  social_url: string
  profile_picture: string
  errors?: {
    social_url: string
    display_name: string
    profile_picture: string
  }
}

export function AccountForm(props: AccountFormProps) {
  const form = useForm();
  const nameError = props.errors?.name;
  const emailError = props.errors?.email;

  const onSubmit = function(data, e) {
    let values = form.getValues()
    form.reset()
    router.post(route('user.settings.account.info'), values)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Information</CardTitle>
      </CardHeader>
      <CardContent>
        {nameError ? <div className="text-red-500 text-sm">{nameError}</div> : null}
        {emailError ? <div className="text-red-500 text-sm">{emailError}</div> : null}
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder={props.name}
                {...form.register('name')}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder={props.email}
                {...form.register('email')}
              />
            </div>
            <div>
              <Button type="submit" className="rounded-full mt-5">
                Update
              </Button>
            </div>
          </div>
        </form>
      </CardContent>

    </Card>
  )
}


export function PasswordForm(props: PasswordFormProps) {
  const form = useForm();
  const currentPasswordError = props.errors?.current_password;
  const passwordConfirmationError = props.errors?.password_confirmation;
  const passwordError = props.errors?.password;

  const onSubmit = function(data, e) {
    let values = form.getValues()
    form.reset()
    router.post(route('user.settings.account.password'), values)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Password</CardTitle>
      </CardHeader>
      <CardContent>
        {currentPasswordError ? <div className="text-red-500 text-sm">{currentPasswordError}</div> : null}
        {passwordError ? <div className="text-red-500 text-sm">{passwordError}</div> : null}
        {passwordConfirmationError ? <div className="text-red-500 text-sm">{passwordConfirmationError}</div> : null}

        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label htmlFor="current_password">Current Password</Label>
              <Input
                id="current_password"
                type="password"
                {...form.register('current_password')}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">New Password</Label>
              <Input
                id="password"
                type="password"
                {...form.register('password')}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password_confirmation">Confirm Password</Label>
              <Input
                id="password_confirmation"
                type="password"
                {...form.register('password_confirmation')}
              />
            </div>
            <div>
              <Button type="submit" className="rounded-full mt-5">
                Update
              </Button>
            </div>
          </div>
        </form>
      </CardContent>

    </Card>
  )
}


export function ProfileForm(props: ProfileFormProps) {
  const form = useForm();
  const displayNameError = props.errors?.display_name;
  const socialUrlError = props.errors?.social_url;
  const profilePictureError = props.errors?.profile_picture;
  const [filename, setFilename] = useState<string | null>(null)

  const onSubmit = function(data, e) {
    let values = form.getValues()
    let profilePicture = values.profile_picture[0]
    let upload = { ...values, profile_picture: profilePicture ? profilePicture : null }
    router.post(route('user.settings.profile'), upload)
  }


  return (
    <Card>
      <CardHeader>
        <CardTitle>Password</CardTitle>
      </CardHeader>
      <CardContent>
        {displayNameError ? <div className="text-red-500 text-sm">{displayNameError}</div> : null}
        {socialUrlError ? <div className="text-red-500 text-sm">{socialUrlError}</div> : null}
        {profilePictureError ? <div className="text-red-500 text-sm">{profilePictureError}</div> : null}

        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label htmlFor="display_name">Display Name</Label>
              <Input
                id="display_name"
                placeholder={props.display_name}
                {...form.register('display_name')}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="social_url">Social URL</Label>
              <Input
                id="social_url"
                placeholder={props.social_url}
                {...form.register('social_url')}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="profile_picture">Profile Picture</Label>
              <div className="relative border-4 border-dotted p-1 rounded-md">
                <Input
                  id="profile_picture"
                  type="file"
                  {...form.register('profile_picture', {
                    onChange: (e) => {
                      const file = e.target.files?.[0]
                      setFilename(file.name)
                    }
                  })}
                  className="absolute inset-0 full h-full opacity-0 cursor-pointer"
                />
                <Upload className="m-auto" />
                <div className="m-auto text-center font-semibold">Upload Picture</div>
                <div className="m-auto text-center text-sm">{filename ? filename : "Click or drag a file here"}</div>
              </div>
            </div>
            <div>
              <Button type="submit" className="rounded-full mt-5">
                Update
              </Button>
            </div>
          </div>
        </form>
      </CardContent>

    </Card>
  )
}

