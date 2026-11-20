import Image from "next/image";
import type { Profile } from "@/src/config/site";
import { hasLocalPhoto } from "./localPhoto";

export function ProfileHeader({ profile }: { profile: Profile }) {
  const { name, username, bio, tagline, photoPath, photoPosition } = profile;
  const initials = name.trim().split(/\s+/).slice(0, 2)
    .map((word) => Array.from(word)[0]).join("").toUpperCase();

  return (
    <header className="profile">
      <div className="profile-copy">
        <p className="username">{username}</p>
        <h1>{name}</h1>
        <p className="bio">{bio}</p>
        <p className="tagline">{tagline}</p>
      </div>
      <div className="portrait" aria-hidden="true">
        {hasLocalPhoto(photoPath) ? (
          <Image alt="" src={photoPath} fill unoptimized fetchPriority="high" loading="eager" style={{ objectPosition: photoPosition, transformOrigin: photoPosition }} />
        ) : (
          <span>{initials}</span>
        )}
      </div>
    </header>
  );
}
