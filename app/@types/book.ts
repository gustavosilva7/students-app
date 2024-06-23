type Books = {
  id: number;
  title: string;
  author: string;
  tag: string;
  active: boolean;
  publisher: string;
  edition: string;
  year: string;
  created_at: string;
  image: string;
  stars: {
    id: number;
    user_id: number;
    book_id: number;
    avaliation: number;
  }[];
};
