import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword?: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false as boolean,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Masuk ke Panel Pengelola - PIAUD IAI Persis" />

            <div className="mb-6 pb-4 border-b border-[#E3DAC7]">
                <h2 className="font-serif font-bold text-lg text-[#1B2A2F]">
                    Masuk ke Panel Pengelola
                </h2>
                <p className="text-xs text-[#5C6B73] mt-1">
                    Silakan masukkan akun email dan password resmi prodi Anda.
                </p>
            </div>

            {status && (
                <div className="mb-4 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg p-3">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <InputLabel htmlFor="email" value="Alamat Email" className="text-xs font-bold text-[#1B2A2F]" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1.5 block w-full px-3.5 py-2.5 text-xs border border-[#E3DAC7] rounded-xl focus:border-[#0F4C3A] focus:ring-[#0F4C3A]"
                        autoComplete="username"
                        placeholder="contoh: admin@piaud.iaipibandung.ac.id"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-1.5 text-xs text-rose-600" />
                </div>

                <div>
                    <div className="flex items-center justify-between">
                        <InputLabel htmlFor="password" value="Kata Sandi" className="text-xs font-bold text-[#1B2A2F]" />
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-[11px] text-[#0F4C3A] hover:underline font-medium"
                            >
                                Lupa sandi?
                            </Link>
                        )}
                    </div>

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1.5 block w-full px-3.5 py-2.5 text-xs border border-[#E3DAC7] rounded-xl focus:border-[#0F4C3A] focus:ring-[#0F4C3A]"
                        autoComplete="current-password"
                        placeholder="••••••••"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-1.5 text-xs text-rose-600" />
                </div>

                <div className="flex items-center justify-between pt-1">
                    <label className="flex items-center cursor-pointer">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData(
                                    'remember',
                                    (e.target.checked || false) as false,
                                )
                            }
                            className="rounded border-[#E3DAC7] text-[#0F4C3A] focus:ring-[#0F4C3A]"
                        />
                        <span className="ms-2 text-xs text-[#5C6B73]">
                            Ingat saya di perangkat ini
                        </span>
                    </label>
                </div>

                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full inline-flex items-center justify-center gap-2 bg-[#0F4C3A] hover:bg-[#0A3427] text-white text-xs font-bold py-3 px-4 rounded-xl shadow-sm hover:shadow transition-all duration-200 active:scale-98 disabled:opacity-50 cursor-pointer"
                    >
                        {processing ? 'Memproses Masuk...' : 'Masuk ke Dashboard →'}
                    </button>
                </div>
            </form>

            <div className="mt-6 pt-4 border-t border-[#E3DAC7] text-center">
                <p className="text-[11px] text-[#5C6B73]">
                    Hanya untuk pengelola resmi Program Studi PIAUD IAI Persis Bandung.
                </p>
            </div>
        </GuestLayout>
    );
}
