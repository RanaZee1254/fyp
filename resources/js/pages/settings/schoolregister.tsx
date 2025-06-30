import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
type RegisterForm = {
    name: string;
    email: string;
    password: string;
    image: File | string;
    Contact_Number: string;
    Address: string;
    Level: string;
    Affiliation: string;
    type: string; 
}; 
export default function SchoolReg() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
        name: '',
        email: '',
        password: '',
        image: '',
        Contact_Number: '',
        Address: '',
        Level: '',
        Affiliation: '',
        type: '',
    });
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('school.register'), {
            onFinish: () => reset('password', 'image'),
        });
    };
    return (
        <AuthLayout title="Register School" description="Enter your school details below to register">
            <Head title="Register School" />
            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name">School Name</Label>
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
                            placeholder="School Name"
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            tabIndex={2}
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            disabled={processing}
                            placeholder="Email Address"
                        />
                        <InputError message={errors.email} className="mt-2" />
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
                        />
                        <InputError message={errors.password} className="mt-2" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="image">School Logo</Label>
                        <Input
                            id="image"
                            type="file"
                            accept="image/*"
                            required
                            tabIndex={4}
                           onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                                setData('image', e.target.files[0]);
                            }
                            }}
                            disabled={processing}
                        />
                        <InputError message={errors.image} className="mt-2" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="Contact_Number">Contact Number</Label>
                        <Input
                            id="Contact_Number"
                            type="text"
                            required
                            tabIndex={5}
                            value={data.Contact_Number}
                            onChange={(e) => setData('Contact_Number', e.target.value)}
                            disabled={processing}
                            placeholder="Contact Number"
                        />
                        <InputError message={errors.Contact_Number} className="mt-2" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="Address">Address</Label>
                        <Input
                            id="Address"
                            type="text"
                            required
                            tabIndex={6}
                            value={data.Address}
                            onChange={(e) => setData('Address', e.target.value)}
                            disabled={processing}
                            placeholder="School Address"
                        />
                        <InputError message={errors.Address} className="mt-2" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="Level">Level</Label>
                        <Input
                            id="Level"
                            type="text"
                            required
                            tabIndex={7}
                            value={data.Level}
                            onChange={(e) => setData('Level', e.target.value)}
                            disabled={processing}
                            placeholder="School Level (e.g., Primary, Secondary)"
                        />
                        <InputError message={errors.Level} className="mt-2" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="type">Type</Label>
                        <Input
                            id="type"
                            type="text"
                            required
                            tabIndex={8}
                            value={data.type}
                            onChange={(e) => setData('type', e.target.value)}
                            disabled={processing}
                            placeholder="School Type (e.g., Public, Private)"
                        />
                        <InputError message={errors.type} className="mt-2" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="Affiliation">Affiliation</Label>
                        <Input
                            id="Affiliation"
                            type="text"
                            required
                            tabIndex={9}
                            value={data.Affiliation}
                            onChange={(e) => setData('Affiliation', e.target.value)}
                            disabled={processing}
                            placeholder="School Affiliation (e.g., Board, University)"
                        />
                        <InputError message={errors.Affiliation} className="mt-2" />
                    </div>
                    <Button type="submit" tabIndex={10} disabled={processing}>
                        Register
                    </Button>
                </div>
            </form>
        </AuthLayout>
    );
};