import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export interface InfiniteCarouselProps {
  images: string[];
}

export const ImageSlider: React.FC<InfiniteCarouselProps> = ({ images }) => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      {images.map((image, index) => (
        <div
          key={index}
          className="outline-none focus:outline-none object-cover"
        >
          <img
            src={image}
            alt={`slide-${index}`}
            className="w-full h-[300px] object-cover"
          />
        </div>
      ))}
    </Slider>
  );
};
