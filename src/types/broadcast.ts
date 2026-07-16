// types/broadcast.ts
export interface Broadcast {
  id: string | number;
  title: string;
  body: string;
  createdAt: string;
  expiresAt: string | null;
}