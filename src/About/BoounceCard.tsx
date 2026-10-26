import { BounceCards } from "./cardsecondSlide";


const images = [
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=500&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1426604966848-d7adacbd02bff?w=500&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=500&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=500&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&auto=format&fit=crop&q=60"
];

const transformStyles = [
  "rotate(5deg) translate(-150px)",
  "rotate(0deg) translate(-70px)",
  "rotate(-5deg)",
  "rotate(5deg) translate(70px)",
  "rotate(-5deg) translate(150px)"
];

export default function MyComponent() {
  return (
    <BounceCards
      className="custom-bounceCards"
      images={images}
      containerWidth={460}
      containerHeight={260}
      animationDelay={0.3}
      animationStagger={0.08}
      easeType="elastic.out(1, 0.5)"
      transformStyles={transformStyles}
      enableHover={true}
    />
  );
}