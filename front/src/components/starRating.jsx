import React from 'react';
import StarRatingComponent from 'react-star-rating-component';

export default (props) => {

  const rating = props.rating;
  return (

    <div>
      <StarRatingComponent
        name="rate1"
        starCount={5}
        value={rating}
      />
    </div>
  );
}
