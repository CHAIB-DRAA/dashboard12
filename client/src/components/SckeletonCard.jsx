import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const SckeletonCard = () => {
  return (
    <div className="card-skeleton" style = {{
        display: "flex",
        flexDirection: "row",
        justifyContent:"space-between",
        flexWrap:"wrap",
        width: "70vw",
        height: "70vh",
        margin: "auto",
        padding: "1rem",
        border: "1px solid grey",
        borderRadius: "5px",
    }}>
        <div className="left-columns" style={{ width:"50%" , height: "10px"  }} > 
            <Skeleton count={8} style= {{ marginTop:"2rem"}}/>
        </div>
        <div className="right-columns">
            <Skeleton width={400} height={400} />
        </div>
    </div>
  )
}

export default SckeletonCard