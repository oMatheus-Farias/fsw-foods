import Image, { ImageProps } from "next/image";

const PromoBanner = (props: ImageProps) => {
  return (
    <Image
      height={0}
      width={0}
      sizes="100%"
      className="h-auto w-full object-contain"
      quality={100}
      {...props}
    />
  );
};

export default PromoBanner;
