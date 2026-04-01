import { useId, useMemo, useState } from 'react'

export default function LoginForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const emailId = useId()
    const passwordId = useId()
    const errorId = useId()

    const canSubmit = useMemo(() => {
        return email.trim().length > 0 && password.length > 0 && !isLoading
    }, [email, password, isLoading])

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setError('')
        setIsLoading(true)

        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email.trim(), password }),
            })

            if (res.ok) {
                return
            }

            if (res.status === 401 || res.status === 400) {
                setError('Email ou senha inválidos')
                return
            }

            setError('Não foi possível entrar agora. Tente novamente em instantes.')
        } catch {
            setError('Sem conexão no momento. Verifique sua internet e tente novamente.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="mx-auto mt-10 w-full max-w-md py-16 px-4 sm:mt-16">
            <div className="rounded-2xl border rounded-lg border-2 primary bg-white p-6 shadow-sm sm:p-8">
                <div className="mb-6">
                    <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Entrar</h1>
                    <p className="mt-1 text-sm text-slate-600">Acesse sua conta para continuar.</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4" aria-busy={isLoading}>
                    {error && (
                        <div
                            id={errorId}
                            role="alert"
                            aria-live="polite"
                            className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                        >
                            {error}
                        </div>
                    )}

                    <div className="flex flex-col gap-1.5">
                        <label htmlFor={emailId} className="text-sm font-medium text-slate-700">
                            Email
                        </label>
                        <input
                            id={emailId}
                            type="email"
                            placeholder="seuemail@exemplo.com"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            autoComplete="email"
                            inputMode="email"
                            required
                            aria-invalid={Boolean(error) || undefined}
                            aria-describedby={error ? errorId : undefined}
                            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-slate-900 shadow-sm outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <div className="flex items-center justify-between">
                            <label htmlFor={passwordId} className="text-sm font-medium text-slate-700">
                                Senha
                            </label>
                            <button
                                type="button"
                                onClick={() => setShowPassword(v => !v)}
                                className="text-sm font-medium text-slate-600 underline-offset-4 hover:text-slate-900 hover:underline"
                                aria-controls={passwordId}
                                aria-pressed={showPassword}
                            >
                                {showPassword ? 'Ocultar' : 'Mostrar'}
                            </button>
                        </div>
                        <input
                            id={passwordId}
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Sua senha"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            autoComplete="current-password"
                            required
                            aria-invalid={Boolean(error) || undefined}
                            aria-describedby={error ? errorId : undefined}
                            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-slate-900 shadow-sm outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={!canSubmit}
                        className="mt-2 inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isLoading ? 'Entrando…' : 'Entrar'}
                    </button>

                    <p className="text-center text-sm text-slate-600">
                        Ainda não tem conta?{' '}
                        <a href="/register" className="font-semibold text-slate-900 underline-offset-4 hover:underline">
                            Criar conta
                        </a>
                    </p>
                </form>
            </div>
        </div>
    )
}