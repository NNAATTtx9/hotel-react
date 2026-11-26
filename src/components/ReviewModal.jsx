import { avg } from '../api.js'
import RatingStars from './RatingStars.jsx'

// ===== PART 4: reviews popup =====
// no backdrop click: only the X button closes it (Item 7)
export default function ReviewModal({ hotel, star, onClose }) {
  return (
    <div className="modal">
      <div className="modal-box">
        <button className="close" onClick={onClose}>✕</button>

        <div id="rating-anim">
          <RatingStars score={avg(hotel)} star={star} />
        </div>

        <div id="reviews">
          {hotel.reviews.length
            ? hotel.reviews.map((r, idx) => (
                <p key={idx}><b>{r.user}</b> ({r.rating}/5): {r.comment}</p>
              ))
            : <p>No reviews yet.</p>}
        </div>
      </div>
    </div>
  )
}
