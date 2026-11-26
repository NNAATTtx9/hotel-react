import { useEffect, useState } from 'react'
import { API, BASE, get, avg } from './api.js'
import HotelCard from './components/HotelCard.jsx'
import ReviewModal from './components/ReviewModal.jsx'

export default function App() {
  // ===== PART 1: data loaded from the API =====
  const [city, setCity]     = useState('')
  const [hotels, setHotels] = useState([])   // from hotel.json
  const [rates, setRates]   = useState({})   // from exchange.json
  const [star, setStar]     = useState('')   // markup of rating.svg
  const [error, setError]   = useState('')

  // ===== the two dropdowns =====
  const [sortBy, setSortBy]     = useState('distance') // distance | price | rating
  const [currency, setCurrency] = useState('USD')

  // ===== popup: the hotel whose reviews are open (null = closed) =====
  const [selected, setSelected] = useState(null)

  // load all three files at the same time, once
  useEffect(() => {
    Promise.all([
      get(API + '/hotel.json'),
      get(API + '/exchange.json'),
      get(BASE + 'rating.svg', 'text'),
    ])
      .then(([h, e, svg]) => {
        setCity(h.city)
        setHotels(h.hotels)
        setRates(e.rates)
        setStar(svg)
      })
      .catch(err => {
        console.error(err)
        setError('... could not load data from the API. Is Apache running in XAMPP?')
      })
  }, [])

  // ===== PART 2: sort (React re-runs this whenever a dropdown changes) =====
  const list = [...hotels].sort((a, b) =>
    sortBy === 'rating' ? avg(b) - avg(a)   // best rating first
                        : a[sortBy] - b[sortBy]) // smallest distance / price first

  const rate = rates[currency] ?? 1

  return (
    <>
      <header>
        <label>Sort by
          <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
            <option value="distance">Distance</option>
            <option value="price">Price</option>
            <option value="rating">Rating</option>
          </select>
        </label>
        <label>Select currency
          <select value={currency} onChange={e => setCurrency(e.target.value)}>
            {Object.keys(rates).map(c => <option key={c}>{c}</option>)}
          </select>
        </label>
      </header>

      <hr />
      <h2>Hotels in {error || city}</h2>

      <div id="hotels">
        {list.map(h => (
          <HotelCard
            key={h.id}
            hotel={h}
            price={Math.round(h.price * rate)}
            currency={currency}
            onReviews={() => setSelected(h)}
          />
        ))}
      </div>

      <footer>©2025 WSS POC</footer>

      {selected && (
        <ReviewModal hotel={selected} star={star} onClose={() => setSelected(null)} />
      )}
    </>
  )
}
