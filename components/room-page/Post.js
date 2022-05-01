import classes from './styles.module.scss';
import Image from "next/image";
import {BiDotsHorizontalRounded} from 'react-icons/bi';
import {AiOutlineComment, AiOutlineLike} from "react-icons/ai";

const Post = props => {

    const {post} = props;

    return (
        <div className={classes.post}>
            <div className={classes.postHeader}>
                <div className={classes.imageContainer}>
                    <Image src={require('../../public/profile.jpeg')} alt='photo' className={classes.image}/>
                </div>
                <div className={classes.postInfo}>
                    <div>
                        <h3 className={classes.username}>{post.userName}</h3>
                        <p className={classes.time}>{post.timePosted} hours ago</p>
                    </div>
                    <BiDotsHorizontalRounded className={classes.optionsIcon}/>
                </div>
            </div>
            <div className={classes.postContent}>
                <p className={classes.postText}>{post.text}</p>
                {post.imageURL &&
                    <div className={classes.postImage}>
                        <Image src={post.imageURL} alt='post img' width='100%' height='100%' layout='responsive'/>
                    </div>
                }
            </div>
            <div className={classes.postFooter}>
                <div className={classes.postAction}>
                    <AiOutlineLike />
                </div>
                <div className={classes.postAction}>
                    <AiOutlineComment />
                </div>
            </div>
        </div>
    );
};

export default Post;