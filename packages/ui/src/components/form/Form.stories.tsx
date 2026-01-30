import type { Meta, StoryObj } from "@storybook/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "./Form";
import { Input } from "../input/Input";
import { Button } from "../button/Button";
import { Checkbox } from "../checkbox/Checkbox";
import { formVariants } from "./Form.variants";

// Wrapper to allow styling of the <form> itself within the story
const FormWrapper = ({
  className,
  children,
  ...props
}: React.FormHTMLAttributes<HTMLFormElement>) => {
  return (
    <form className={formVariants({ className })} {...props}>
      {children}
    </form>
  );
};

const meta: Meta<typeof FormWrapper> = {
  title: "Components/Form",
  component: FormWrapper,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof FormWrapper>;

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  rememberMe: z.boolean(),
});

const ProfileForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      rememberMe: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    alert(JSON.stringify(values, null, 2));
    console.log(values);
  }

  return (
    <Form {...form}>
      <Form.Base
        onSubmit={(e) => {
          form.handleSubmit(onSubmit)(e);
        }}
        className="w-[400px]"
      >
        <Form.Controller
          control={form.control}
          name="username"
          render={({ field }) => (
            <Form.Item>
              <Form.Controller.Label>Username</Form.Controller.Label>
              <Form.Controller.Field>
                <Input placeholder="shadcn" {...field} />
              </Form.Controller.Field>
              <Form.Controller.Description>
                This is your public display name.
              </Form.Controller.Description>
              <Form.Controller.Message />
            </Form.Item>
          )}
        />
        <Form.Controller
          control={form.control}
          name="email"
          render={({ field }) => (
            <Form.Item>
              <Form.Controller.Label>Email</Form.Controller.Label>
              <Form.Controller.Field>
                <Input placeholder="hello@example.com" {...field} />
              </Form.Controller.Field>
              <Form.Controller.Message />
            </Form.Item>
          )}
        />
        <Form.Controller
          control={form.control}
          name="rememberMe"
          render={({ field }) => (
            <Form.Item className="flex flex-row items-start space-x-3 space-y-0 text-left">
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
              <div className="space-y-1 leading-none">
                <Form.Controller.Label>Remember me</Form.Controller.Label>
                <Form.Controller.Description>
                  You can manage your device settings in the dashboard.
                </Form.Controller.Description>
              </div>
            </Form.Item>
          )}
        />
        <Button type="submit">Submit</Button>
      </Form.Base>
    </Form>
  );
};

export const WithZodValidation: Story = {
  render: () => <ProfileForm />,
};
