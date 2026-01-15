import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function ScroolToTop() {
  const pathname = useLocation();

  useEffect(() => {
    window.scrollTo({top:0, behavior:"smooth"});
  } , [pathname])
}

export default ScroolToTop