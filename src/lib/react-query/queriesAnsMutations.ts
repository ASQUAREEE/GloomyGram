/* eslint-disable */

import {
useMutation,
useQueryClient,
useQuery,
useInfiniteQuery,

} from '@tanstack/react-query'
import { createUserAccount, signInAccount, signOutAccount,createPost, getRecentPosts, likePost, savePost, deleteSavedPost, getCurrentUser, getPostById, updatePost, deletePost, getInfinitePost, searchPosts, getUsers, getUserById, updateUser, commentPost, getRecentComments } from '../appwrite/api'
import { INewPost, INewUser, IUpdatePost, IUpdateUser } from '@/types'
import { QUERY_KEYS } from "@/lib/react-query/queryKeys";



export const useCreateUserAccount = () => {
    return useMutation({
        mutationFn: (user: INewUser) => createUserAccount(user)
    })


}
export const useSignInAccount = () => {
    return useMutation({
        mutationFn: (user: {email: string; password:string;}) => signInAccount(user)
    })


}


export const useSignOutAccount = () => {
    return useMutation({
        mutationFn:  signOutAccount
    })


}

export const useCreatePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (post: INewPost) => createPost(post),
      onSuccess: () => {
        queryClient.invalidateQueries({              // why we need to invalidate -> allows we to fetch new fresh data and not let data goes steal
          queryKey: [QUERY_KEYS.GET_RECENT_POSTS],    // save your ass from typos by declaring in other file these queries
        });
      },
    });
  };



  export const useGetRecentPosts = () => {
    return useQuery({
      queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      queryFn: getRecentPosts,
    });
  };


 
  export const useGetRecentComment = (postId: string) => {
    return useQuery({
      queryKey: [QUERY_KEYS.GET_RECENT_COMMENT, postId],
      queryFn: () => getRecentComments(postId), // Wrap getRecentComments inside an arrow function to delay its execution
    });
  };

 




  export const useLikePost = () => {

    const queryClient = useQueryClient();

    return useMutation({
  mutationFn: ({postId, likesArray}:{postId: string; likesArray: string[]}) =>
  
  likePost(postId, likesArray),
  onSuccess: (data) => {
  queryClient.invalidateQueries({
    queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id]                   // if your like changes and open up the post please update like count    kyuki woh cache mai save hota hai
  })
  queryClient.invalidateQueries({
    queryKey: [QUERY_KEYS.GET_RECENT_POSTS]                   // if your like changes and open up the post please update like count    kyuki woh cache mai save hota hai
  })
  queryClient.invalidateQueries({
    queryKey: [QUERY_KEYS.GET_POSTS]                   // if your like changes and open up the post please update like count    kyuki woh cache mai save hota hai
  })
  queryClient.invalidateQueries({
    queryKey: [QUERY_KEYS.GET_CURRENT_USER]                   // if your like changes and open up the post please update like count    kyuki woh cache mai save hota hai
  })

  }
    })

  }



  export const useCommentPost = () => {

    const queryClient = useQueryClient();

    return useMutation({
  mutationFn: ({postId, commentsArray}:{postId: string; commentsArray: string[]}) =>
  
  commentPost(postId, commentsArray),
  onSuccess: (data) => {
  queryClient.invalidateQueries({
    queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id]                   // if your like changes and open up the post please update like count    kyuki woh cache mai save hota hai
  })
  queryClient.invalidateQueries({
    queryKey: [QUERY_KEYS.GET_RECENT_POSTS]                   // if your like changes and open up the post please update like count    kyuki woh cache mai save hota hai
  })
  queryClient.invalidateQueries({
    queryKey: [QUERY_KEYS.GET_POSTS]                   // if your like changes and open up the post please update like count    kyuki woh cache mai save hota hai
  })
  queryClient.invalidateQueries({
    queryKey: [QUERY_KEYS.GET_CURRENT_USER]                   // if your like changes and open up the post please update like count    kyuki woh cache mai save hota hai
  })

  }
    })

  }





  export const useSavePost = () => {

    const queryClient = useQueryClient();

    return useMutation({
  mutationFn: ({postId, userId}:{postId: string; userId: string}) =>
  
  savePost(postId, userId),
  onSuccess: () => {
  queryClient.invalidateQueries({
    queryKey: [QUERY_KEYS.GET_RECENT_POSTS]                   // if your like changes and open up the post please update like count    kyuki woh cache mai save hota hai
  })
  queryClient.invalidateQueries({
    queryKey: [QUERY_KEYS.GET_POSTS]                   // if your like changes and open up the post please update like count    kyuki woh cache mai save hota hai
  })
  queryClient.invalidateQueries({
    queryKey: [QUERY_KEYS.GET_CURRENT_USER]                   // if your like changes and open up the post please update like count    kyuki woh cache mai save hota hai
  })

  }
    })

  }

  export const useDeleteSavedPost = () => {

    const queryClient = useQueryClient();

    return useMutation({
  mutationFn: (savedRecordId:string) =>
  
  deleteSavedPost(savedRecordId),
  
  onSuccess: () => {
  queryClient.invalidateQueries({
    queryKey: [QUERY_KEYS.GET_RECENT_POSTS]                   // if your like changes and open up the post please update like count    kyuki woh cache mai save hota hai
  })
  queryClient.invalidateQueries({
    queryKey: [QUERY_KEYS.GET_POSTS]                   // if your like changes and open up the post please update like count    kyuki woh cache mai save hota hai
  })
  queryClient.invalidateQueries({
    queryKey: [QUERY_KEYS.GET_CURRENT_USER]                   // if your like changes and open up the post please update like count    kyuki woh cache mai save hota hai
  })

  }
    })

  }



  export const useGetCurrentUser = () => {

 
   
    return useQuery({

 queryKey: [QUERY_KEYS.GET_CURRENT_USER],
 queryFn: getCurrentUser                            // coming from appwrite api

    })
  

  }




  export const useGetPostById = (postId: string) => {

    return useQuery({
      queryKey: [QUERY_KEYS.GET_POST_BY_ID, postId],
      queryFn: () => getPostById(postId),   
      enabled: !!postId                                //if we are fetching the same querry then it will fetch same details       

    })


  }
  export const useUpdatePost = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (post: IUpdatePost) => updatePost(post),   
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id]
        }); 
   
      },                               //if we are fetching the same querry then it will fetch same details       

    })                                                //usequery for fetch and usemutation for update


  }


  
  export const useDeletePost = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({ postId, imageId }: {postId: string, imageId: string}) => deletePost(postId, imageId),   
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
        }); 
   
      },                               //if we are fetching the same querry then it will fetch same details       

    })                                                //usequery for fetch and usemutation for update


  }


  export const useGetPosts = () => {
    return useInfiniteQuery({
      queryKey: [QUERY_KEYS.GET_INFINITE_POSTS],
      queryFn: getInfinitePost as any,
      getNextPageParam: (lastPage: any) => {
        // If there's no data, there are no more pages.
        if (lastPage && lastPage.documents.length === 0) {
          return null;
        }
  
        // Use the $id of the last document as the cursor.
        const lastId = lastPage.documents[lastPage.documents.length - 1].$id;
        return lastId;
      },
    });
  };


  export const useSearchPosts = (searchTerm: string) => {

  return useQuery({
   
    queryKey:[QUERY_KEYS.SEARCH_POSTS, searchTerm],
    queryFn: () => searchPosts(searchTerm),

    enabled: !!searchTerm,                               //when search term changes it will auto refetch
      

  })


  }



  export const useGetUsers = (limit?: number) => {
    return useQuery({
      queryKey: [QUERY_KEYS.GET_USERS],
      queryFn: () => getUsers(limit),
    });
  };
  


  export const useGetUserById = (userId: string) => {
    return useQuery({
      queryKey: [QUERY_KEYS.GET_USER_BY_ID, userId],
      queryFn: () => getUserById(userId),
      enabled: !!userId,
    });
  };
  
  export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (user: IUpdateUser) => updateUser(user),
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_CURRENT_USER],
        });
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_USER_BY_ID, data?.$id],
        });
      },
    });
  };
  