import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const ImageCarousel = ({ gallery }) => {
  return (
    <Swiper
      style={{ "--swiper-navigation-color": "#fff" }}
      loop={true}
      spaceBetween={10}
      navigation={true}
      modules={[Navigation]}
      className="w-full max-h-[600px]"
    >
      <SwiperSlide>
        <img src={gallery[0]} className="w-full h-full object-contain" />
      </SwiperSlide>
    </Swiper>
  );
};

export default ImageCarousel;