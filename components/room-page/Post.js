import classes from './styles.module.scss';
import Image from "next/image";
import {BiDotsHorizontalRounded} from 'react-icons/bi';
import {AiOutlineComment, AiOutlineLike} from "react-icons/ai";
import FileType from "../files-shared/FileType";
import Link from "next/link";
import UserOnlineStatus from "../shared/UserOnlineStatus";

const Post = props => {

    const {post} = props;

    return (
        <div className={classes.post}>
            <div className={classes.postHeader}>
                <div className={classes.imageContainer}>
                    <Image src={post.user.profilePicture || require('../../public/default-user.png')} alt='photo'
                           width={100} height={100}/>
                </div>
                <div className={classes.postInfo}>
                    <div>
                        <div className='d-flex align-items-center'>
                            <Link href={`/profile/${post.userId}`} passHref>
                                <a className={classes.username}>{post.user.fullName}</a>
                            </Link>
                            <UserOnlineStatus isOnline={post.user.isOnline} noLabel/>
                        </div>
                        <p className={classes.time}>{new Date(post.datePosted).toLocaleDateString()}</p>
                    </div>
                    {/*<BiDotsHorizontalRounded className={classes.optionsIcon}/>*/}
                </div>
            </div>
            <div className={classes.postContent}>
                <p className={classes.postText}>{post.text}</p>
                {post.attachment && !post.attachment.type.includes('image') && !post.attachment.type.includes('video') &&
                    <a href={post.attachment.link} download style={{display: 'block', width: ' 100%'}}>
                        <div className='py-3' style={{backgroundColor: '#eee'}}>
                            <FileType
                                type={post.attachment.type}
                                name={post.attachment.name}
                                iconSize={60}
                                displayName
                            />
                        </div>

                    </a>
                }
                {post.attachment && post.attachment.type.includes('image') &&
                    <Link href={post.attachment.link} passHref>
                        <a className={classes.postImage} target='_blank'>
                            <Image src={post.attachment.link} alt='post img' width={1000} height={1000}/>
                        </a>
                    </Link>
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
        </div>
    );
};

export default Post;