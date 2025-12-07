import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { listAccounts } from './services/accounts.service'
import type { AccountResponse } from '@shared/contracts/accounts'
import { UsersList } from './components/UsersList'

export default function ThemeDemo() {
  const { t } = useTranslation()
  const [dark, setDark] = useState(false)

  const [accounts, setAccounts] = useState<AccountResponse[] | null>(null)
  const [apiStatus, setApiStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle')

  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark')
    setDark(!dark)
  }

  useEffect(() => {
    setApiStatus('loading')
    listAccounts()
      .then((data) => {
        setAccounts(data)
        setApiStatus('ok')
      })
      .catch((err) => {
        console.error('Failed to load accounts', err)
        setApiStatus('error')
      })
  }, [])

  return (
    <div className="bg-surface text-text duration-std ease-smooth flex min-h-screen flex-col items-center justify-center px-6 py-15 font-sans transition-colors">
      {/* Card container */}
      <div className="bg-surface border-border duration-std ease-smooth w-full max-w-2xl rounded-xl border p-8 shadow-md transition-all">
        <h1 className="mb-2 text-4xl font-bold tracking-tight">{t('title')}</h1>
        <p className="text-text-muted mb-8">
          A showcase of your design tokens — colors, fonts, borders, radii, shadows, and
          transitions.
        </p>

        {/* 🔗 Backend status using shared AccountResponse */}
        <div className="border-border bg-surface/60 mb-8 rounded-md border p-4 text-sm">
          <div className="mb-2 flex items-center justify-between">
            <span className="font-medium">API status</span>
            <span className="text-text-muted">
              {apiStatus === 'idle' && 'Idle'}
              {apiStatus === 'loading' && 'Checking…'}
              {apiStatus === 'ok' && 'Connected'}
              {apiStatus === 'error' && 'Error'}
            </span>
          </div>

          {apiStatus === 'error' && (
            <p className="text-error text-xs">
              Could not reach backend. Is the Nest server running?
            </p>
          )}

          {apiStatus === 'ok' && accounts && (
            <div className="mt-2 space-y-1">
              <p className="text-text-muted text-xs">
                Demo account(s) loaded from <code>/api/accounts</code>:
              </p>
              <ul className="space-y-1">
                {accounts.map((acct) => (
                  <li
                    key={acct.id}
                    className="border-border bg-surface/80 flex items-center justify-between rounded-md border px-3 py-2 text-xs"
                  >
                    <span className="font-mono">#{acct.id}</span>
                    <span>{acct.username}</span>
                    <span className="text-text-muted">{acct.email}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <p>Demo: data coming from NestJS + Prisma</p>
        <UsersList />

        {/* Buttons row */}
        <div className="mb-10 flex flex-wrap gap-3">
          <button className="bg-primary hover:bg-primary/85 duration-fast ease-smooth rounded-md px-4 py-2 text-white shadow-sm transition-colors">
            Primary
          </button>
          <button className="bg-accent hover:bg-accent/85 duration-fast ease-smooth rounded-md px-4 py-2 text-white shadow-sm transition-colors">
            Accent
          </button>
          <button className="bg-success hover:bg-success/85 duration-fast ease-smooth rounded-md px-4 py-2 text-white shadow-sm transition-colors">
            Success
          </button>
          <button className="bg-warn hover:bg-warn/85 duration-fast ease-smooth rounded-md px-4 py-2 text-white shadow-sm transition-colors">
            Warning
          </button>
          <button className="bg-error hover:bg-error/85 duration-fast ease-smooth rounded-md px-4 py-2 text-white shadow-sm transition-colors">
            Error
          </button>
        </div>

        {/* Border & radius showcase */}
        <div className="mb-10 grid grid-cols-3 gap-6">
          <div className="border-border text-text-muted flex h-16 items-center justify-center rounded-sm border text-xs shadow-sm">
            rounded-sm
          </div>
          <div className="border-border text-text-muted flex h-16 items-center justify-center rounded-lg border text-xs shadow-md">
            rounded-lg
          </div>
          <div className="border-border text-text-muted flex h-16 items-center justify-center rounded-2xl border text-xs shadow-lg">
            rounded-2xl
          </div>
        </div>

        {/* Font demo */}
        <div className="mb-10 space-y-3">
          <p className="text-base">
            This paragraph uses <strong>Inter</strong>, your primary sans font.
          </p>
          <p className="font-mono text-sm">
            And this line uses <strong>JetBrains Mono</strong> for code or UI elements.
          </p>
          <div className="border-border bg-surface/50 mt-2 rounded-md border p-3">
            <code className="font-mono text-xs">
              const toggleTheme = () =&gt; document.documentElement.classList.toggle("dark");
            </code>
          </div>
        </div>

        {/* Shadow depth examples */}
        <div className="mb-10 flex gap-6">
          <div className="bg-surface border-border text-text-muted flex h-12 w-20 items-center justify-center rounded-md border text-[10px] shadow-sm">
            shadow-sm
          </div>
          <div className="bg-surface border-border text-text-muted flex h-12 w-20 items-center justify-center rounded-md border text-[10px] shadow-md">
            shadow-md
          </div>
          <div className="bg-surface border-border text-text-muted flex h-12 w-20 items-center justify-center rounded-md border text-[10px] shadow-lg">
            shadow-lg
          </div>
        </div>

        {/* Theme toggle */}
        <div className="border-border flex items-center justify-between border-t pt-6">
          <p className="text-text-muted">
            The current theme is <strong>{dark ? 'Dark' : 'Light'}</strong>.
          </p>
          <button
            onClick={toggleTheme}
            className="border-border hover:bg-surface/80 duration-fast ease-smooth rounded-md border px-4 py-2 font-medium transition-colors"
          >
            Toggle Theme
          </button>
        </div>
      </div>
    </div>
  )
}
