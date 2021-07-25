import ListsServices from "./lists-services";
import ListServices from "../list/list-services";

exports.createList = async (req, res) => {
  const listsResponse = await ListsServices.addToLists(req.db, req.body);

  if (listsResponse.error) {
    return res
      .status(listsResponse.error.httpCode || 500)
      .json({ message: listsResponse.error.message });
  }
  const { id } = listsResponse;
  const listResponse = await ListServices.createList(req.db, id, req.body);
  if (listResponse.error) {
    return res
      .status(listsResponse.error.httpCode || 500)
      .json({ message: listsResponse.error.message });
  }
  return await res.status(200).json({ message: "success" });
};

export const findListsByUser = async (req, res) => {
  try {
    const listsDetails = ListsServices.findListsByUser(req.db, req.user);
    if (listsDetails.error) {
      return res
        .status(listsDetails.error.httpCode || 500)
        .json({ message: listsDetails.error.message });
    }
    const lists = ListServices.listsByUser(req.db, listsDetails);
    if (lists.error) {
      return res
        .status(lists.error.httpCode || 500)
        .json({ message: lists.error.message });
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