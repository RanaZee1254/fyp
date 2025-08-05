import { Head, router, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import InputError from '@/components/input-error';
import AuthLayout from '@/layouts/auth-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import TextLink from '@/components/text-link';
import { LoaderCircle } from 'lucide-react';
import {route} from 'ziggy-js';
type RegisterForm = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  contact_number: string;
  role: string;
};
export default function Register() {
  const { data, setData, processing, errors, reset } = useForm<RegisterForm>({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    contact_number: '',
    role: '',
  });
  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    console.log('Submitting data:', data);
    // console.log('Available route:', route('register'));
   router.post(route('register'), data, {
     onFinish: () => reset('password', 'password_confirmation'),
   });
  };
  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const role = e.target.value;
    setData('role', role);
  };
  return (
    <AuthLayout
      title="Create an account"
      description="Enter your details below to create your account"
    >
      <Head title="Register" />
      <form className="flex flex-col gap-6" onSubmit={submit}>
        <div className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="name">Name (Student, School, Shop)</Label>
            <Input
              id="name"
              type="text"
              required
              autoFocus
              tabIndex={1}
              autoComplete="name"
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
              disabled={processing}
              placeholder="Full name"
            />
            <InputError message={errors.name} className="mt-2" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              type="email"
              required
              tabIndex={2}
              autoComplete="email"
              value={data.email}
              onChange={(e) => setData('email', e.target.value)}
              disabled={processing}
              placeholder="email@example.com"
            />
            <InputError message={errors.email} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              tabIndex={3}
              autoComplete="new-password"
              value={data.password}
              onChange={(e) => setData('password', e.target.value)}
              disabled={processing}
              placeholder="Password"
            />
            <InputError message={errors.password} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password_confirmation">Confirm password</Label>
            <Input
              id="password_confirmation"
              type="password"
              required
              tabIndex={4}
              autoComplete="new-password"
              value={data.password_confirmation}
              onChange={(e) =>
                setData('password_confirmation', e.target.value)
              }
              disabled={processing}
              placeholder="Confirm password"
            />
            <InputError message={errors.password_confirmation} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="contact_number">Contact Number</Label>
            <Input
              id="contact_number"
              type="tel"
              tabIndex={5}
              autoComplete="tel"
              value={data.contact_number}
              onChange={(e) => setData('contact_number', e.target.value)}
              disabled={processing}
              placeholder="Contact Number"
            />
            <InputError message={errors.contact_number} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="account_type">Account Type</Label>
            <select
              id="account_type"
              value={data.role}
              onChange={handleRoleChange}
              disabled={processing}
              className="border px-3 py-2 rounded-md"
              required
            >
              <option value="">Select account type</option>
              <option value="school">School</option>
              <option value="parent">Parent</option>
              <option value="shopkeeper">Shopkeeper</option>
            </select>
            <InputError message={errors.role} />
          </div>
          <Button
            type="submit"
            className="inline-block rounded-sm border bg-blue-500 border-[#19140035] px-5 py-1.5 text-sm leading-normal text-white hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
            tabIndex={6}
            disabled={processing}
          >
            {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
            Create account
          </Button>
          <div className="text-center text-sm text-muted-foreground mt-4">
            Already have an account?{' '}
            <TextLink href={route('login')} tabIndex={7}>
              Log in
            </TextLink>
          </div>
        </div>
      </form>
    </AuthLayout>
  );
}
