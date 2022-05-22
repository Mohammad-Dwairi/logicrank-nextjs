import classes from './styles.module.scss';
import Post from "./Post";
import {useEffect, useState} from "react";
import {fbQueryDocs} from "../../firebase/functions/firestore-docs-functions";
import {useRouter} from "next/router";
import {collection, limit, orderBy, query} from "firebase/firestore";
import {db} from "../../firebase/firebase";
import {POSTS_COLLECTION, ROOMS_DETAILS_COLLECTION} from "../../firebase/constants/COLLECTIONS";

const renderPosts = posts => Object.keys(posts).map(postUID => <Post post={posts[postUID]} key={postUID}/>);

const NewsFeedSection = () => {

    const [posts, setPosts] = useState({});
    const {rid} = useRouter().query;

    useEffect(() => {
        const handle = async () => {
            const postsColRef = collection(db, ROOMS_DETAILS_COLLECTION, rid, POSTS_COLLECTION);
            const q = query(postsColRef, orderBy("datePosted", "desc"), limit(100));
            const fetchedPosts = await fbQueryDocs(q);
            setPosts(fetchedPosts);
        };
        handle();
    }, []);


    return (
        <section className={classes.newsFeed}>
            {renderPosts(posts)}
        </section>
    );
};

export default NewsFeedSection;