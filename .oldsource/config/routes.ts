export enum AuthRoutes {
  PostLogin = "login",
  GetAuth = "/",
}

export enum ListsRoutes {
  PostCreateLists = "/",
  GetUserLists = "/user/:id",
  GetPublicLists = "/",
  GetList = "/:id",
  PutUpdateList = "/:id",
  DeleteList = "/id",
}

export enum UsersRoutes {
  PostCreateUser = "/",
}

export enum UserPreferencesRoutes {
  GetUserPreferences = '/',
  PutUpdateSelectedList = '/select/:listId',
  PutUpdateLikedList = '/like/:listId',
  PutRemoveLikedList = '/unlike/:listId'
}
