import classes from './styles.module.scss';
import Image from "next/image";
import {BiDotsHorizontalRounded} from 'react-icons/bi';
import {AiOutlineComment, AiOutlineLike} from "react-icons/ai";
import FileType from "../shared/FileType";

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
                        <p className={classes.time}>{new Date(post.datePosted).toLocaleDateString()}</p>
                    </div>
                    <BiDotsHorizontalRounded className={classes.optionsIcon}/>
                </div>
            </div>
            <div className={classes.postContent}>
                <p className={classes.postText}>{post.text}</p>
                {post.attachment && !post.attachment.type.includes('image') && !post.attachment.type.includes('video') &&
                    <a href={post.attachment.link} download><FileType type={post.attachment.type}
                                                                      name={post.attachment.name}/></a>}
                {post.attachment && post.attachment.type.includes('image') &&
                    <div className={classes.postImage}>
                        <Image src={post.attachment.link} alt='post img' width='100%' height='100%'
                               layout='responsive'/>
                    </div>
                }
                {post.attachment && post.attachment.type.includes('video') &&
                    <div>
                        <video width="100%" height="100%" controls>
                            <source src={post.attachment.link} type="video/mp4"/>
                            <source src={post.attachment.link} type="video/ogg"/>
                            <source src={post.attachment.link} type="video/webm"/>
                            Your browser does not support the video tag.
                        </video>
                    </div>
                }
            </div>
            <div className={classes.postFooter}>
                <div className={classes.postAction}>
                    <AiOutlineLike/>
                </div>
                <div className={classes.postAction}>
                    <AiOutlineComment/>
                </div>
            </div>
        </div>
    );
};

export default Post;