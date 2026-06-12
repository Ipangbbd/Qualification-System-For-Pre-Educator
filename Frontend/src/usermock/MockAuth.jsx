import React, { useState } from 'react'

export default function MockAuth({ onComplete, onCancel }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const user = { name: name || 'Pengguna', email: email || '' }
    localStorage.setItem('edu_user', JSON.stringify(user))
    if (typeof onComplete === 'function') onComplete()
  }

  return (
    <section className="product-tile bg-canvas-parchment">
      <div className="max-w-[720px] mx-auto text-center">
        <h2 className="text-display-md font-sf-display mb-4">Masuk Mock Auth</h2>
        <p className="text-body text-ink-muted-80 mb-6">Isi nama dan email untuk melanjutkan ke dashboard. Ini hanya mock authentication lokal.</p>

        <form onSubmit={handleSubmit} className="space-y-4 bg-canvas rounded-card p-6 max-w-[480px] mx-auto">
          <div>
            <label className="block text-caption mb-2 text-ink-muted-48">Nama</label>
            <input className="w-full border border-hairline rounded-md px-3 py-2" value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div>
            <label className="block text-caption mb-2 text-ink-muted-48">Email</label>
            <input className="w-full border border-hairline rounded-md px-3 py-2" value={email} onChange={e => setEmail(e.target.value)} />
          </div>

          <div className="flex justify-center gap-4">
            <button type="submit" className="btn-primary">Lanjut ke Dashboard</button>
            <button type="button" onClick={onCancel} className="btn-secondary">Kembali</button>
          </div>
        </form>
      </div>
    </section>
  )
}
