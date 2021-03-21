import debugLib from 'debug'
import fs from 'fs'

const debug = debugLib('propfolio:models')
const _set = []

export const models = async db => {
  const modelsPath = __dirname
  const path = fs.readdirSync(modelsPath)

  for (const index in path) {
    const file = path[index]
    if (!~file.indexOf('.js')) continue
    
    let model
    try {
      model = await import(modelsPath + '/' + file)
    } catch (e) {
      debug(e)
    }
    
    if (model.default) {
      const instance = model.default(db)
      _set.push(instance)
    }
  }
};

export const set = () => _set