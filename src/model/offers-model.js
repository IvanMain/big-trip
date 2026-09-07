import ApiService from '../service/api-service';

export default class OffersModel {
  #apiService = new ApiService();

  constructor() {
    this.offers = this.#apiService.offers();
  }

  get() {
    return ApiService.offers;
  }

  getOffersByType(type) {
    const allTypeOffers = this.offers.find((offer) => offer.type === type).offers;

    return {
      type,
      allTypeOffers,
    };
  }

  getOffersByPoint(point) {
    const { type: pointType, offers: selectedOfferIds } = point;

    const allTypeOffers = this.offers.find((offer) => offer.type === pointType).offers;
    const selectedOffers = allTypeOffers.filter((offer) => selectedOfferIds.includes(offer.id));

    return {
      type: pointType,
      allTypeOffers,
      selectedOffers
    };
  }
}
