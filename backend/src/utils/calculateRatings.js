function calculateRatings(reviews) {
    const ratings = reviews.reduce((sum, review) => sum + review.rating,0);
    const overallRating = ratings / reviews.length;
    return overallRating;
}

export default calculateRatings;