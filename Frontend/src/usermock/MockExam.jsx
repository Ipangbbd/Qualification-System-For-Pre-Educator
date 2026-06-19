import React, { useState } from 'react'

const KKM = 80
const COOLDOWN_DAYS = 7
const COOLDOWN_MS = COOLDOWN_DAYS * 24 * 60 * 60 * 1000

const QUESTIONS = [
  {
    id: 1,
    q: 'Apa tujuan utama tes kualifikasi?',
    opts: ['Mencari pekerjaan', 'Mengukur kompetensi', 'Bersenang-senang', 'Menonton video'],
    a: 1
  },
  {
    id: 2,
    q: 'Berapa jumlah tahapan yang umum?',
    opts: ['1', '2', '3', '4'],
    a: 2
  },
  {
    id: 3,
    q: 'Apa yang menilai kemampuan mengajar?',
    opts: ['Tes Praktik', 'Hanya teori', 'Chat', 'Survei'],
    a: 0
  },
  {
    id: 4,
    q: 'Berapa minimal nilai untuk lulus ujian ini?',
    opts: ['60', '70', '80', '90'],
    a: 2
  },
  {
    id: 5,
    q: 'Apa yang harus dilakukan saat gagal?',
    opts: ['Mencoba lagi setelah jeda', 'Menyerah', 'Mengeluh', 'Tidak melakukan apa-apa'],
    a: 0
  }
]

export default function MockExam({ onComplete, onCancel }) {
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(null)

  const handleSelect = (qid, idx) => {
    if (submitted) return
    setAnswers(prev => ({ ...prev, [qid]: idx }))
  }

  const allAnswered = QUESTIONS.every(q => answers[q.id] !== undefined)

  const handleSubmit = () => {
    const per = 100 / QUESTIONS.length
    let total = 0
    QUESTIONS.forEach(q => {
      if (answers[q.id] === q.a) total += per
    })
    const finalScore = Math.round(total)
    setScore(finalScore)
    setSubmitted(true)

    const passed = finalScore >= KKM
    localStorage.setItem('edu_examScore', String(finalScore))
    localStorage.setItem('edu_examPassed', passed ? 'true' : 'false')

    // Kalau tidak lulus → set cooldown timestamp
    if (!passed) {
      const cooldownUntil = Date.now() + COOLDOWN_MS
      localStorage.setItem('edu_examCooldownUntil', String(cooldownUntil))
    } else {
      // Kalau lulus → hapus cooldown
      localStorage.removeItem('edu_examCooldownUntil')
    }
  }

  const handleFinish = () => {
    if (typeof onComplete === 'function') onComplete()
  }

  // ── Result screen ────────────────────────────────────────────
  if (submitted && score !== null) {
    const passed = score >= KKM
    const correct = QUESTIONS.filter(q => answers[q.id] === q.a).length

    return (
      <section className="product-tile bg-canvas-parchment py-12">
        <div className="max-w-[640px] mx-auto px-4 text-center">
          <div className="bg-white/70 backdrop-blur-md border border-hairline rounded-card p-8 product-shadow">

            <div className="text-5xl mb-4">{passed ? '🎉' : '⏳'}</div>

            <h2 className="text-display-md font-sf-display mb-2">
              {passed ? 'Selamat! Kamu Lulus' : 'Belum Mencapai KKM'}
            </h2>

            <p className="text-body text-ink-muted-80 mb-6">
              {passed
                ? 'Kamu memenuhi syarat minimum. Lanjut ke tahap berikutnya!'
                : `Nilai minimum yang harus dicapai adalah ${KKM}. Kamu perlu menunggu ${COOLDOWN_DAYS} hari sebelum bisa mengulang.`}
            </p>

            {/* Score */}
            <div className={`rounded-xl p-6 mb-6 ${passed ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
              <div className={`text-5xl font-bold mb-1 ${passed ? 'text-green-700' : 'text-red-600'}`}>
                {score}
              </div>
              <div className="text-caption text-ink-muted-80">dari 100 poin · KKM: {KKM}</div>
              <div className="mt-3 text-body">
                Jawaban benar: <strong>{correct}</strong> / {QUESTIONS.length}
              </div>
            </div>

            {/* Cooldown notice */}
            {!passed && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 text-left">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">⏰</span>
                  <span className="text-body-strong text-amber-800">Cooldown Aktif</span>
                </div>
                <p className="text-caption text-amber-700">
                  Ujian dikunci selama <strong>{COOLDOWN_DAYS} hari</strong> terhitung dari sekarang.
                  Timer akan terlihat di dashboard dan tombol ujian akan terbuka otomatis setelah cooldown selesai.
                </p>
              </div>
            )}

            {/* Per-question breakdown */}
            <div className="text-left space-y-3 mb-6">
              {QUESTIONS.map((q, i) => {
                const isCorrect = answers[q.id] === q.a
                const chosenOpt = q.opts[answers[q.id]]
                const correctOpt = q.opts[q.a]
                return (
                  <div
                    key={q.id}
                    className={`p-3 rounded-md border text-caption ${isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}
                  >
                    <div className="font-semibold text-ink mb-1">{i + 1}. {q.q}</div>
                    <div className="flex flex-col gap-0.5">
                      <span>
                        Jawaban kamu:{' '}
                        <span className={isCorrect ? 'text-green-700 font-semibold' : 'text-red-600 font-semibold'}>
                          {chosenOpt ?? '(tidak dijawab)'}
                        </span>
                      </span>
                      {!isCorrect && (
                        <span>
                          Jawaban benar:{' '}
                          <span className="text-green-700 font-semibold">{correctOpt}</span>
                        </span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            <button onClick={handleFinish} className="btn-primary w-full">
              Kembali ke Dashboard
            </button>
          </div>
        </div>
      </section>
    )
  }

  // ── Exam screen ──────────────────────────────────────────────
  const answered = Object.keys(answers).length

  return (
    <section className="product-tile bg-canvas-parchment py-12">
      <div className="max-w-[720px] mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-display-md font-sf-display mb-2">Ujian Tulis Mock</h2>
          <p className="text-body text-ink-muted-80">
            Jawab semua soal berikut. Nilai minimum lulus: <strong>{KKM}</strong> / 100.
          </p>
          {/* Progress bar */}
          <div className="mt-4 max-w-xs mx-auto">
            <div className="flex justify-between text-caption text-ink-muted-48 mb-1">
              <span>Progress</span>
              <span>{answered} / {QUESTIONS.length} soal dijawab</span>
            </div>
            <div className="h-2 bg-white/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-300"
                style={{ width: `${(answered / QUESTIONS.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-5">
          {QUESTIONS.map((q, qi) => (
            <div key={q.id} className="bg-white/60 backdrop-blur-md border border-hairline rounded-card p-5 product-shadow">
              <div className="flex items-start gap-3 mb-4">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/10 text-primary text-caption font-bold flex items-center justify-center">
                  {qi + 1}
                </span>
                <div className="text-body font-semibold">{q.q}</div>
              </div>
              <div className="space-y-2">
                {q.opts.map((opt, idx) => {
                  const selected = answers[q.id] === idx
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelect(q.id, idx)}
                      className={`w-full text-left px-4 py-3 rounded-lg border transition-all duration-150 text-body
                        ${selected
                          ? 'border-primary bg-primary/10 text-primary font-semibold shadow-sm'
                          : 'border-hairline bg-white/40 hover:bg-white/80 hover:border-primary/40'
                        }`}
                    >
                      <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full border mr-3 text-caption font-bold transition-all
                        ${selected ? 'bg-primary border-primary text-white' : 'border-hairline text-ink-muted-48'}`}>
                        {String.fromCharCode(65 + idx)}
                      </span>
                      {opt}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col gap-3">
          {!allAnswered && (
            <p className="text-center text-caption text-amber-600">
              ⚠️ Jawab semua {QUESTIONS.length} soal terlebih dahulu sebelum submit.
            </p>
          )}
          <div className="flex gap-3 justify-center">
            <button
              onClick={handleSubmit}
              disabled={!allAnswered}
              className={`btn-primary px-8 ${!allAnswered ? 'opacity-40 cursor-not-allowed' : ''}`}
            >
              Selesai & Lihat Skor
            </button>
            <button onClick={onCancel} className="btn-secondary px-8">
              Batal
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
