import Image from "next/image";
import { hasLocalPhoto } from "./localPhoto";

type EditorialPhotoProps = {
  photoPath: string;
  alt: string;
  caption: string;
};

export function EditorialPhoto({ photoPath, alt, caption }: EditorialPhotoProps) {
  const hasPhoto = hasLocalPhoto(photoPath);

  return (
    <figure className="editorial" data-photo={hasPhoto || undefined}>
      {hasPhoto && (
        <div className="editorial-image">
          <Image alt={alt} src={photoPath} fill unoptimized />
        </div>
      )}
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
