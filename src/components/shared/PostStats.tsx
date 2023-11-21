import { useDeleteSavedPost, useGetCurrentUser, useLikePost, useSavePost } from "@/lib/react-query/queriesAnsMutations";
import { checkIsLiked } from "@/lib/utils";
import { Models } from "appwrite";
import React, { useState, useEffect } from "react";
import Loader from "./Loader";

type PostStatsProps = {
  post?: Models.Document;
  userId: string;
};

const PostStats = ({ post, userId }: PostStatsProps) => {

  const likesList = post?.likes.map(

  (user: Models.Document) =>  
  user.$id

  )


  const [likes, setLikes]   =   useState(likesList);
  const [isSaved, setIsSaved]   =   useState(false);

  const { mutate: likePost} = useLikePost();
  const { mutate: savePost, isPending: isSavingPost } = useSavePost();
  const { mutate: deleteSavedPost, isPending: isDeleting} = useDeleteSavedPost();

  const { data: currentUser} = useGetCurrentUser();



  const handleLikePost = (e: React.MouseEvent) => {

   e.stopPropagation();                  // prevent click further bs like ke liye use hoga

  let  newLikes = [...likes];     //all the previous like


const hasLiked = newLikes.includes(userId);


  if(hasLiked){

     newLikes = newLikes.filter((id) => id!==userId);

  }

  else {
    newLikes.push(userId);
  }

  setLikes(newLikes);
  likePost({postId: post?.$id || '', likesArray: newLikes})

  }


  const savedPostRecord = currentUser?.save.find((record: Models.Document) => 
  record.post.$id === post?.$id
  );

  useEffect(()=>{

setIsSaved(savedPostRecord? true: false);             // you can also check with !!savedPostRecord
  },[currentUser])      //Is going to change whenever the current user changes

  const handleSavePost = (e:React.MouseEvent ) => {

    e.stopPropagation();                  // prevent click further bs like ke liye use hoga

 
          
    if(savedPostRecord){
          
       setIsSaved(false);
       deleteSavedPost(savedPostRecord.$id);

    }


else{
  savePost({postId: post?.$id || '', userId});

  setIsSaved(true);

}

  }


  return (
    <div className="flex justify-between items-center z-20">
      <div className="flex gap-2 mr-5">
        <img
          src={`${checkIsLiked(likes, userId) ? "/assets/icons/liked.svg"
          : "/assets/icons/like.svg"}
          
          `}
          alt="like"
          width={20}
          height={20}
          className="cursor-pointer"
          onClick={handleLikePost}
        />

        <p className="small-medium lg:base-medium">{likes.length}</p>
      </div>

      <div className="flex gap-2">
      {isSavingPost || isDeleting ?<Loader /> :  

        <img

          src={isSaved ? "/assets/icons/saved.svg"
          
          :  "/assets/icons/save.svg" }


          alt="save"
          width={20}
          height={20}
          className="cursor-pointer"
          onClick={handleSavePost}
        />
        }

      </div>
    </div>
  );
};

export default PostStats;
