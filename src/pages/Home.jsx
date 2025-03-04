import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useMovie } from '../context/MovieContext'
import { useAuth } from '../context/AuthContext'
import MovieCard from '../components/MovieCard'
import { MoonLoader } from 'react-spinners'
import { toast } from 'react-toastify'

export default function Home() {
    const { movies, loading, getMovies, searchMovieUrl } = useMovie()
    const [searchItem, setSearchItem] = useState('')
    const { currentUser } = useAuth()

    const submitHandler = (e) => {
        e.preventDefault()
        console.log(`${searchMovieUrl}${searchItem}`)
        if (currentUser && searchItem) getMovies(`${searchMovieUrl}${searchItem}`)
        else if (!currentUser) toast.warn('Please login to search movies')
        else toast.warn('Please Enter a movie name')
      }

    return (
        <>
        <form className='flex justify-center p-2 my-5' onSubmit={submitHandler}>
          <input
            type='search'
            className='w-80 form-input h-11 mr-2'
            onChange={(e) => setSearchItem(e.target.value)}
            value={searchItem}
          />
        </form>
        <div className='flex justify-center flex-wrap'>
          {loading ? (
            <div className='mt-48 flex justify-center items-center'>
              <MoonLoader color='red' />
            </div>
          ) : (
            movies?.map((movie) => <MovieCard movie={movie} key={movie.id} />)
          )}
        </div>
      </>
    )
  }