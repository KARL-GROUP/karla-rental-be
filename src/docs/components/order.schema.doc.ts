/**
 * @openapi
 * components:
 *  schemas:
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
 *    CustomerIdSchema:
 *      type: object
 *      required:
 *        - type
 *        - value
 *      properties:
 *        type:
 *          type: string
 *          enum: ['passport', 'national']
 *          default: national
 *        value:
 *          type: string
 *    CreateOrderSchema:
 *      type: object
 *      required:
 *        - car
 *        - fullName
 *        - customerId
 *        - email
 *        - phone
 *        - description
 *        - startDate
 *        - endDate
 *      properties:
 *        car:
 *          type: string
 *          format: uuid
 *        fullName:
 *          type: string
 *          default: Someone
 *        customerId:
 *          $ref: '#/components/schemas/CustomerIdSchema'
 *        phone:
 *          type: string
 *          default: +250780000000
 *        email:
 *          type: string
 *          format: email
 *        description:
 *          type: string
 *          default: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat
 *        startDate:
 *          type: string
 *          format: date-time
 *        endDate:
 *          type: string
 *          format: date-time
 *    UpdateOrderSchema:
 *      type: object
 *      properties:
 *        car:
 *          type: string
 *          format: uuid
 *        fullName:
 *          type: string
 *          default: Someone
 *        customerId:
 *          $ref: '#/components/schemas/CustomerIdSchema'
 *        phone:
 *          type: string
 *          default: +250780000000
 *        email:
 *          type: string
 *          format: email
 *        description:
 *          type: string
 *          default: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat
 *        startDate:
 *          type: string
 *          format: date-time
 *        endDate:
 *          type: string
 *          format: date-time
 */