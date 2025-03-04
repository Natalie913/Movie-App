import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useMovie } from '../context/MovieContext'
import VideoSection from '../components/VideoSection'

export default function MovieDetails() {
  const { id } = useParams()

  const [movieDetails, setMovieDetails] = useState({})
  const { getMovieDetails, IMG_API_URL, defaultImage } = useMovie()

  const {
    title,
    poster_path,
    overview,
    release_date,
    vote_average,
    vote_count,
  } = movieDetails

  useEffect(() => {
    const getData = async () => {
      const data = await getMovieDetails(id)
      setMovieDetails(data)
      console.log(data)
    }
    getData()
  }, [])

  const videoKey = movieDetails?.videos?.results[0]?.key

  return (
    <div className='md:container px-10 mx-auto py-5'>
      <h1 className='text-center text-3xl dark:text-slate-200'>{title}</h1>
      {videoKey && <VideoSection videoKey={videoKey} />}
      <div className='md:container flex justify-center px-10 mt-5'>
        <div className='flex flex-col lg:flex-row w-2/3 rounded-lg bg-gray-100 shadow-lg dark:bg-gray-700'>
          <img
            src={poster_path ? `${IMG_API_URL}${poster_path}` : defaultImage}
            alt={title}
          />
          <div className='p-6 flex flex-col justify-between '>
            <div>
              <h5 className='text-gray-900 text-xl font-medium mb-2 dark:text-gray-200 text-center'>
                Overview
              </h5>
              <p className='text-gray-700 text-base mb-4 dark:text-slate-200'>
                {overview}
              </p>
            </div>

            <ul className='bg-gray-100 rounded-lg border-gray-400 text-gray-900'>
              <li className='flex justify-between px-6 py-2 border-b border-gray-400 w-full rounded-t-lg'>
                <span className='font-semibold'>Release Date</span>
                <span>{release_date}</span>
              </li>
              <li className='flex justify-between px-6 py-2 border-b border-gray-400 w-full '>
                <span className='font-semibold'>Rate</span>
                <span>{vote_average}</span>
              </li>
              <li className='flex justify-between px-6 py-2 border-b border-gray-400 w-full'>
                <span className='font-semibold'>Total Votes</span>
                <span>{vote_count}</span>
              </li>
              <li className='px-6 py-2 border-gray-400 w-full rounted-t-lg text-center'>
                <Link
                  to={-1}
                  className='text-blue-600 hover:text-blue-700 transition duration-300 ease-in-out'
                >
                  Back
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}