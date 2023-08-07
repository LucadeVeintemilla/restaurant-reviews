import React, { useState, useEffect } from "react";
import RestaurantDataService from "../services/restaurant";
import { Link } from "react-router-dom";
import {  useParams } from "react-router"; // Import from 'react-router'

const Restaurant = props => {
  const { id } = useParams();
  

  const initialRestaurantState = {
    id: null,
    name: "",
    address: {},
    cuisine: "",
    reviews: [] // Set 'reviews' as an empty array
  };
  
  const [restaurant, setRestaurant] = useState(initialRestaurantState);

  const getRestaurant = (id) => {
    RestaurantDataService.get(id)
      .then(response => {
        if (Array.isArray(response.data.reviews)) {
          setRestaurant(response.data);
        } else {
          // Handle the case where reviews is not an array
          // You could set it to an empty array or handle it differently based on your requirements
          setRestaurant(prevState => ({
            ...prevState,
            reviews: []
          }));
        }
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };
  



  useEffect(() => {
    getRestaurant(id); // Use 'id' from useParams hook directly
  }, [id]); // Use 'id' in the dependency array

  const deleteReview = (reviewId, index) => {
    RestaurantDataService.deleteReview(reviewId, props.user.id)
      .then(response => {
        setRestaurant((prevState) => {
          prevState.reviews.splice(index, 1)
          return({
            ...prevState
          })
        })
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {restaurant ? (
        <div>
          <h5>{restaurant.name}</h5>
          <p>
            <strong>Cuisine: </strong>{restaurant.cuisine}<br/>
          </p>
          <button className="btn btn-primary">
        <Link to={`/restaurants/${id}/review`} className="text-white">
          Add Review
        </Link>
      </button>
          <h4> Reviews </h4>
          <div className="row">
            {restaurant.reviews.length > 0 ? (
             restaurant.reviews.map((review, index) => {
               return (
                 <div className="col-lg-4 pb-1" key={index}>
                   <div className="card">
                     <div className="card-body">
                       <p className="card-text">
                         {review.text}<br/>
                         <strong>User: </strong>{review.name}<br/>
                         <strong>Date: </strong>{review.date}
                       </p>
                       
                     </div>
                   </div>
                 </div>
               );
             })
            ) : (
            <div className="col-sm-4">
              <p>No reviews yet.</p>
            </div>
            )}

          </div>

        </div>
      ) : (
        <div>
          <br />
          <p>No restaurant selected.</p>
        </div>
      )}
    </div>
  );
};

export default Restaurant;