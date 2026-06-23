export interface CommunityThread {
  id: string;
  user_id: string;

  title: string;
  content: string;

  category: string;

  created_at: string;
}

export interface CommunityReply {
  id: string;

  thread_id: string;
  user_id: string;

  content: string;

  created_at: string;
}