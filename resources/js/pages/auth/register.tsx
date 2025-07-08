import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import InputError from '@/components/input-error';
import AuthLayout from '@/layouts/auth-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import TextLink from '@/components/text-link';
import { LoaderCircle } from 'lucide-react';
type RegisterForm = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  Contact_Number: string;
  Address:string;
  Image:string | File;
  role: string;
  // Guardian-specific
  student_name?: string;
  student_age?: string;
  student_class?: string;
  // School-specific
  school_reg_no?: string;
  affiliation?: string;
  level?: string;
  // Shopkeeper-specific
  shop_type?: string;
};
export default function Register() {
  const { data, setData, post, processing, errors, reset } = useForm<RegisterForm>({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    Contact_Number: '',
    role: '',
    student_name: '',
    student_age: '',
    student_class: '',
    school_reg_no: '',
    affiliation: '',
    shop_type: '',
    level: '',
    Address: '',
    Image:'',
  });
  const submit: FormEventHandler = (e) => {
  e.preventDefault();
  let registerRoute: string;
  switch (data.role) {
  case 'school':
  case 'guardians':
  case 'shopkeeper':
    registerRoute = route('register');
    break;
  default:
    registerRoute = route('register');
    break;
}
  post(registerRoute, {
    onFinish: () => reset('password', 'password_confirmation'),
  });
};
  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const role = e.target.value;
    setData('role', role);
    if (role === 'guardians') {
      setData('student_name', '');
      setData('student_age', '');
      setData('student_class', '');
    }
    if (role === 'school') {
      setData('school_reg_no', '');
      setData('affiliation', '');
      setData('level', '');
    }
    if (role === 'shopkeeper') {
      setData('shop_type', '');
    }
  };
  return (
    <AuthLayout
      title="Create an account"
      description="Enter your details below to create your account"
    >
      <Head title="Register" />
      <form className="flex flex-col gap-6" onSubmit={submit}>
        <div className="grid gap-6">
          {/* Name */}
          <div className="grid gap-2">
            <Label htmlFor="name">Name(Student, School, Shop)</Label>
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
          {/* Email */}
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
          {/* Password */}
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
          {/* Confirm Password */}
          <div className="grid gap-2">
            <Label htmlFor="password_confirmation">Confirm password</Label>
            <Input
              id="password_confirmation"
              type="password"
              required
              tabIndex={4}
              autoComplete="new-password"
              value={data.password_confirmation}
              onChange={(e) => setData('password_confirmation', e.target.value)}
              disabled={processing}
              placeholder="Confirm password"
            />
            <InputError message={errors.password_confirmation} />
          </div>
          {/* Contact Number */}
          <div className="grid gap-2">
            <Label htmlFor="Contact_Number">Contact Number</Label>
            <Input
              id="Contact_Number"
              type="tel"
              tabIndex={5}
              autoComplete="tel"
              value={data.Contact_Number}
              onChange={(e) => setData('Contact_Number', e.target.value)}
              disabled={processing}
              placeholder="Contact Number"
            />
            <InputError message={errors.Contact_Number} />
          </div>
          {/* Address */}
          <div className="grid gap-2">
            <Label htmlFor="Address">Address</Label>
            <Input
              id="Address"
              type="text"
              tabIndex={6}
              autoComplete="text"
              value={data.Address}
              onChange={(e) => setData('Address', e.target.value)}
              disabled={processing}
              placeholder="Address"
            />
            <InputError message={errors.Address} />
          </div>
           {/* Image*/}
          <div className="grid gap-2">
            <Label htmlFor="Image">Image</Label>
            <Input
              id="image"
              type="file"
              tabIndex={6}
              autoComplete=" "
              onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
             setData('Image', e.target.files[0]);
               }
             }}
              disabled={processing}
              placeholder="Image"
            />
            <InputError message={errors.Image} />
          </div>
          {/* Role */}
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
              <option value="guardians">Guardians</option>
              <option value="shopkeeper">Shopkeeper</option>
            </select>
            <InputError message={errors.role} />
          </div>
          {/* Guardian-specific Fields */}
          {data.role === 'guardians' && (
            <>
              <div className="grid gap-2">
                <Label htmlFor="student_name">Student Name</Label>
                <Input
                  id="student_name"
                  type="text"
                  value={data.student_name}
                  onChange={(e) => setData('student_name', e.target.value)}
                  disabled={processing}
                  placeholder="Student's full name"
                />
                <InputError message={errors.student_name} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="student_age">Student Age</Label>
                <Input
                  id="student_age"
                  type="number"
                  value={data.student_age}
                  onChange={(e) => setData('student_age', e.target.value)}
                  disabled={processing}
                  placeholder="Student's age"
                />
                <InputError message={errors.student_age} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="student_class">Student Class</Label>
                <Input
                  id="student_class"
                  type="text"
                  value={data.student_class}
                  onChange={(e) => setData('student_class', e.target.value)}
                  disabled={processing}
                  placeholder="e.g. Grade 5"
                />
                <InputError message={errors.student_class} />
              </div>
            </>
          )}
          {/* School-specific Fields */}
          {data.role === 'school' && (
            <>
              <div className="grid gap-2">
                <Label htmlFor="school_reg_no">School Reg. Number</Label>
                <Input
                  id="school_reg_no"
                  type="text"
                  value={data.school_reg_no}
                  onChange={(e) => setData('school_reg_no', e.target.value)}
                  disabled={processing}
                  placeholder="Registration number"
                />
                <InputError message={errors.school_reg_no} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="affiliation">Affiliation</Label>
                <Input
                  id="affiliation"
                  type="text"
                  value={data.affiliation}
                  onChange={(e) => setData('affiliation', e.target.value)}
                  disabled={processing}
                  placeholder="Board or Affiliation"
                />
                <InputError message={errors.affiliation} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="level">Level</Label>
                <Input
                  id="level"
                  type="text"
                  value={data.level}
                  onChange={(e) => setData('level', e.target.value)}
                  disabled={processing}
                  placeholder="Primary, Secondary, etc."
                />
                <InputError message={errors.level} />
              </div>
            </>
          )}
          {data.role === 'shopkeeper' && (
              <div className="grid gap-2">
                 <Label htmlFor="shop_type">Shop Type</Label>
                <select
                 id="shop_type"
                  value={data.shop_type}
                  onChange={(e) => setData('shop_type', e.target.value)}
                  disabled={processing}
                  className="border px-3 py-2 rounded-md"
                   required
                >
                  <option value="">Select shop type</option>
                  <option value="bookshop">Bookshop</option>
                  <option value="shoe_shop">Shoe Shop</option>
                  <option value="uniform_shop">Uniform Shop</option>
                </select>
                <InputError message={errors.shop_type} />
              </div>
                  )}
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
            </form>
        </AuthLayout>
    );
}