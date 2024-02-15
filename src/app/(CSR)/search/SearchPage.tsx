"use client"
import { UnsplashImage } from "@/models/unsplash-image";
import { FormEvent, useState } from "react";
import { Button, Form, FormControl, Image, Spinner } from "react-bootstrap";
import styles from "./SearchPage.module.css";
export default function SearchPage(){

    const [searchResults, setsearchResults] = useState <UnsplashImage[] | null>(null);
    const [searchResultsLoading,setsearchResultsLoading] = useState(false);
    const [searchResultsloadingIsError, setsearchResultsLoadingIsError] = useState(false);

    async function handleSubmit(e:FormEvent<HTMLFormElement>){
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const query = formData.get("query")?.toString().trim();

        if(query){

            try {
            setsearchResults(null);
            setsearchResultsLoadingIsError(false);
            setsearchResultsLoading(true);
            const response = await fetch("/api/search?query="+query);
            const images: UnsplashImage[] = await response.json();
            setsearchResults(images);
                
            } catch (error) {
                console.error(error);
                setsearchResultsLoadingIsError(true);
            } finally{
                setsearchResultsLoading(false);
            }
            
        }
    }
    return(
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="search-input">
                    <Form.Label>
                        Search Query
                    </Form.Label>
                    <FormControl
                        name="query"
                        placeholder="E.g. cats,coding,..."
                    />

                </Form.Group>

                <Button type="submit" className="mb-3" disabled={searchResultsLoading}>
                    Search
                </Button>

            </Form>

            <div className="d-flex flex-col align-items-center">
                {searchResultsLoading && <Spinner animation="border"/>}
                {searchResultsloadingIsError && <p>Somethinh went wrong please try again.</p>}
                {searchResults?.length === 0 && <p>Try a different query</p>}
            </div>
            {
                searchResults &&
                <>
                    {
                        searchResults.map(image=>{
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
                </>
            }
        </div>
    )
}