import React from 'react';
export default function Rating ({numReviews, rates}){
    return (
        <>
            <div className="product-rating flex">
                <div> 
                        
                        <span>
                            <i className={
                            rates >= 1 ? "fas fa-star" :rates >= 1.5 ? "fas fa-star":
                            "far fa-star"
                        }></i>
                        </span>
                        <span>
                            <i className={
                            rates >= 2 ? "fas fa-star" :rates >= 2.5 ? "fas fa-star-half-o":
                            "fas fa-star-o"
                        }></i>
                        </span>
                        <span>
                            <i className={
                            rates >= 3 ? "fas fa-star" :rates >= 3.5 ? "fas fa-star-half-o":
                            "fas fa-star-o"
                        }></i>
                        </span>
                        <span>
                            <i className={
                            rates >= 4 ? "fas fa-star" :rates >= 4.5 ? "fas fa-star-half-o":
                            "fas fa-star-o"
                        }></i>
                        </span>
                </div>                
               <div className="ml-4">
                   {numReviews} Reviews
                </div>
            </div>
        </>    
            
    )
}