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
  image: string | File;
  [key: string]: string | File | undefined;
}
interface SchoolForm {
  reg_no: string;
  affiliation?: string;
  level?: string;
  address: string;
  image: string | File;
  school_name: string;
[key: string]: string | File | undefined;
}
type DetailsFormData = (SchoolForm | ShopForm) & { [key: string]: string | File | undefined };
interface Props {
role: 'school' | 'shopkeeper';
}
export default function DetailsForm({ role }: Props) {
  const initialData: DetailsFormData =
    role === 'school'
      ? {
          school_name: '',
          address: '',
          reg_no: '',
          affiliation: '',
          level: '',
          image: '',
        }
      : {
          shop_name: '',
          address: '',
          shop_type: '',
          image: '',
        };
  const { data, setData, post, processing, errors } = useForm<DetailsFormData>(initialData);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('details.store'), {
      forceFormData: true,
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
                value={(data as SchoolForm).school_name}
                onChange={(e) => setData('school_name', e.target.value)}
              />
              <InputError message={errors.school_name} />
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={(data as SchoolForm).address}
                onChange={(e) => setData('address', e.target.value)}
              />
              <InputError message={errors.address} />
            </div>
            <div>
              <Label htmlFor="reg_no">Registration No</Label>
              <Input
                id="reg_no"
                value={(data as SchoolForm).reg_no}
                onChange={(e) => setData('reg_no', e.target.value)}
              />
              <InputError message={errors.reg_no} />
            </div>
            <div>
              <Label htmlFor="affiliation">Affiliation</Label>
              <Input
                id="affiliation"
                value={(data as SchoolForm).affiliation ?? ''}
                onChange={(e) => setData('affiliation', e.target.value)}
              />
              <InputError message={errors.affiliation} />
            </div>
            <div>
              <Label htmlFor="level">Level</Label>
              <Input
                id="level"
                value={(data as SchoolForm).level ?? ''}
                onChange={(e) => setData('level', e.target.value)}
              />
              <InputError message={errors.level} />
            </div>
            <div>
              <Label htmlFor="image">School Image</Label>
              <Input
                id="image"
                type="file"
                onChange={(e) => setData('image', e.target.files?.[0] ?? '')}
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
                value={(data as ShopForm).shop_name}
                onChange={(e) => setData('shop_name', e.target.value)}
              />
              <InputError message={errors.shop_name} />
            </div>
            <div>
              <Label htmlFor="shop_type">Shop Type</Label>
              <Input
                id="shop_type"
                value={(data as ShopForm).shop_type}
                onChange={(e) => setData('shop_type', e.target.value)}
              />
              <InputError message={errors.shop_type} />
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={(data as ShopForm).address}
                onChange={(e) => setData('address', e.target.value)}
              />
              <InputError message={errors.address} />
            </div>
            <div>
              <Label htmlFor="image">Shop Image</Label>
              <Input
                id="image"
                type="file"
                onChange={(e) => setData('image', e.target.files?.[0] ?? '')}
              />
              <InputError message={errors.image} />
            </div>
          </>
        )}
        <Button type="submit" disabled={processing}>
          {processing ? <LoaderCircle className="animate-spin" /> : 'Submit Details'}
        </Button>
      </form>
    </AuthLayout>
  );
}
