import React from 'react'

export default function VideoSection({ videoKey }) {
  return (
    <div className='w-10/12 md:w-3/5 mx-auto mt-3'>
      <div
        className='relative w-full overflow-hidden rounded-sm'
        style={{ paddingBottom: '56.25%' }}
      >
        <iframe
          className='absolute top-0 left-0 w-full h-full'
          allowFullScreen
          title='Youtube video'
          src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&mute=1`}
        />
      </div>
    </div>
  )
}