export interface HotelRoomDTO {
  hotelID?: number;
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
  offeredAmenities: AmenityDTO[];
  slug: string;
  coverImage: string;
}

interface AmenityDTO {
  icon: string;
  amenity: string;
}

export interface HotelRoomRequestDTO {
  userId: number;
  hotelRoom: HotelRoomDTO;
}
