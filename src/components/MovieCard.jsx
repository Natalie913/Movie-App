import React from 'react'
import { useMovie } from '../context/MovieContext'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function MovieCard({ movie }) {
  const { defaultImage, IMG_API_URL } = useMovie()
  const { id, poster_path, title, overview, vote_average } = movie
  const { currentUser } = useAuth()
  const navigate = useNavigate()

  const getVoteClass = (vote) => {
    if (vote >= 8) return 'green'
    else if (vote >= 6) return 'orange'
    else return 'red'
  }

  return (
    <div className='movie' onClick={() => navigate(`/details/${id}`)}>
      <img
        src={poster_path ? `${IMG_API_URL}${poster_path}` : defaultImage}
        alt={title}
      />
      <div className='flex align-center justify-between p-1 text-white'>
        <h5 className='p-3  font-semibold'>{title}</h5>
        {currentUser && (
          <span className={`tag ${getVoteClass(vote_average)}`}>
            {vote_average.toFixed(1)}
          </span>
        )}
        <div className='movie-over'>
          <h2 className='text-center font-semibold'>Overview</h2>
          <p className='text-justify'>{overview}</p>
        </div>
      </div>
    </div>
  )
}