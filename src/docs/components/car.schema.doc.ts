/**
 * @openapi
 * components:
 *  schemas:
 *    UpdateCarSchema:
 *      type: object
 *      properties:
 *        coverImage: 
 *          $ref: '#/components/schemas/ImageSchema'
 *        brand:
 *          type: string
 *          default: Toyota
 *        model:
 *          type: string
 *          default: Landcrusier
 *        year:
 *          type: string
 *          default: 2023
 *        description:
 *          type: string
 *          default: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat
 *        transmission:
 *          type: string
 *          enum: ['Automatic', 'Manual', 'Both']
 *          default: Automatic
 *        seats:
 *          type: integer
 *          default: 7
 *        price:
 *          type: integer
 *          default: 50
 *        display:
 *          type: boolean
 *          default: true
 *        tags:
 *          type: array
 *          default: ['SUV','Toyota','Truck','Offroad']
 *          items:
 *            type: string
 *    CarSchema:
 *      type: object
 *      properties:
 *        coverImage: 
 *          $ref: '#/components/schemas/ImageSchema'
 *        carImages:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/ImageSchema'
 *        brand:
 *          type: string
 *          default: Toyota
 *        model:
 *          type: string
 *          default: Landcrusier
 *        year:
 *          type: string
 *          default: 2023
 *        description:
 *          type: string
 *          default: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat
 *        transmission:
 *          type: string
 *          enum: ['Automatic', 'Manual', 'Both']
 *          default: Automatic
 *        seats:
 *          type: integer
 *          default: 7
 *        price:
 *          type: integer
 *          default: 50
 *        display:
 *          type: boolean
 *          default: true
 *        tags:
 *          type: array
 *          default: ['SUV','Toyota','Truck','Offroad']
 *          items:
 *            type: string
 *    ImageSchema:
 *      type: object
 *      required:
 *        - public_id
 *        - url
 *      properties:
 *        public_id:
 *          type: string
 *        url:
 *          type: string
 *          format: url
 *    CreateCarSchema:
 *      type: object
 *      required:
 *        - carImages
 *        - brand
 *        - model
 *        - year
 *        - type
 *        - transmission
 *        - seats
 *        - price
 *      properties:
 *        carImages:
 *          type: array
 *          items:
 *            type: string
 *            format: binary
 *        brand:
 *          type: string
 *          default: Toyota
 *        model:
 *          type: string
 *          default: Landcrusier
 *        year:
 *          type: string
 *          default: 2023
 *        description:
 *          type: string
 *          default: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat
 *        type:
 *          type: string
 *          default: SUV
 *        transmission:
 *          type: string
 *          enum: ['Automatic', 'Manual', 'Both']
 *          default: Automatic
 *        seats:
 *          type: integer
 *          default: 7
 *        price:
 *          type: integer
 *          default: 50
 *        display:
 *          type: boolean
 *        tags:
 *          type: array
 *          in: formData,
 *          items:
 *            type: string
 */


// *          default: ['SUV','Toyota','Truck','Offroad']