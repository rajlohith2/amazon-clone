import React from 'react';
export default function Rating ({numReviews, rates, caption}){
    return (
      
            <div className="rating">
                
                        <span>
                            <i className={
                            rates >= 1 ? "fa fa-star" :rates >= 1.5 ? "fa fa-star-half-o":
                            "fa fa-star-o"
                        }></i>
                        </span>
                        <span>
                            <i className={
                            rates >= 2 ? "fa fa-star" :rates >= 2.5 ? "fa fa-star-half-o":
                            "fa fa-star-o"
                        }></i>
                        </span>
                        <span>
                            <i className={
                            rates >= 3 ? "fa fa-star" :rates >= 3.5 ? "fa fa-star-half-o":
                            "fa fa-star-o"
                        }></i>
                        </span>
                        <span>
                            <i className={
                            rates >= 5 ? "fa fa-star" :rates >= 5.5 ? "fa fa-star-half-o":
                            "fa fa-star-o"
                        }></i>
                        </span>
                                
               <div className="ml-4">    
                 { 
                    caption ?(<span>{caption}</span>):(<span>{numReviews} Reviews</span>)
                 }               
                
                </div>
            </div>
         
            
    )
}