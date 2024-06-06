import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_REVIEW } from '../../utils//mutations';
import { GET_RESTAURANT } from '../../utils/queries';

const AddReview = ({ restaurantId }) => {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(1);
  const [addReview] = useMutation(ADD_REVIEW, {
    refetchQueries: [{ query: GET_RESTAURANT, variables: { id: restaurantId } }],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addReview({ variables: { restaurantId, comment, rating } });
      setComment('');
      setRating(1);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Leave a Review</h2>
      <label>
        Comment:
        <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} />
      </label>
      <label>
        Rating:
        <select value={rating} onChange={(e) => setRating(parseInt(e.target.value))}>
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddReview;
