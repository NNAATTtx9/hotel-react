import { avg } from '../api.js'
import Gallery from './Gallery.jsx'

// one hotel card
export default function HotelCard({ hotel: h, price, currency, onReviews }) {
  return (
    <div className="card">
      <Gallery name={h.name} />
      <h3>{h.name}</h3>
      <p>{h.distance} miles</p>
      <p><b>Rating: {avg(h).toFixed(1)} out of 5.0</b></p>
      <p>Based on {h.reviews.length} reviews</p>
      <p>Total Amenities : {h.amenities.length}</p>
      <p>From* <b>${price} {currency}</b></p>
      <button className="review-btn" onClick={onReviews}>Reviews</button>
    </div>
  )
}
