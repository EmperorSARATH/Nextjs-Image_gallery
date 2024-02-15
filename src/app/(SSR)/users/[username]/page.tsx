import { UnsplashUser } from "@/models/unsplash-user";
import { notFound } from "next/navigation";

 interface PageProps{
    params:{username:string},
}

export default async function Page({params:{ username}}:PageProps){
    
    const response = await fetch(`https://api.unsplash.com/users/${username}?client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`);
    if(response.status === 404) notFound();
    const user:UnsplashUser = await response.json();

    return(
        <div>
            <h1>{user.username}</h1>
            <p>First name: {user.first_name}</p>
            <p>Last name: {user.last_name}</p>
            <a href={"https//unsplash.com/"+ user.username}>Unsplash profile</a>
        </div>
    )
}