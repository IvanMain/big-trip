import { offersMock } from '../mock/offers-mock';

export default class OffersModel {
  constructor() {
    this.offers = offersMock;
  }

  get() {
    return this.offers;
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
