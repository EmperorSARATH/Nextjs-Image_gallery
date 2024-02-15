import { UnsplashImage } from "@/models/unsplash-image";
import Image from  "next/image";
import styles from "./TopicPage.module.css";
import { ReactElement } from "react";
import {Alert} from "@/components/bootstrap";
import { Metadata } from "next";

interface PageProps{
    params:{topic:string},
    //searchParams:{[key:string]:string | string[] | undefined},

}

export function generateMetadata({params:{topic}}:PageProps):Metadata{
    return {
        title:topic + "Nextjs Image Gallery",
    }
}

export function generateStaticParams(){
    return ["health","fitness","coding"].map(topic=>{{topic}});
}

export default async function Page({params:{topic}}:PageProps){
    const response = await fetch(`https://api.unsplash.com/photos/random?query=${topic}&count=30&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`);
    const images:UnsplashImage[] = await response.json();
    return(
        <div>
            <Alert>
                This page uses <strong>generateStaticParams</strong> to render
                and cache static pages at build time, even though the URL has a dynamic
                parameter. Pages that are not included in generateStaticParams will be fetched and
                rendered on first access and then <strong>cached for subsequent requests</strong>
            
            </Alert>
            <h1>{topic}</h1>
            {
            images.map((image):any=>{
                return(
                    <Image
                    src={image.urls.raw}
                    width={250}
                    height={250}
                    alt={image.description}
                    key={image.urls.raw}
                    className={styles.image}
                  />

                )
                   
                })
            }
               
            
            </div>
    )
}