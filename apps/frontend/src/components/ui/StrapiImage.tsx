import Image from "next/image";
import { getStrapiImageUrl } from "@/lib/utils";
import type { StrapiImage as StrapiImageType } from "@/lib/types";

interface StrapiImageProps {
  image: StrapiImageType | null | undefined;
  alt?: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
}

export default function StrapiImage({
  image,
  alt,
  className,
  fill,
  width,
  height,
  sizes,
  priority,
}: StrapiImageProps) {
  if (!image) return null;
  const url = getStrapiImageUrl(image.url);
  const altText = alt || image.alternativeText || "";

  if (fill) {
    return (
      <Image
        src={url}
        alt={altText}
        fill
        className={className}
        sizes={sizes}
        priority={priority}
      />
    );
  }

  return (
    <Image
      src={url}
      alt={altText}
      width={width || image.width}
      height={height || image.height}
      className={className}
      sizes={sizes}
      priority={priority}
    />
  );
}
