import createLogger from '../logger.js'
const logger = createLogger('config:mngr')
import { cosmiconfigSync } from 'cosmiconfig'
import schema from './schema.json' with { type : 'json'}
import betterAjvErrors from 'better-ajv-errors'
import Ajv from 'ajv'
const ajv = new Ajv({ strict: false })
const configLoader = cosmiconfigSync('tool')

export const getConfig = () => {
  const result = configLoader.search(process.cwd())
  if (!result) {
    logger.warning('Could not find configuration, using default');
    return { port: 1234 };
  } else {
    const isValid = ajv.validate(schema, result.config)
    if (!isValid) {
      logger.warning('Invalid configuration!')
      console.log()
      console.log(betterAjvErrors(schema, result.config, ajv.errors));
      process.exit(1)
    }
    logger.debug('Found configuration', result.config);
    return result.config;
  }
}
