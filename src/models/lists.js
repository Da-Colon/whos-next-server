import mongoose from 'mongoose'
import { addPlugins } from '../database'
import handleError from "../errors"

const ListsSchema = new mongoose.Schema(
  {
    list: {
      type: Array,
      require: true,
    },
    private: {
      type: Boolean,
      default: true,
    },
    list_name: {
      type: String,
      require: true
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }
  }, {
    toJSON: {
      transform: (_, ret) => {
        ret.id = ret._id
        delete ret._id
        delete ret.__v
        delete ret.password
      }
   }
  }
)

addPlugins(ListsSchema);

export const Lists = db => db.model('Lists', ListsSchema);
export default Lists;

// model functions
export const createList = (user, template, properties) => {
  const propertiesWithUser = {...properties, user_id: user.id}
  return new Promise((resolve, reject) => {
    template
      .create(propertiesWithUser)
      .then(resolve)
      .catch((error) => {
        reject(handleError('database', 'create error', error))
      })
  })
}

export const getOne = (template, id) => {
  return new Promise((resolve, reject) => {
    template
      .findOne({_id: id})
      .then(resolve)
      .catch((error) => {
        reject(handleError('database', 'get one error', error))
      })
  })
}

export const getAllByUser = (template, userId) => {
  return new Promise((resolve, reject) => {
    template
      .find({user_id: mongoose.Schema.Types.ObjectId(userId)})
      .then(resolve)
      .catch((error) => {
        reject(handleError('database', 'get all user error', error))
      })
  })
}
export const getAllPublic = (template) => {
  return new Promise((resolve, reject) => {
    template
      .find({private: false})
      .then(resolve)
      .catch((error) => {
        reject(handleError('database', 'get all public error', error))
      })
  })
}

export const updateOne = (template, id, userId) => {
  return new Promise((resolve, reject) => {
    template.updateOne({
      _id: id, 
      user_id: mongoose.Schema.Types.ObjectId(userId)
    })
    .then(resolve)
    .catch((error) => {
      reject(handleError('database', 'update list error', error))
    })
  })
}

export const deleteOne = (template, id, userId) => {
  return new Promise((resolve, reject) => {
    template.delete({
      _id: id, 
      user_id: mongoose.Schema.Types.ObjectId(userId)
    })
    .then(resolve)
    .catch((error) => {
      reject(handleError('database', 'update list error', error))
    })
  })
}