import SwaggerJsdoc from 'swagger-jsdoc';
import SwaggerUi from 'swagger-ui-express';
import {version} from '../../package.json';

const options: SwaggerJsdoc.Options = {
  definition:{
    openapi: "3.0.0",
    info:{
      title: 'KARL Rental',
      version
    },
    components:{
      
    }
  }
};