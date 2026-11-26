import { useEffect, useState } from 'react'
import { url, countImages } from '../api.js'

// ===== PART 3: image gallery with prev / next =====
export default function Gallery({ name }) {
  const [i, setI]         = useState(1)   // current picture (starts at 1)
  const [total, setTotal] = useState(0)   // how many pictures exist

  useEffect(() => {
    let alive = true
    countImages(name).then(n => { if (alive) setTotal(n) })
    return () => { alive = false }
  }, [name])

  const next = () => total && setI(i % total + 1)
  const prev = () => total && setI((i - 2 + total) % total + 1)

  return (
    <div className="gallery">
      <img src={url(name, i)} alt={name} />
      <button className="prev" onClick={prev}>&#8249;</button>
      <button className="next" onClick={next}>&#8250;</button>
      <span className="count">{i} / {total || '?'}</span>
    </div>
  )
}
