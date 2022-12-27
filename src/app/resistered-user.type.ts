export interface ResisterUser {
  other_users_count?: number;
  show_users_count?: boolean;
  top_users?: [
    {
      image_url?: string;
      name?: string;
    }
  ];
}
