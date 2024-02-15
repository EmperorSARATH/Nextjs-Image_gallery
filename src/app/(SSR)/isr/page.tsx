import { UnsplashImage } from "@/models/unsplash-image";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {Alert} from "@/components/bootstrap";

export const metadata: Metadata = {
    title: "Incremental fetching - Nextjs Image Gallery",

  };

  export const revalidate = 15;

  export default async function Page(){
    const response = await fetch("https://api.unsplash.com/photos/random?client_id="+ process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
    {
        // cache:"no-cache",
        // next:{revalidate:0}
    });
    const image = await response.json();

    const width = Math.min(500,image.width);
    const height = (width/image.width) * image.height;

    return(
        <div className="d-flex flex-column align-items-center">
            <Alert>
              This page uses <strong>incremental static regeneration</strong>.
              A new image is fethced every 15 seconds (after refreshing the page)
              and then served from cache of that duration.

            </Alert>

            <Image
                src={image.urls.raw}
                width={width}
                height={height}
                alt={image.description}
                className="rounded shadow mw-100 h-100"
            />
            by <Link href={"/users/"+image.user.username}>{image.user.username}</Link>

        </div>
    )
  }