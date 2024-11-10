type Image = {
  longImage: string;
  shortImage: string;
};

type NewsItem = {
  _id: string;
  createdAt: string;
  title: string;
  content: string;
  type: 'BREAKING' | string; // Assuming other types could be added
  image: Image;
};
