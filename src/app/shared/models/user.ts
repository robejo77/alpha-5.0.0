export interface Roles { 
    crew?: boolean;
    supv?: boolean;
    admin?: boolean;
 }
  
export interface User {
    uid: string;
    email?: string | null;
    photoURL?: string;
    displayName?: string;
    roles: Roles;
  }