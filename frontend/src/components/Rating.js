import React from 'react';
export default function Rating ({numReviews, rates}){
    return (
        <>
            <div className="product-rating flex">
                <div>
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
                            rates >= 4 ? "fa fa-star" :rates >= 4.5 ? "fa fa-star-half-o":
                            "fa fa-star-o"
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