import mongoose from 'mongoose'
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