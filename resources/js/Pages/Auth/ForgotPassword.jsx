import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            <div className="mb-4 text-sm text-gray-500">
                Forgot your password? No problem. Just let us know your email address and we will email you a password
                reset link that will allow you to choose a new one.
            </div>

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <form onSubmit={submit}>
                <div className="flex items-center border-b border-pink-300 mt-4">
                <span className="pr-2 text-red-500">👤</span>

                <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="outline-none py-2 w-full focus:border-b-2 focus:border-pink-300" 
                    isFocused={true}
                    placeholder="Email"
                    onChange={(e) => setData('email', e.target.value)}
                />

                <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mb-2">

                
                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton 
                        className="ml-4" 
                        disabled={processing}>
                        Email Password Reset Link
                    </PrimaryButton>
                </div>
                </div>
            </form>
        </GuestLayout>
    );
}
