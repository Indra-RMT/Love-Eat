import API_ENDPOINT from '../globals/api-endpoint';
import CONFIG from '../globals/config';

class RestaurantDbSource {
  static async exploreRestaurant() {
    const response = await fetch(API_ENDPOINT.RESTAURANT_LIST);
    return response.json();
  }

  static async detailRestaurant(id) {
    const response = await fetch(API_ENDPOINT.RESTAURANT_DETAIL(id));
    return response.json();
  }

  static async postRestaurantReview(review) {
    const rawResponse = await fetch(API_ENDPOINT.POST_REVIEW_RESTAURANT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token-Type': CONFIG.KEY,
      },
      body: JSON.stringify({
        id: review.restaurantId,
        name: review.name,
        review: review.text,
      }),
    });
    return rawResponse.json();
  }
}

export default RestaurantDbSource;
