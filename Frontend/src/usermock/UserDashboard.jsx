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

  // State for scheduling Practice Exam (Tes Kedua)
  const [practiceMode, setPracticeMode] = useState('online')
  const [practiceDate, setPracticeDate] = useState('')
  const [practiceTime, setPracticeTime] = useState('')
  const [schedulingPractice, setSchedulingPractice] = useState(false)

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

  const handleSchedulePractice = async (e) => {
    e.preventDefault()
    if (!practiceDate || !practiceTime) {
      setError('Silakan pilih tanggal dan waktu untuk praktik mengajar.')
      return
    }

    const token = localStorage.getItem('edu_token')
    if (!token) {
      setError('Token tidak valid. Silakan sign out dan login kembali.')
      return
    }

    try {
      setSchedulingPractice(true)
      setError('')
      const res = await fetch('http://localhost:5005/api/qualifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          documents: ['Pendaftaran Tes Praktik Mengajar'],
          practiceSchedule: {
            mode: practiceMode,
            date: practiceDate,
            time: practiceTime
          }
        })
      })

      const data = await res.json()
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Gagal menjadwalkan tes praktik')
      }

      setPracticeDate('')
      setPracticeTime('')
      fetchSubmissions(token)
    } catch (err) {
      setError(err.message)
    } finally {
      setSchedulingPractice(false)
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

  // Find if there is an active scheduled practice test in submissions
  const activeSubmissionWithSchedule = submissions.find(s => s.practiceSchedule !== null && s.practiceSchedule !== undefined)

  return (
    <section className="product-tile bg-canvas-parchment py-12">
      <div className="max-w-[1200px] mx-auto px-4">
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

          {error && (
            <div className="bg-red-50 text-red-600 text-caption p-3 rounded-md border border-red-200 mb-6">
              ⚠️ {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Column 1: Exam Status (Tes 1) */}
            <div className="bg-white/50 border border-hairline rounded-card p-6 product-shadow flex flex-col justify-between">
              <div>
                <h3 className="text-body-strong mb-3">📝 Tes 1: Ujian Tulis Mock</h3>
                {score === null ? (
                  <p className="text-caption text-ink-muted-80 mb-4">Anda belum melakukan ujian tulis mock exam. Silakan mulai ujian untuk menyimpan skor lokal.</p>
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

            {/* Column 2: Practical Exam Booking (Tes 2) */}
            <div className="bg-white/50 border border-hairline rounded-card p-6 product-shadow flex flex-col justify-between">
              <div>
                <h3 className="text-body-strong mb-3">📅 Tes 2: Praktik Mengajar</h3>
                
                {activeSubmissionWithSchedule ? (
                  <div className="space-y-3">
                    <div className="bg-canvas-parchment/60 p-3 rounded-md border border-hairline">
                      <div className="text-caption text-ink-muted-48">Jadwal Aktif Anda:</div>
                      <div className="text-body-strong mt-1">
                        {activeSubmissionWithSchedule.practiceSchedule.mode === 'online' ? '🎥 Online (Zoom/Meet)' : '🏫 Langsung (Tatap Muka)'}
                      </div>
                      <div className="text-caption text-ink-muted-80 mt-1">
                        Tanggal: <strong>{activeSubmissionWithSchedule.practiceSchedule.date}</strong>
                      </div>
                      <div className="text-caption text-ink-muted-80">
                        Waktu: <strong>{activeSubmissionWithSchedule.practiceSchedule.time} WIB</strong>
                      </div>
                    </div>
                    <div className="text-caption text-primary font-semibold flex items-center gap-1.5 mt-2 bg-blue-50 p-2 rounded border border-blue-100">
                      <span>⏳ Status: Menunggu Observasi Mentor</span>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSchedulePractice} className="space-y-3">
                    <p className="text-caption text-ink-muted-80 mb-2">
                      Pilih moda ujian praktik Anda serta atur jadwal pelaksanaannya.
                    </p>
                    
                    <div>
                      <label className="block text-caption mb-1 font-semibold text-ink-muted-80">Moda Praktik</label>
                      <select
                        className="w-full border border-hairline rounded-md px-3 py-2 bg-canvas focus:outline-none focus:ring-2 focus:ring-primary-focus transition-all text-caption"
                        value={practiceMode}
                        onChange={e => setPracticeMode(e.target.value)}
                        disabled={schedulingPractice}
                      >
                        <option value="online">Online (Zoom / Google Meet)</option>
                        <option value="offline">Langsung (Tatap Muka / Offline)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-caption mb-1 font-semibold text-ink-muted-80">Tanggal</label>
                      <input
                        type="date"
                        className="w-full border border-hairline rounded-md px-3 py-2 bg-canvas focus:outline-none focus:ring-2 focus:ring-primary-focus transition-all text-caption"
                        value={practiceDate}
                        onChange={e => setPracticeDate(e.target.value)}
                        disabled={schedulingPractice}
                      />
                    </div>

                    <div>
                      <label className="block text-caption mb-1 font-semibold text-ink-muted-80">Waktu / Jam</label>
                      <input
                        type="time"
                        className="w-full border border-hairline rounded-md px-3 py-2 bg-canvas focus:outline-none focus:ring-2 focus:ring-primary-focus transition-all text-caption"
                        value={practiceTime}
                        onChange={e => setPracticeTime(e.target.value)}
                        disabled={schedulingPractice}
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn-primary w-full mt-2"
                      disabled={schedulingPractice || !practiceDate || !practiceTime}
                    >
                      {schedulingPractice ? 'Menyimpan Jadwal...' : 'Jadwal Sekarang'}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Column 3: Submit Doc */}
            <div className="bg-white/50 border border-hairline rounded-card p-6 product-shadow flex flex-col justify-between">
              <div>
                <h3 className="text-body-strong mb-3">📂 Ajukan Berkas Kualifikasi</h3>
                
                <form onSubmit={handleSubmitDocs} className="space-y-3">
                  <div>
                    <label className="block text-caption mb-1 font-semibold text-ink-muted-80">
                      Nama Dokumen (pisahkan dengan koma)
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: Ijazah S1, Sertifikat TOEFL"
                      className="w-full border border-hairline rounded-md px-3 py-2 bg-canvas focus:outline-none focus:ring-2 focus:ring-primary-focus transition-all text-caption"
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
                        {sub.documents && sub.documents.length > 0 && (
                          <div className="mb-2">
                            <div className="text-caption font-semibold text-ink-muted-80">Dokumen yang Diajukan:</div>
                            <ul className="list-disc list-inside text-caption text-ink-muted-80">
                              {sub.documents.map((doc, dIdx) => (
                                <li key={dIdx}>{doc}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {sub.practiceSchedule && (
                          <div className="mt-1 bg-blue-50/50 p-2 rounded border border-blue-100/50">
                            <div className="text-caption font-semibold text-ink-muted-80">Jadwal Praktik:</div>
                            <div className="text-caption text-ink-muted-80">
                              Moda: {sub.practiceSchedule.mode === 'online' ? '🎥 Online' : '🏫 Offline'}
                            </div>
                            <div className="text-caption text-ink-muted-80">
                              Tanggal/Jam: {sub.practiceSchedule.date} @ {sub.practiceSchedule.time}
                            </div>
                          </div>
                        )}
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


