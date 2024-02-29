import React from 'react'
import loading from './loading-buffering.gif'

const Spinner = () => {

    return (
      <div className='text-center'>
        <img src={loading} alt="" />
      </div>
    )
}
export default Spinner