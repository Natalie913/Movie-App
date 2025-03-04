import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMovie } from '../context/MovieContext';
import { useAuth } from '../context/AuthContext';
import MovieCard from '../components/MovieCard';
import { MoonLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { FaSearch } from 'react-icons/fa';

export default function Home() {
    const { movies, loading, getMovies, searchMovieUrl } = useMovie();
    const [searchItem, setSearchItem] = useState('');
    const { currentUser } = useAuth();

    const submitHandler = (e) => {
        e.preventDefault();
        console.log(`${searchMovieUrl}${searchItem}`);
        if (currentUser && searchItem) {
            getMovies(`${searchMovieUrl}${searchItem}`);
        } else if (!currentUser) {
            toast.warn('Please login to search movies');
        } else {
            toast.warn('Please enter a movie name');
        }
    };

    return (
        <>
            <form className='flex justify-center items-center p-2 my-5' onSubmit={submitHandler}>
                <label className="mr-2 text-lg text-gray-700 dark:text-white">Search</label>
                <div className="flex items-center border-2 border-gray-300 rounded-md p-2">
                    <FaSearch className="text-gray-500 dark:text-white" />
                    <input
                        type='search'
                        className='w-80 h-11 p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-red-500'
                        onChange={(e) => setSearchItem(e.target.value)}
                        value={searchItem}
                        placeholder="Enter movie name"
                    />
                </div>
            </form>

            <div className='flex justify-center flex-wrap'>
                {loading ? (
                    <div className='mt-48 flex justify-center items-center'>
                        <MoonLoader color='red' />
                    </div>
                ) : movies?.length === 0 ? (
                    <div className='text-center mt-10'>No movies found. Please try again.</div>
                ) : (
                    movies?.map((movie) => <MovieCard movie={movie} key={movie.id} />)
                )}
            </div>
        </>
    );
}
