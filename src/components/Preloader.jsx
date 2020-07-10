import React from 'react';
import loader from '../image/loader.gif'
import './components-style.css'

const Preloader = (props) => {
    return <div className='preloader'><img src={loader}/></div>
}
export default Preloader