// ===== PART 5: rating animation =====
// star = markup of the provided rating.svg (loaded in App)
// grey row underneath, gold row on top grows to score/5 wide (CSS animation)
export default function RatingStars({ score, star }) {
  const pct  = score / 5 * 100
  const five = { __html: star.repeat(5) }

  return (
    <>
      <div className="stars">
        <div className="layer empty" dangerouslySetInnerHTML={five} />
        <div className="layer full" style={{ '--pct': pct + '%' }} dangerouslySetInnerHTML={five} />
      </div>
      <p>{score.toFixed(1)} out of 5.0</p>
    </>
  )
}
