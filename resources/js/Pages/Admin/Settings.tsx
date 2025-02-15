import { UserTable } from "@/components/admin/user"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import AdminDashboardLayout from "@/Layouts/AdminDashboardLayout"
import { router } from "@inertiajs/react"
import { ColumnDef } from "@tanstack/react-table"
import { useForm } from "react-hook-form"


export interface SettingsProps {
  errors: {
    organization_name: string
    organization_logo: string
  }
  settings: Record<string, string>[]
}

export default function Settings(props: SettingsProps) {
  const form = useForm()
  let platformName = props.settings["name"]
  let logo = props.settings["logo"]

  console.log(JSON.stringify(props.settings))
  console.log(JSON.stringify(props.errors))

  const onSubmit = function(data, e) {
    let values = form.getValues()
    form.reset()
    router.post(route('admin.settings.update'), values)
  }

  return (
    <AdminDashboardLayout title='Settings'>
      <div className="max-w-xl">
        <Card className="p-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="organization_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Organization Name</FormLabel>
                    <FormControl>
                      <Input placeholder={platformName} {...field} value={field.value ?? ''} />
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
                          onChange={(e) => onChange(e.target.files[0])}
                          ref={ref}
                          className="absolute inset-0 full h-full opacity-0"
                        />
                        <div className="m-auto text-center">Upload picture</div>
                        <div className="m-auto text-center">Click or drag a file here</div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="mt-2" type="submit">
                Submit
              </Button>
            </form>
          </Form>
        </Card>
      </div>
    </AdminDashboardLayout>
  )
}

