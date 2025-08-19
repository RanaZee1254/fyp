import { Head, useForm } from '@inertiajs/react';
import InputError from '@/components/input-error';
import AuthLayout from '@/layouts/auth-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LoaderCircle } from 'lucide-react';
import { route } from 'ziggy-js';
import { useState } from 'react';
type Role = 'school' | 'shopkeeper';
interface ShopForm {
  shop_name: string;
  address: string;
  shop_type: string;
  contact_number: string;
  image: File | null;
}
interface SchoolForm {
  school_name: string;
  address: string;
  reg_no: string;
  affiliation?: string;
  level?: string;
  contact_number: string;
  image: File | null;
}
interface Props {
  role: Role;
  profile: Partial<SchoolForm & ShopForm> & { id: number };
  profiles?: { id: number; name: string }[];
  mode?: 'edit';
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
export default function DetailsForm({ role, profile, profiles = [], mode = 'edit' }: Props) {
  const [selectedProfileId, setSelectedProfileId] = useState<number | null>(null);
  const [selectedDeleteId, setSelectedDeleteId] = useState<number | null>(null);
  const { data, setData, post, put, delete: destroy, processing, errors } = useForm({
    school_name: profile?.school_name ?? '',
    shop_name: profile?.shop_name ?? '',
    reg_no: profile?.reg_no ?? '',
    address: profile?.address ?? '',
    contact_number: profile?.contact_number ?? '',
    shop_type: profile?.shop_type ?? '',
    affiliation: profile?.affiliation ?? '',
    level: profile?.level ?? '',
    image: profile?.image ?? null,
  });
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'edit' && profile?.id) {
      put(route('details.update', profile.id), { forceFormData: true });
    } else {
      post(route('details.store'), { forceFormData: true });
    }
  };
  return (
    <AuthLayout title="Manage Details" description={`Manage your ${role} details`}>
      <Head title="Manage Details" />
      <form onSubmit={submit} className="space-y-6,space-x-6">
        {role === 'school' && (
          <>
          {mode === 'edit' && profiles.length > 0 && (
            <div className="flex items-center gap-3 border">
              <select
                className="border rounded p-2"
                value={selectedProfileId ?? ''}
                onChange={(e) => {
                  const id = Number(e.target.value);
                  setSelectedProfileId(id);
                  if (id) {
                    window.location.href = route('details.edit', id);
                  }
                }}
              >
                <option value="">Select {role} to edit</option>
                {profiles.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
          )}
            <div>
              <Label htmlFor="school_name">School Name</Label>
              <Input
              id="school_name"
               autoComplete="organization"
            value={data.school_name ?? ''}
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
              id="image"
              type="file"
              autoComplete="off"
              accept="image/*"
              onChange={(e) => setData('image', e.target.files?.[0] ?? null)}
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
              id="image"
              type="file"
              autoComplete="off"
              accept="image/*"
              onChange={(e) => setData('image', e.target.files?.[0] ?? null)}
              />
              <InputError message={errors.image} />
            </div>
          </>
        )}
        <div className="flex flex-col gap-4">
           <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white" disabled={processing}>
            {processing ? <LoaderCircle className="animate-spin" /> : mode === 'edit' ? 'Update' : 'Add'}
          </Button>
          {mode === 'edit' && profiles.length > 0 && (
            <div className="flex items-center gap-3">
              <select
                className="border rounded p-2"
                value={selectedDeleteId ?? ''}
                onChange={(e) => setSelectedDeleteId(Number(e.target.value))}
              >
                <option value="">Select {role} to delete</option>
                {profiles.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
              <Button
                type="button"
                variant="destructive"
                disabled={processing || !selectedDeleteId}
                onClick={() => {
                  if (selectedDeleteId && confirm('Are you sure you want to delete this profile?')) {
                    destroy(route('details.destroy', selectedDeleteId));
                  }
                }}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                {processing ? <LoaderCircle className="animate-spin" /> : 'Delete'}
              </Button>
            </div>
          )}
        </div>
      </form>
    </AuthLayout>
  );
}
