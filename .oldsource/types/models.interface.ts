export interface User {
  permissions: {
    admin: boolean;
    instructor: boolean; // remove
  };
  email: string;
  password: string;
  id: string;
}

export interface UserPreferenceState {
  id: string,
  selectedList: string,
  userId: string,
  likedLists: string[],
}

export interface List {
  name: string;
}

export interface ListsState {
  id?: string
  isPrivate: boolean;
  name: string;
  list: List[];
  createdId?: string;
  createdBy?: string;
}