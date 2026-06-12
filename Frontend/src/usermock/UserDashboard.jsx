import React, { useEffect, useState } from 'react'

export default function UserDashboard({ onStartExam, onSignOut }) {
  const [user, setUser] = useState(null)
  const [score, setScore] = useState(null)
  const [qualified, setQualified] = useState(null)

  useEffect(() => {
    const u = localStorage.getItem('edu_user')
    const s = localStorage.getItem('edu_examScore')
    setUser(u ? JSON.parse(u) : null)
    setScore(s !== null ? Number(s) : null)
    if (s !== null) setQualified(Number(s) >= 60)
  }, [])

  return (
    <section className="product-tile bg-canvas-parchment">
      <div className="max-w-[980px] mx-auto text-center">
        <h2 className="text-display-md font-sf-display mb-2">Dashboard</h2>
        <p className="text-body text-ink-muted-80 mb-6">{user ? `Halo, ${user.name}` : 'Halo, Pengguna'}</p>

        <div className="max-w-[720px] mx-auto space-y-6">
          <div className="bg-white/6 rounded-card p-6">
            <h3 className="text-body-strong mb-2">Status Mock Exam</h3>
            {score === null ? (
              <p className="text-caption text-ink-muted-48">Anda belum melakukan mock exam. Silakan mulai mock exam untuk menyimpan skor lokal.</p>
            ) : (
              <div>
                <p className="text-lead mb-2">Skor Anda: <strong>{score}</strong> / 100</p>
                <p className="text-body mb-2">Keterangan: {qualified ? 'Qualified' : 'Not Qualified'}</p>
                <div className="text-caption text-ink-muted-48">Passing threshold: 60</div>
              </div>
            )}
          </div>

          <div className="flex justify-center gap-4">
            <button onClick={onStartExam} className="btn-primary">Mulai Mock Exam</button>
            <button onClick={onSignOut} className="btn-secondary">Sign out</button>
          </div>
        </div>
      </div>
    </section>
  )
}
