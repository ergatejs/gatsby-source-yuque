export const types = `
type YuqueBook implements Node {  
  id: Int,
  type: String,
  slug: String,  
  name: String,
  description: String,
  namespace: String,

  user_id: Int,  
  creator_id: Int,

  public: Int,
  items_count: Int,
  likes_count: Int,
  watches_count: Int,

  created_at: Date! @dateformat,
  updated_at: Date! @dateformat,
  content_updated_at: Date! @dateformat,

  user: YuqueUser,
  _serializer: String
}

type YuqueBookDetail implements Node {  
  id: Int,
  type: String,
  slug: String,
  name: String,
  description: String,
  namespace: String,

  toc: String,
  toc_yml: String,

  user_id: Int,
  creator_id: Int,

  public: Int,
  items_count: Int,
  likes_count: Int,
  watches_count: Int,

  pinned_at: Date! @dateformat,
  archived_at: Date! @dateformat,
  created_at: Date! @dateformat,
  updated_at: Date! @dateformat,

  user: YuqueUser,
  _serializer: String
}

type YuqueDoc implements Node {  
  id: Int,
  slug: String,
  title: String,
  description: String,
  custom_description: String,

  user_id: Int,
  book_id: Int,

  book: String,
  cover: String,
  format: String,
    
  public: Int,
  status: Int,
  view_status: Int,
  read_status: Int,
  likes_count: Int,
  comments_count: Int,

  content_updated_at: Date! @dateformat,
  created_at: Date! @dateformat,
  updated_at: Date! @dateformat,
  published_at: Date! @dateformat,
  first_published_at: Date! @dateformat,

  draft_version: Int,
  last_editor_id: Int,
  word_count: Int,

  last_editor: YuqueUser,  
  _serializer: String
}

type YuqueDocDetail implements Node {  
  id: Int,
  slug: String,
  title: String,
  description: String,
  custom_description: String,

  user_id: Int,
  book_id: Int,

  book: YuqueBook,
  cover: String,
  format: String,

  body: String,
  body_draft: String,
  body_html: String,
  body_lake: String,
  body_draft_lake: String,

  public: Int,
  status: Int,
  view_status: Int,
  read_status: Int,
  likes_count: Int,
  comments_count: Int,

  content_updated_at: Date! @dateformat,
  deleted_at: Date! @dateformat,
  created_at: Date! @dateformat,
  updated_at: Date! @dateformat,
  published_at: Date! @dateformat,
  first_published_at: Date! @dateformat,

  word_count: Int,
  hits: Int,

  creator: YuqueUser,
  _serializer: String
}

type YuqueUser implements Node {  
  id: Int,
  type: String,
  login: String,        
  name: String,
  description: String,

  avatar_url: String,

  followers_count: Int,
  following_count: Int,
  updated_at: Date! @dateformat,
  created_at: Date! @dateformat,

  _serializer: String    
}
`;
