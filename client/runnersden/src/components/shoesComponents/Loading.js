import React, { useEffect, useState } from 'react'

function Loading() {

  
    const [renderLoader,setRenderLoader] = useState(true);

    useEffect(()=>{
        setTimeout(() => setRenderLoader(false), 2000);
      },[]);
      
    

    return (
        renderLoader ? <div class="loader"></div> : <div className='noResults'>No Results Found! Please expand your search conditions.</div>
    );
}

export default Loading