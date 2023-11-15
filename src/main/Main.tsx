import {collection, getDocs} from 'firebase/firestore'
import {db} from '../config/firebase'
import React, {useEffect, useState} from "react";
import Card from '@mui/material/Card'
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {Post} from "./post";

export interface Post {
    id: string;
    userId: string;
    title: string;
    username: string;
    description: string;
}

export const Main = () => {
    const [postsList, setPostsList] = useState<Post[] | null>(null)
    const postsRef = collection(db, "posts");

    const getPosts = async () => {
        const data = await getDocs(postsRef)
        setPostsList(data.docs.map((doc) =>
            ({...doc.data(), id: doc.id})) as Post[]
        );
    };

    useEffect(() => {
        getPosts();
    }, [])
    return (
        <div>
            {postsList?.map((post) => (
                    <Card key={post.id}>
                        <Post post ={post}/>
                    </Card>
                )
            )}
        </div>
    )
}