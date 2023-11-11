export type NewUserInterface = {
  name: string;
  email: string;
  username: string;
  password: string;
};

export type UserInterface = {
  id: string;
  name: string;
  username: string;
  email: string;
  imageUrl: string;
  bio: string;
};

export type UpdateUserInterface = {
  userId: string;
  name: string;
  imageId: string;
  imageUrl: URL | string;
  bio: string;
  file: File[];
};

export type PostInterface = {
  userId: string;
  caption: string;
  file: File[];
  location: string;
  tags?: string;
};

export type UpdatePostInterface = {
  postId: string;
  caption: string;
  location?: string;
  file: File[];
  tags?: string;
  imageUrl: URL;
  imageId: string;
};
