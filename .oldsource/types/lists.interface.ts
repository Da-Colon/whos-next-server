import { List } from "./models.interface";

export interface CreateListProps {
  name: string,
  list: List[],
  isPrivate: boolean,
}

export interface ListsParams {
  isPrivate?: boolean;
  name?: string;
  list?: List[];
}