import Image from "next/image";

export default function Images({ images }) {
  return (
    <div>
      {images.map((image) => (
        <Image src={image.url} height={image.height} width={image.width} layout="responsive" />
      ))}
    </div>
  );
}
