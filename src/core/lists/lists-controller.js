import * as ListsServices from "./lists-services";
import * as ListServices from "../list/list-services";

export const createLists = async (req, res) => {
  const listsResponse = await ListsServices.addToLists(
    req.db,
    req.user,
    req.body
  );

  if (listsResponse.error) {
    return res
      .status(listsResponse.error.httpCode || 500)
      .json({ message: listsResponse.error.message });
  }
  const { id } = listsResponse;
  const listPromise = Promise.all(
    req.body.list.map(async (listItem) => {
      return await ListServices.createList(req.db, id, { name: listItem });
    })
  );
  if (listPromise.error) {
    return res
      .status(listsResponse.error?.httpCode || 500)
      .json({ message: listsResponse.error.message });
  }
  return res.status(200).json({ message: "success" });
};

export const findListsByUser = async (req, res) => {
  try {
    const listsDetails = await ListsServices.findListsByUser(req.db, req.user);
    if (listsDetails.error) {
      return res
        .sendStatus(listsDetails.error?.httpCode || 500)
        .json(listsDetails.error.message);
    }
    const lists = await Promise.all(
      listsDetails.map(async (listDetail) => {
        const list = await ListServices.listByListId(req.db, listDetail);
        return { listName: listDetail.list_name, list: list };
      })
    );
    if (!lists.length) {
      return res.sendStatus(400).json({ message: "bad request" });
    }
    return await res.status(200).json(lists);
  } catch (e) {
    console.error(e);
    return res.status(e.httpCode || 500).json(e.message || e);
  }
};

// export const getPublicLists = async (req, res) => {
//   try {
//     const response = await createUser(req.db, req.body)

//     if(response.error) return res.status(response.error.httpCode || 500).json({ message: response.error.message })
//     return await res.status(200).json( response )
//   } catch (e) {
//     console.error(e)
//     return res.status(e.httpCode || 500).json( e.message || e )
//   }
// }

// export const getList = async (req, res) => {
//   try {
//     const response = await createUser(req.db, req.body)

//     if(response.error) return res.status(response.error.httpCode || 500).json({ message: response.error.message })
//     return await res.status(200).json( response )
//   } catch (e) {
//     console.error(e)
//     return res.status(e.httpCode || 500).json( e.message || e )
//   }
// }

// export const deleteList = async (req, res) => {
//   try {
//     const response = await createUser(req.db, req.body)

//     if(response.error) return res.status(response.error.httpCode || 500).json({ message: response.error.message })
//     return await res.status(200).json( response )
//   } catch (e) {
//     console.error(e)
//     return res.status(e.httpCode || 500).json( e.message || e )
//   }
// }
