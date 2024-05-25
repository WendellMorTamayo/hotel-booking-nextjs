export type HotelRoomProps = {
  id: number;
  roomImages: string[];
  name: string;
  location: string;
  description: string;
  contact: string;
  email: string;
  specialNote: string;
  price: number;
  isBooked: boolean;
  type: string;
  dimension: string;
  numberOfBeds: number;
  offeredAmenities: Amenity[];
  slug: string;
  coverImage: string;
};

type Amenity = {
  name: string;
  icon: string;
};
