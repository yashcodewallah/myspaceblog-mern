import React from 'react'
import "./header.css"
import Backimg from "./background.jpg"
export default function Header() {

  const BackgroundImage = React.memo(({ src, alt })=> {
    // Perform expensive computation here
    return (<img className='header-img' src={src} alt={alt} ></img>)
  }, []);


  return (
    <div className='header'>
<div className='headertitle'>
    <div className='headertitlesm'>My SPACE</div>
    <div className='headertitlelg'>Blog</div>
    <BackgroundImage src={Backimg} alt=""/>
</div>

    </div>
  )
}
