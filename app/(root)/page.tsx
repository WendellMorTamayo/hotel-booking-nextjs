import ListingCard from "@/components/ListingCard";
import { NoItems } from "@/components/NoItem";
import React from "react";

const data = [
  {
    imagePath: "/assets/images/shangarh.webp",
    description:
      "Our Hostel in Shangarh is nestled under the verdant, forested mountain ranges of the Great Himalayan National Park. Dipped in scenic beauty and a meditative quiet air, this backpackers’ hostel in Himachal Pradesh offers sublime views of snow-capped mountains with an environment suited for artists, digital nomads, and creators.",
    location: "Himachal Pradesh, India",
    price: 1266,
  },
  {
    imagePath: "/assets/images/treehouse.webp",
    description:
      "Nature and rustic luxury in one self-contained space best describes Treehouse de Valentine. Unconventional for the right reasons, this dream house is the perfect nest away from the hustle and bustle of Cebu City.",
    location: "Treehouse in Balamban, Philippines",
    price: 14000,
  },
  {
    imagePath: "/assets/images/carcarhome.webp",
    description:
      "Our place is a 4 bedroom home nestled on a hill that gives a very good view of the surrounding mountains and the beautiful sunsets. A place of quiet and serenity, you will enjoy the beauty of nature at its best. It’s perfect for families and friends who want privacy and peace.",
    location: "Entire home in Carcar City, Philippines",
    price: 5250,
  },
  {
    imagePath: "/assets/images/treehouse2.webp",
    description:
      "Nature and rustic luxury in one self-contained space best describes Treehouse de Valentine. Unconventional for the right reasons, this dream house is the perfect nest away from the hustle and bustle of Cebu City.",
    location: "Treehouse in Balamban, Philippines",
    price: 12609,
  },
  {
    imagePath: "/assets/images/farmstay.webp",
    description:
      "Sitting on a 1.7 hectares of lush space and abundant vegetation, Sundaze Farm is a private getaway destination in a stunning garden setting with fabulous landscaping and fresh air. Opening again after the pandemic, Sundaze Farm now exclusively offers overnight stays to enjoy the lush space and calm surroundings that nature has to offer.",
    location: "Farm stay in Carcar City, Philippines",
    price: 5785,
  },
  {
    imagePath: "/assets/images/dalaguete.webp",
    description:
      "This listing option of yours permits stay at one (1) of the six (6) domes at 150 Peakway. This is one part of the property’s glamping experiences. It has all the features and amenities fitted for the happy camper. Enjoy elevated glamping in your dome – ignite the camper spirit as you lounge in your own outdoor roofed deck or have the best night sleep knowing you’re directly laying before the stars.",
    location: "Private room in dome in Dalaguete, Philippines",
    price: 5380,
  },
  {
    imagePath: "/assets/images/argao.webp",
    description:
      "Exclusive beach house for your family and friends. You deserve a break.",
    location: "Entire home in Argao, Philippines",
    price: 5785,
  },
  {
    imagePath: "/assets/images/catmon.webp",
    description:
      "Quiet, intimate, and beautifully spacious to accommodate big families and groups, Castle Shore is all about that much needed luxury staycation. Situated in Catmon Cebu, this listing features a main house and a seaview villa.",
    location: "Entire vacation home in Catmon, Philippines",
    price: 26000,
  },
  {
    imagePath: "/assets/images/carmen.webp",
    description:
      "The entire place is HUGE! It's fully furnished with upscale furniture, granite counter-tops, kitchen and living room appliances. Pool area and the terrace is the perfect place for gatherings. The beach is also home to a lot of marine life. It's also a good place for diving. ",
    location: "Entire home in Carmen, Philippines",
    price: 13539,
  },
];

export default function Home() {
  return (
    <section className="wrapper mx-auto px-5 lg:px-10">
      {data.length > 0 ? (
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8 my-2">
          {data.map((item, index) => (
            <ListingCard
              key={index}
              imagePath={item.imagePath}
              description={item.description}
              location={item.location}
              price={item.price}
            />
          ))}
        </div>
      ) : (
        <NoItems
          description="Please check a other category or create your own listing!"
          title="Sorry no listings found for this category..."
        />
      )}
    </section>
  );
}
