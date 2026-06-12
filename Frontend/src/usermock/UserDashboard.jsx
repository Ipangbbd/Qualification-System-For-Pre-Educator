import React, { useEffect, useState } from 'react'

export default function UserDashboard({ onStartExam, onSignOut }) {
  const [user, setUser] = useState(null)
  const [score, setScore] = useState(null)
  const [qualified, setQualified] = useState(null)
  
  // Backend data
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(false)
  const [submittingDoc, setSubmittingDoc] = useState(false)
  const [docInput, setDocInput] = useState('')
  const [error, setError] = useState('')

  const fetchSubmissions = async (token) => {
    try {
      setLoading(true)
      const res = await fetch('http://localhost:5005/api/qualifications', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setSubmissions(data.data || [])
      }
    } catch (err) {
      console.error('Failed to fetch submissions:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const u = localStorage.getItem('edu_user')
    const s = localStorage.getItem('edu_examScore')
    const token = localStorage.getItem('edu_token')

    setUser(u ? JSON.parse(u) : null)
    setScore(s !== null ? Number(s) : null)
    if (s !== null) setQualified(Number(s) >= 60)

    if (token) {
      fetchSubmissions(token)
    }
  }, [])

  const handleSubmitDocs = async (e) => {
    e.preventDefault()
    if (!docInput.trim()) return

    const token = localStorage.getItem('edu_token')
    if (!token) {
      setError('Token tidak valid. Silakan sign out dan login kembali.')
      return
    }

    try {
      setSubmittingDoc(true)
      setError('')
      const docList = docInput.split(',').map(d => d.trim()).filter(Boolean)
      
      const res = await fetch('http://localhost:5005/api/qualifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ documents: docList })
      })

      const data = await res.json()
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Gagal mengajukan berkas')
      }

      setDocInput('')
      fetchSubmissions(token)
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmittingDoc(false)
    }
  }

  const translateStatus = (status) => {
    switch (status) {
      case 'under_review': return '🔍 Menunggu Review'
      case 'approved': return '✅ Disetujui'
      case 'rejected': return '❌ Ditolak'
      default: return status
    }
  }

  return (
    <section className="product-tile bg-canvas-parchment py-12">
      <div className="max-w-[980px] mx-auto px-4">
        {/* Glass Mockup Frame */}
        <div className="glass-mockup text-left p-6 md:p-8 mb-8 relative">
          {/* Mac OS Window Header */}
          <div className="flex items-center justify-between border-b border-hairline pb-4 mb-6">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
            </div>
            <span className="text-caption text-ink-muted-48">Dashboard Pengajar</span>
          </div>

          <h2 className="text-display-md font-sf-display mb-1">Dashboard</h2>
          <p className="text-body text-ink-muted-80 mb-6">{user ? `Halo, ${user.name} (${user.email})` : 'Halo, Pengguna'}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Bento: Exam Status */}
            <div className="bg-white/50 border border-hairline rounded-card p-6 product-shadow flex flex-col justify-between">
              <div>
                <h3 className="text-body-strong mb-3">📝 Status Ujian Mock</h3>
                {score === null ? (
                  <p className="text-caption text-ink-muted-80 mb-4">Anda belum melakukan mock exam. Silakan mulai mock exam untuk menyimpan skor lokal.</p>
                ) : (
                  <div className="mb-4">
                    <p className="text-lead mb-1">Skor Anda: <strong className="text-lg text-primary">{score}</strong> / 100</p>
                    <p className="text-body flex items-center gap-2">
                      Keterangan: 
                      <span className={`px-2 py-0.5 rounded text-caption font-semibold ${qualified ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {qualified ? 'Qualified' : 'Not Qualified'}
                      </span>
                    </p>
                    <div className="text-caption text-ink-muted-48 mt-2">Passing threshold: 60</div>
                  </div>
                )}
              </div>
              <button onClick={onStartExam} className="btn-primary w-full mt-4">
                {score === null ? 'Mulai Ujian Mock' : 'Ulangi Ujian Mock'}
              </button>
            </div>

            {/* Right Bento: Submit Doc */}
            <div className="bg-white/50 border border-hairline rounded-card p-6 product-shadow">
              <h3 className="text-body-strong mb-3">📂 Ajukan Kualifikasi</h3>
              
              <form onSubmit={handleSubmitDocs} className="space-y-3">
                {error && (
                  <div className="bg-red-50 text-red-600 text-caption p-2 rounded border border-red-200">
                    {error}
                  </div>
                )}
                <div>
                  <label className="block text-caption mb-1 font-semibold text-ink-muted-80">
                    Nama Dokumen (pisahkan dengan koma)
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Ijazah S1, Sertifikat TOEFL"
                    className="w-full border border-hairline rounded-md px-3 py-2 bg-canvas focus:outline-none focus:ring-2 focus:ring-primary-focus transition-all"
                    value={docInput}
                    onChange={e => setDocInput(e.target.value)}
                    disabled={submittingDoc}
                  />
                </div>
                <button
                  type="submit"
                  className="btn-secondary w-full"
                  disabled={submittingDoc || !docInput.trim()}
                >
                  {submittingDoc ? 'Mengirim...' : 'Ajukan Berkas'}
                </button>
              </form>
            </div>
          </div>

          {/* Submissions Section */}
          <div className="mt-8 border-t border-hairline pt-6">
            <h3 className="text-body-strong mb-4">🗂️ Riwayat Pengajuan Kualifikasi</h3>
            
            {loading ? (
              <p className="text-caption text-ink-muted-80">Memuat riwayat pengajuan...</p>
            ) : submissions.length === 0 ? (
              <p className="text-caption text-ink-muted-48 bg-white/20 p-4 rounded text-center">
                Belum ada pengajuan kualifikasi di backend.
              </p>
            ) : (
              <div className="space-y-4">
                {submissions.map((sub, idx) => (
                  <div key={sub.id || idx} className="bg-white/70 border border-hairline rounded-md p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-hairline pb-2 mb-2">
                      <span className="text-caption text-ink-muted-48">ID: {sub.id}</span>
                      <span className="font-semibold text-caption">{translateStatus(sub.status)}</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-caption font-semibold text-ink-muted-80">Dokumen yang Diajukan:</div>
                        <ul className="list-disc list-inside text-caption text-ink-muted-80">
                          {sub.documents && sub.documents.map((doc, dIdx) => (
                            <li key={dIdx}>{doc}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-canvas-parchment/50 p-2 rounded">
                        <div className="text-caption font-semibold text-ink-muted-80">Detail Nilai Asesmen:</div>
                        <div className="grid grid-cols-3 gap-2 mt-1 text-center">
                          <div>
                            <div className="text-caption text-ink-muted-48">Akademik</div>
                            <div className="font-bold text-caption">{sub.scores?.akademik || 0}</div>
                          </div>
                          <div>
                            <div className="text-caption text-ink-muted-48">Pengalaman</div>
                            <div className="font-bold text-caption">{sub.scores?.pengalaman || 0}</div>
                          </div>
                          <div>
                            <div className="text-caption text-ink-muted-48">Kompetensi</div>
                            <div className="font-bold text-caption">{sub.scores?.kompetensi || 0}</div>
                          </div>
                        </div>
                        <div className="border-t border-hairline mt-2 pt-1 flex justify-between text-caption">
                          <span>Total Skor (Weighted):</span>
                          <span className="font-bold">{sub.totalScore || 0}</span>
                        </div>
                      </div>
                    </div>
                    {sub.adminNotes && (
                      <div className="mt-2 text-caption bg-amber-50 text-amber-900 p-2 rounded border border-amber-100">
                        <strong>Catatan Penilai:</strong> {sub.adminNotes}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-center">
          <button onClick={onSignOut} className="btn-secondary px-8">
            Keluar (Sign Out)
          </button>
        </div>
      </div>
    </section>
  )
}

