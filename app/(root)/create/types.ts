import { z } from "zod";

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

export const createDescriptionSchema = z.object({
  coverImageUrl: z.string().min(1, { message: "Cover Image is required" }),
  title: z.string().min(1, { message: "Title is required" }),
  description: z
    .string()
    .min(1, { message: "Description is required" })
    .max(255, { message: "Description must be less than 255 characters" }),
  price: z.string().refine((val) => parseFloat(val) > 0, {
    message: "Price must be a positive number",
  }),
  guest: z
    .number()
    .int()
    .positive({ message: "Guest must be a positive number" }),
  room: z
    .number()
    .int()
    .positive({ message: "Room must be a positive number" }),
  bathroom: z
    .number()
    .int()
    .min(1, { message: "Bathroom must be a positive number" }),
  specialNote: z
    .string()
    .max(255, { message: "Special note must be less than 255 characters" }),
});

export const searchComponentSchema = z.object({
  location: z.string().min(1, { message: "Location is required" }),
  guest: z
    .number()
    .int()
    .positive({ message: "Guest must be a positive number" }),
  room: z
    .number()
    .int()
    .positive({ message: "Room must be a positive number" }),
  bathroom: z
    .number()
    .int()
    .min(1, { message: "Bathroom must be a positive number" }),
});
