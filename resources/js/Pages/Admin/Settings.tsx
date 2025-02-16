import { UserTable } from "@/components/admin/user"
import { LoginForm, RegisterForm } from "@/components/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import AdminDashboardLayout from "@/Layouts/AdminDashboardLayout"
import { Head, router } from "@inertiajs/react"
import { ColumnDef } from "@tanstack/react-table"
import { Upload } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"


export interface SettingsProps {
  organization_name: string
  organization_logo: string
  profile_picture: string
  errors?: {
    organization_name: string
    organization_logo: string
  }
  settings: Record<string, string>[]
}

export default function Settings(props: SettingsProps) {
  const form = useForm()
  const [filename, setFilename] = useState<string | null>(null);

  const onSubmit = function(data, e) {
    let values = form.getValues()
    form.reset()
    router.post(route('admin.settings.update'), values)
  }

  return (
    <>
      <Head title="Platform Settings" />
      <AdminDashboardLayout title='Settings' {...props}>
        <div className="max-w-xl">
          <Card className="p-5 mb-5">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="organization_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Organization Name</FormLabel>
                      <FormControl>
                        <Input placeholder={props.organization_name} {...field} value={field.value ?? ''} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="organization_logo"
                  render={({ field: { onChange, ref } }) => (
                    <FormItem>
                      <FormLabel>Organization Logo</FormLabel>
                      <FormControl>
                        <div className="relative border-4 border-dotted p-1 rounded-md">
                          <Input type="file"
                            onChange={(e) => {
                              if (e.target.files) {
                                const file = e.target.files[0]
                                if (file) {
                                  onChange(file);
                                  setFilename(file.name);
                                }
                              }
                            }}
                            ref={ref}
                            className="absolute inset-0 full h-full opacity-0 cursor-pointer"
                          />
                          <Upload className="m-auto" />
                          <div className="m-auto text-center font-semibold">Upload Picture</div>
                          <div className="m-auto text-center text-sm">{filename ? filename : "Click or drag a file here"}</div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button className="mt-5" type="submit">
                  Submit
                </Button>
              </form>
            </Form>
          </Card>
          <div className="text-xl font-semibold mb-1">Preview</div>
          <div className="grid gap-5">
            <LoginForm organization_name={props.organization_name} organization_logo={props.organization_logo} fake={true} />
            <RegisterForm organization_name={props.organization_name} organization_logo={props.organization_logo} fake={true} />
          </div>
        </div>
      </AdminDashboardLayout>
    </>
  )
}

