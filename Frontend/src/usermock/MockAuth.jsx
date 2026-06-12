import React, { useState } from 'react'

export default function MockAuth({ onComplete, onCancel }) {
  const [isLogin, setIsLogin] = useState(true)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Basic validation
    if (!email || !password || (!isLogin && !name)) {
      setError('Semua kolom wajib diisi.')
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setError('Password minimal 6 karakter.')
      setLoading(false)
      return
    }

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register'
      const payload = isLogin
        ? { username: email, password }
        : { username: name, email, password, role: 'teacher' }

      const response = await fetch(`http://localhost:5005${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      const data = await response.json()

      if (!response.ok || data.success === false) {
        throw new Error(data.error || data.message || 'Autentikasi gagal')
      }

      // Save token and user details to localStorage
      localStorage.setItem('edu_token', data.token)
      localStorage.setItem('edu_user', JSON.stringify(data.user))

      if (typeof onComplete === 'function') onComplete()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="product-tile bg-canvas-parchment py-12">
      <div className="max-w-[720px] mx-auto text-center px-4">
        <h2 className="text-display-md font-sf-display mb-2">
          {isLogin ? 'Masuk ke Sistem' : 'Daftar Akun Baru'}
        </h2>
        <p className="text-body text-ink-muted-80 mb-6">
          {isLogin
            ? 'Silakan masuk menggunakan email dan password terdaftar.'
            : 'Isi form di bawah untuk mendaftarkan akun pengajar baru.'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 bg-white/70 backdrop-blur-md border border-hairline rounded-card p-8 max-w-[480px] mx-auto product-shadow">
          {error && (
            <div className="bg-red-50 text-red-600 text-caption p-3 rounded-md border border-red-200 text-left">
              ⚠️ {error}
            </div>
          )}

          {!isLogin && (
            <div className="text-left">
              <label className="block text-caption mb-1 font-semibold text-ink-muted-80">Nama Lengkap</label>
              <input
                type="text"
                placeholder="Masukkan nama lengkap"
                className="w-full border border-hairline rounded-md px-3 py-2 bg-canvas focus:outline-none focus:ring-2 focus:ring-primary-focus transition-all"
                value={name}
                onChange={e => setName(e.target.value)}
                disabled={loading}
              />
            </div>
          )}

          <div className="text-left">
            <label className="block text-caption mb-1 font-semibold text-ink-muted-80">Email</label>
            <input
              type="email"
              placeholder="nama@email.com"
              className="w-full border border-hairline rounded-md px-3 py-2 bg-canvas focus:outline-none focus:ring-2 focus:ring-primary-focus transition-all"
              value={email}
              onChange={e => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="text-left">
            <label className="block text-caption mb-1 font-semibold text-ink-muted-80">Password</label>
            <input
              type="password"
              placeholder="Minimal 6 karakter"
              className="w-full border border-hairline rounded-md px-3 py-2 bg-canvas focus:outline-none focus:ring-2 focus:ring-primary-focus transition-all"
              value={password}
              onChange={e => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="pt-2 flex flex-col gap-4">
            <button
              type="submit"
              className="btn-primary w-full flex justify-center items-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Memproses...
                </>
              ) : isLogin ? 'Masuk' : 'Daftar Sekarang'}
            </button>

            <button type="button" onClick={onCancel} className="btn-secondary w-full" disabled={loading}>
              Batal
            </button>
          </div>

          <div className="border-t border-hairline pt-4 mt-2">
            <button
              type="button"
              className="text-caption text-primary hover:underline font-semibold"
              onClick={() => {
                setIsLogin(!isLogin)
                setError('')
              }}
              disabled={loading}
            >
              {isLogin ? 'Belum punya akun? Daftar di sini' : 'Sudah punya akun? Masuk di sini'}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

