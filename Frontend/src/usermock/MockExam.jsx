import React, { useState } from 'react'

const QUESTIONS = [
  { id: 1, q: 'Apa tujuan utama tes kualifikasi?', opts: ['Mencari pekerjaan', 'Mengukur kompetensi', 'Bersenang-senang', 'Menonton video'], a: 1 },
  { id: 2, q: 'Berapa jumlah tahapan yang umum?', opts: ['1', '2', '3', '4'], a: 2 },
  { id: 3, q: 'Apa yang menilai kemampuan mengajar?', opts: ['Tes Praktik', 'Hanya teori', 'Chat', 'Survei'], a: 0 },
  { id: 4, q: 'Berapa minimal passing mock exam untuk lolos?', opts: ['50', '60', '75', '80'], a: 1 },
  { id: 5, q: 'Apa yang harus dilakukan saat gagal?', opts: ['Mencoba lagi setelah jeda', 'Menyerah', 'Mengeluh', 'Tidak melakukan apa-apa'], a: 0 }
]

export default function MockExam({ onComplete, onCancel }) {
  const [answers, setAnswers] = useState({})

  const handleSelect = (qid, idx) => {
    setAnswers(prev => ({ ...prev, [qid]: idx }))
  }

  const handleSubmit = () => {
    // Score calculation: equal weight per question, total 100
    const per = 100 / QUESTIONS.length
    let score = 0
    QUESTIONS.forEach(q => {
      if (answers[q.id] === q.a) score += per
    })
    score = Math.round(score)
    localStorage.setItem('edu_examScore', String(score))
    if (typeof onComplete === 'function') onComplete()
  }

  return (
    <section className="product-tile bg-canvas">
      <div className="max-w-[880px] mx-auto">
        <h2 className="text-display-md font-sf-display mb-4">Mock Exam</h2>
        <p className="text-body text-ink-muted-80 mb-6">Kerjakan soal berikut. Skor akhir akan disimpan secara lokal dan menentukan kelayakan (≥ 60).</p>

        <div className="space-y-6">
          {QUESTIONS.map(q => (
            <div key={q.id} className="bg-canvas-parchment rounded-card p-4">
              <div className="text-lead mb-3">{q.q}</div>
              <div className="space-y-2">
                {q.opts.map((opt, idx) => (
                  <button key={idx} className={`w-full text-left p-3 rounded-md border border-hairline ${answers[q.id] === idx ? 'bg-ink/5' : ''}`} onClick={() => handleSelect(q.id, idx)}>
                    <div className="text-body">{opt}</div>
                  </button>
                ))}
              </div>
            </div>
          ))}

          <div className="flex justify-center gap-4">
            <button onClick={handleSubmit} className="btn-primary">Selesai dan Simpan</button>
            <button onClick={onCancel} className="btn-secondary">Batal</button>
          </div>
        </div>
      </div>
    </section>
  )
}
