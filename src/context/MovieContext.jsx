import axios from 'axios'
import { createContext, useContext, useEffect, useState } from 'react'

const MovieContext = createContext()
const API_KEY = import.meta.env.VITE_MOVIE_APIKEY
// URLs
const BASE_URL = 'https://api.themoviedb.org/3'
const IMG_API_URL = 'https://image.tmdb.org/t/p/w1280'
const discoverMovieUrl = `${BASE_URL}/discover/movie?api_key=${API_KEY}`
const searchMovieUrl = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=`
const defaultImage =
  'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)

  const getMovies = async (URL) => {
    setLoading(true)
    try {
      const { data } = await axios.get(URL)
      setMovies(data.results)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getMovies(discoverMovieUrl)
  }, [])
  const getMovieDetails = async (id) => {
    const movieDetailsUrl = `${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=videos`

    try {
      const { data } = await axios.get(movieDetailsUrl)

      return data
    } catch (error) {
      console.log(error)
    }
  }

  const values = {
    movies,
    loading,
    getMovies,
    getMovieDetails,
    IMG_API_URL,
    searchMovieUrl,
    defaultImage,
  }

  return (
    <MovieContext.Provider value={values}>{children}</MovieContext.Provider>
  )
}

export const useMovie = () => useContext(MovieContext)