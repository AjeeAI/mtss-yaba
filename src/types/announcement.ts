export interface Announcement {
  title: string;
  body: string;
  expiresAt: string;
}

export interface FormErrors {
  title?: string;
  body?: string;
}