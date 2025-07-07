export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export interface Task {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

export interface Product {
  id: number;
  product: string;
  category: string;
  price: number;
  description: string;
  color: string;
  brand: string;
  stock: number;
  images: {
    src: string;
  }[];
}

export interface Message {
  id?: number;
  userId: number;
  content: string;
  createdAt: string;
}
