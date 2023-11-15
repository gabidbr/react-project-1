import {Post as IPost} from './Main'
import {addDoc, collection, deleteDoc, doc, getDocs, query, where} from "firebase/firestore";
import {auth, db} from "../config/firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import {useEffect, useState} from "react";
import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from "@mui/material/Typography";
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'

interface Props {
    post: IPost
}

interface Like {
    likeId: string;
    userId: string;
}

export const Post = (props: Props) => {
    const {post} = props
    const [user] = useAuthState(auth)

    const likesRef = collection(db, "likes");
    const likesDoc = query(likesRef, where("postId", "==", post.id));
    const [likes, setLikes] = useState<Like[] | null>(null)
    const addLike = async () => {
        try {
            const newDoc = await addDoc(likesRef, {
                userId: user?.uid,
                postId: post.id
            })
            if (user) {
                setLikes((prev) => prev ?
                    [...prev, {userId: user?.uid, likeId: newDoc.id}] :
                    [{userId: user?.uid, likeId: newDoc.id}]
                );
            }
        } catch (err) {
            console.log(err)
        }
    };

    const removeLike = async () => {
        try {
            const  likeToDeleteQuery = query(likesRef,
                where("postId","==",post.id),
                where("userId", "==",user?.uid));
            const likeToDeleteData = await getDocs(likeToDeleteQuery);
            const likeId = likeToDeleteData.docs[0].id
            const likeToDelete = doc(db, "likes", likeId)
            await deleteDoc(likeToDelete);
            if (user) {
                setLikes((prev) => prev && prev.filter((like) => like.likeId !== likeId)
                );
            }
        } catch (err) {
            console.log(err)
        }
    };

    const hasUserLiked = likes?.find((like) => like.userId === user?.uid)

    const getLikes = async () => {
        const data = await getDocs(likesDoc)
        setLikes(data.docs.map((doc) => ({userId: doc.data().userId, likeId:doc.id})));
    };

    useEffect(() => {
        getLikes()
    }, [])

    return (
        <Card>
            <CardHeader title={post.title} subheader={`@${post.username}`}/>
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {post.description}
                </Typography>
            </CardContent>
            <CardContent>
                <IconButton onClick={hasUserLiked ? removeLike : addLike}>
                    {hasUserLiked ? <FavoriteIcon/> : <FavoriteBorderIcon/>}
                </IconButton>
                {likes && <Typography>Likes: {likes.length}</Typography>}
            </CardContent>
        </Card>
    )
}