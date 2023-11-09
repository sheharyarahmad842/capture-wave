import React, { useState, useEffect } from 'react';
import { Models } from 'appwrite';
import {
  useDeleteSavePostMutation,
  useLikePostMutation,
  useSavePostMutation,
} from '@/lib/react-query/queriesAndMutations';
import { checkIsLiked } from '@/lib/utils';
import { useGetCurrentAccountQuery } from '@/lib/react-query/queriesAndMutations';
import Loader from './Loader';

type PostStatsProps = {
  post?: Models.Document;
  userId: string;
};

const PostStats = ({ post, userId }: PostStatsProps) => {
  const { data: currentUser } = useGetCurrentAccountQuery();
  const { mutate: likePost } = useLikePostMutation();
  const { mutate: savePost, isLoading: isSavePostLoading } =
    useSavePostMutation();
  const { mutate: deleteSavedPost, isLoading: isDeletePostLoading } =
    useDeleteSavePostMutation();
  const likesList = post?.likes.map((user: Models.Document) => user.$id);
  const [likes, setLikes] = useState(likesList);
  const [isSaved, setIsSaved] = useState(false);

  const savedPostRecord = currentUser?.saves.find(
    (record: Models.Document) => record.post.$id === post?.$id
  );

  useEffect(() => {
    setIsSaved(!!savedPostRecord);
  }, [currentUser]);
  const handleLikePost = (e: React.MouseEvent) => {
    e.stopPropagation();
    let newLikes = [...likes];
    const hasLiked = newLikes.includes(userId);
    if (hasLiked) {
      newLikes = newLikes.filter((id: string) => id !== userId);
    } else {
      newLikes.push(userId);
    }
    setLikes(newLikes);
    likePost({ postId: post?.$id || '', likes: newLikes });
  };

  const handleSavePost = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (savedPostRecord) {
      setIsSaved(false);
      deleteSavedPost(savedPostRecord.$id);
    } else {
      setIsSaved(true);
      savePost({ postId: post?.$id || '', userId });
    }
  };
  return (
    <div className='flex justify-between items-center mt-5'>
      <div className='flex items-center gap-2'>
        <img
          src={
            checkIsLiked(likes, userId)
              ? '/assets/icons/liked.svg'
              : '/assets/icons/like.svg'
          }
          alt='Like'
          width={20}
          height={20}
          onClick={(e) => handleLikePost(e)}
          className='cursor-pointer'
        />
        <p className='text-sm text-light-2'>{likes.length}</p>
      </div>
      <div className='flex gap-2'>
        {isSavePostLoading || isDeletePostLoading ? (
          <Loader />
        ) : (
          <img
            src={isSaved ? '/assets/icons/saved.svg' : '/assets/icons/save.svg'}
            alt='Save'
            width={20}
            height={20}
            className='cursor-pointer'
            onClick={(e) => handleSavePost(e)}
          />
        )}
      </div>
    </div>
  );
};

export default PostStats;
