import { Head, useForm } from '@inertiajs/react';
import InputError from '@/components/input-error';
import AuthLayout from '@/layouts/auth-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LoaderCircle } from 'lucide-react';
import { route } from 'ziggy-js';
interface ShopForm {
  shop_name: string;
  address: string;
  shop_type: string;
  contact_number: string;
  image: File | null;
  [key: string]: string | File | null | undefined;
}
interface SchoolForm {
  school_name: string;
  address: string;
  reg_no: string;
  affiliation?: string;
  level?: string;
  image: File | null;
  contact_number:string;
  [key: string]: string | File | null | undefined;
}
type Role = 'school' | 'shopkeeper';
type DetailsFormData =
  | (SchoolForm & { type: 'school' })
  | (ShopForm & { type: 'shopkeeper' });
interface Props {
  role: Role;
}
export default function DetailsForm({ role }: Props) {
  const initialData: DetailsFormData =
    role === 'school'
      ? {
          type: 'school',
          school_name: '',
          address: '',
          reg_no: '',
          affiliation: '',
          level: '',
          contact_number: '',
          image: null,
        }
      : {
          type: 'shopkeeper',
          shop_name: '',
          address: '',
          shop_type: '',
          contact_number:'',
          image: null,
        };
  const { data, setData, post, processing, errors, reset } = useForm<DetailsFormData>(initialData);
 const submit = (e: React.FormEvent) => {
  e.preventDefault();
  console.log('Submitting data:', data);
  post(route('details.store'), {
    forceFormData: true,
    onSuccess: () => reset(),
  });
};
  return (
    <AuthLayout title="Add Details" description={`Enter your ${role} details`}>
      <Head title="Add Details" />
      <form onSubmit={submit} className="space-y-6">
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
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={data.address}
                onChange={(e) => setData('address', e.target.value)}
              />
              <InputError message={errors.address} />
            </div>
             <div>
              <Label htmlFor="contact_number">Contact Number</Label>
              <Input
                id="contact_number"
                value={data.contact_number}
                onChange={(e) => setData('contact_number', e.target.value)}
              />
              <InputError message={errors.contact_number} />
            </div>
            <div>
              <Label htmlFor="reg_no">Registration No</Label>
              <Input
                id="reg_no"
                value={typeof data.reg_no === 'string' ? data.reg_no : ''}
                onChange={(e) => setData('reg_no', e.target.value)}
              />
              <InputError message={errors.reg_no} />
            </div>
            <div>
              <Label htmlFor="affiliation">Affiliation</Label>
              <Input
                id="affiliation"
                value={typeof data.affiliation === 'string' ? data.affiliation : ''}
                onChange={(e) => setData('affiliation', e.target.value)}
              />
              <InputError message={errors.affiliation} />
            </div>
            <div>
              <Label htmlFor="level">Level</Label>
              <Input
                id="level"
                value={typeof data.level === 'string' ? data.level : ''}
                onChange={(e) => setData('level', e.target.value)}
              />
              <InputError message={errors.level} />
            </div>
            <div>
              <Label htmlFor="image">School Image</Label>
              <Input
                id="image"
                type="file"
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
                value={typeof data.shop_name === 'string' ? data.shop_name : ''}
                onChange={(e) => setData('shop_name', e.target.value)}
              />
              <InputError message={errors.shop_name} />
            </div>
            <div>
              <Label htmlFor="shop_type">Shop Type</Label>
              <Input
                id="shop_type"
                value={typeof data.shop_type === 'string' ? data.shop_type : ''}
                onChange={(e) => setData('shop_type', e.target.value)}
              />
              <InputError message={errors.shop_type} />
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={data.address ?? ''}
                onChange={(e) => setData('address', e.target.value)}
              />
              <InputError message={errors.address} />
            </div>
             <div>
              <Label htmlFor="contact_number">Contact Number</Label>
              <Input
                id="contact_number"
                value={data.contact_number}
                onChange={(e) => setData('contact_number', e.target.value)}
              />
              <InputError message={errors.contact_number} />
            </div>
            <div>
              <Label htmlFor="image">Shop Image</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={(e) => setData('image', e.target.files?.[0] ?? null)}
              />
              <InputError message={errors.image} />
            </div>
          </>
        )}
        <Button
  type="submit"
  disabled={processing}
  className="bg-blue-600 hover:bg-blue-700 text-white"
>
  {processing ? <LoaderCircle className="animate-spin" /> : 'Submit Details'}
</Button>
      </form>
    </AuthLayout>
  );
}
