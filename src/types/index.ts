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

export type PostInterface = {
  userId: string;
  caption: string;
  file: File[];
  location: string;
  tags?: string;
};
