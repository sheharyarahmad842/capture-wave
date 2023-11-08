import { ID, Query } from 'appwrite';
import { appwriteConfig, account, avatars, databases, storage } from './config';
import { NewUserInterface, PostInterface } from '@/types';

export const saveUserToDB = async (user: {
  accountId: string;
  email: string;
  name: string;
  username?: string;
  imageUrl: URL;
}) => {
  try {
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      user
    );
    return newUser;
  } catch (error) {
    console.log(error);
  }
};

export const createUserAccount = async (user: NewUserInterface) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );
    if (!newAccount) throw Error;
    console.log('New Account: ', newAccount);
    const avatarUrl = avatars.getInitials(user.name);
    const newUser = await saveUserToDB({
      accountId: newAccount.$id,
      email: newAccount.email,
      name: newAccount.name,
      username: user.username,
      imageUrl: avatarUrl,
    });
    return newUser;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const signInAccount = async (user: {
  email: string;
  password: string;
}) => {
  try {
    const session = await account.createEmailSession(user.email, user.password);
    console.log(session);
    return session;
  } catch (error) {
    console.log(error);
    throw Error;
  }
};

export const getAccount = async () => {
  try {
    const currentAccount = await account.get();
    return currentAccount;
  } catch (error) {
    console.log(error);
    throw Error;
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal('accountId', currentAccount.$id)]
    );
    if (!currentUser) throw Error;
    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const signOutAccount = async () => {
  try {
    const session = await account.deleteSession('current');
    return session;
  } catch (error) {
    console.log(error);
  }
};

export const uploadFile = async (file: File) => {
  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      file
    );
    return uploadedFile;
  } catch (error) {
    console.log(error);
  }
};

export const getPreviewFile = (fileId: string) => {
  try {
    const fileUrl = storage.getFilePreview(
      appwriteConfig.storageId,
      fileId,
      2000,
      2000,
      'top',
      100
    );
    return fileUrl;
  } catch (error) {
    console.log(error);
  }
};

export const deleteFile = async (fileId: string) => {
  try {
    await storage.deleteFile(appwriteConfig.storageId, fileId);
    return { status: 'ok' };
  } catch (error) {
    console.log(error);
  }
};

export const createPost = async (post: PostInterface) => {
  try {
    // Upload file to appwrite storage
    const uploadedFile = await uploadFile(post.file[0]);
    if (!uploadedFile) throw Error;
    // Get file url
    const fileUrl = getPreviewFile(uploadedFile.$id);
    if (!fileUrl) {
      await deleteFile(uploadedFile.$id);
      throw Error;
    }
    console.log(fileUrl);
    // Convert tags to an array
    const tags = post.tags?.replace(/ /g, '').split(',') || [];

    // Create Post
    const newPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      ID.unique(),
      {
        creator: post.userId,
        caption: post.caption,
        location: post.location,
        imageUrl: fileUrl,
        imageId: uploadedFile.$id,
        tags,
      }
    );

    if (!newPost) {
      await deleteFile(uploadedFile.$id);
      throw Error;
    }

    return newPost;
  } catch (error) {
    console.log(error);
  }
};

export const getRecentPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      [Query.orderDesc('$createdAt'), Query.limit(20)]
    );
    if (!posts) throw Error;
    return posts;
  } catch (error) {
    console.log(error);
  }
};

export const likePost = async (postId: string, likes: string[]) => {
  try {
    const updatedPost = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      postId,
      { likes }
    );
    if (!updatedPost) throw Error;
    return updatedPost;
  } catch (error) {
    console.log(error);
  }
};

export const savePost = async (postId: string, userId: string) => {
  try {
    const savedPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.savesCollectionId,
      ID.unique(),
      { post: postId, user: userId }
    );
    if (!savedPost) throw Error;
    return savedPost;
  } catch (error) {
    console.log(error);
  }
};

export const deleteSavedPost = async (savedRecordId: string) => {
  try {
    const statusCode = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.savesCollectionId,
      savedRecordId
    );
    if (!statusCode) throw Error;
    return { status: 'ok' };
  } catch (error) {
    console.log(error);
  }
};
