import SwaggerUI from 'swagger-ui-express'
import YAML from 'yamljs'

const swaggerMiddleware = () => {
  const swaggerDocument = YAML.load('src/config/swagger.yaml')
  return [
    SwaggerUI.serve,
    SwaggerUI.setup(swaggerDocument, {
      customSiteTitle: 'Band API',
    }),
  ]
}

export default swaggerMiddleware
