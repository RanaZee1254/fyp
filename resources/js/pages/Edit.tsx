import { Head, useForm } from '@inertiajs/react';
import InputError from '@/components/input-error';
import AuthLayout from '@/layouts/auth-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LoaderCircle } from 'lucide-react';
import { route } from 'ziggy-js';
type Role = 'school' | 'shopkeeper';
interface ShopForm {
  shop_name: string;
  address: string;
  shop_type: string;
  contact_number: string;
  image: string | File | null | undefined ;
}
interface SchoolForm {
  school_name: string;
  address: string;
  reg_no: string;
  affiliation?: string;
  level?: string;
  contact_number: string;
  image:string | File | null | undefined;
}
interface Props {
  role: Role;
  profile: Partial<SchoolForm & ShopForm> & { id: number };
  profiles?: { id: number; name: string }[];
  mode?: 'edit'|'update';
}
export function Edit({
  profile,
  profiles,
  role,
  mode,
}: Props) {
  return (
    <DetailsForm
      role={role}
      profile={profile}
      profiles={profiles}
      mode={mode}
    />
  );
}
export default function DetailsForm({ role, profile, mode = 'edit' }: Props) {
const { data, setData, put, processing, errors } = useForm(
  role === 'school'
    ? {
        school_name: profile?.school_name ?? '',
        reg_no: profile?.reg_no ?? '',
        address: profile?.address ?? '',
        contact_number: profile?.contact_number ?? '',
        affiliation: profile?.affiliation ?? '',
        level: profile?.level ?? '',
        image: null as File | null,
      }
    : {
        shop_name: profile?.shop_name ?? '',
        shop_type: profile?.shop_type ?? '',
        address: profile?.address ?? '',
        contact_number: profile?.contact_number ?? '',
        image: null as File | null,
      }
);
  const submit = (e: React.FormEvent) => {
  e.preventDefault();
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      formData.append(key, value);
    }
  });  
  console.log("FormData entries:", [...formData.entries()]);
  put(route('details.update', profile.id),{
    forceFormData: true,
  });
  };
  return (
    <AuthLayout title="Manage Details" description={`Manage your ${role} details`}>
      <Head title="Manage Details" />
      <form onSubmit={submit} className="space-y-6,space-x-6">
        {role === 'school' && (
          <>
            <div>
              <Label htmlFor="school_name">School Name</Label>
              <Input
                id="school_name"
                value={typeof data.school_name === 'string' ? data.school_name : ''}
                onChange={(e) => setData('school_name', e.target.value)}
              />
              <InputError message={errors.school_name} />
            </div>
            <div>
              <Label htmlFor="reg_no">Registration No</Label>
              <Input
                id="reg_no"
                autoComplete="off"
                 value={data.reg_no ?? ''}
                 onChange={(e) => setData('reg_no', e.target.value)}
                 />
              <InputError message={errors.reg_no} />
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                  autoComplete="street-address"
                    value={data.address ?? ''}
                      onChange={(e) => setData('address', e.target.value)}
                      />
              <InputError message={errors.address} />
            </div>
            <div>
              <Label htmlFor="contact_number">Contact Number</Label>
              <Input
                id="contact_number"
                  autoComplete="tel"
                    value={data.contact_number ?? ''}
                      onChange={(e) => setData('contact_number', e.target.value)}
                      />
              <InputError message={errors.contact_number} />
            </div>
            <div>
              <Label htmlFor="affiliation">Affiliation</Label>
              <Input
                id="affiliation"
                autoComplete="organization-title"
                value={data.affiliation ?? ''}
                onChange={(e) => setData('affiliation', e.target.value)}
                />
              <InputError message={errors.affiliation} />
            </div>
            <div>
              <Label htmlFor="level">Level</Label>
              <Input
              id="level"
              autoComplete="off"
              value={data.level ?? ''}
              onChange={(e) => setData('level', e.target.value)}
              />
              <InputError message={errors.level} />
            </div>
            <div>
              <Label htmlFor="image">School Image</Label>
              <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
    if (e.target.files?.[0]) {
      setData("image", e.target.files[0]);
    } else {
      setData("image", null);
    }
  }}
/>
<InputError message={errors.image} />
            </div>
          </>
        )}
        {role === 'shopkeeper' && (
          <>
            <div>
              <Label htmlFor="shop_name">Shop Name</Label>
              <Input
              id="shop_name"
               autoComplete="organization"
               value={data.shop_name ?? ''}
               onChange={(e) => setData('shop_name', e.target.value)}
               />
              <InputError message={errors.shop_name} />
            </div>
            <div>
              <Label htmlFor="shop_type">Shop Type</Label>
              <Input
              id="shop_type"
              autoComplete="off"
              value={data.shop_type ?? ''}
              onChange={(e) => setData('shop_type', e.target.value)}
              />
              <InputError message={errors.shop_type} />
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
              id="address"
              autoComplete="street-address"
              value={data.address ?? ''}
              onChange={(e) => setData('address', e.target.value)}
              />
              <InputError message={errors.address} />
            </div>
            <div>
              <Label htmlFor="contact_number">Contact Number</Label>
              <Input
              id="contact_number"
              autoComplete="tel"
              value={data.contact_number ?? ''}
              onChange={(e) => setData('contact_number', e.target.value)}
              />
              <InputError message={errors.contact_number} />
            </div>
            <div>
              <Label htmlFor="image">Shop Image</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setData("image", e.target.files[0]);
                  } else {
                    setData("image",null);
                  }
                }}
              />           
              <InputError message={errors.image} />
            </div>
          </>
        )}
        <div className="flex flex-col gap-4">
           <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white" disabled={processing}>
            {processing ? <LoaderCircle className="animate-spin" /> : mode === 'edit' ? 'Update' : 'Update'}
          </Button>
        </div>
      </form>
    </AuthLayout>
  );
}
