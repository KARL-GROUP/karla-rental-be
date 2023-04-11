/**
 * @openapi
 * /api/orders:
 *  get:
 *    tags:
 *      - orders
 *    description: Returns the list of orders present in the database
 *    security:
 *       - bearerAuth: []
 *    responses:
 *      '200':
 *        description: Successful operation
 *      '401':
 *        description: Not authorized
 *  post:
 *    tags:
 *      - orders
 *    summary: Add a new order
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CreateOrderSchema'
 *    responses:
 *      '200':
 *        description: Successful operation
 *      '400':
 *        description: Bad request
 *      '401':
 *        description: Not authorized
 * /api/orders/{orderId}:
 *  put:
 *    tags:
 *      - orders
 *    summary: Edit order details
 *    security:
 *       - bearerAuth: []
 *    parameters:
 *      - name: orderId
 *        in: path
 *        description: Order id to delete
 *        required: true
 *        schema:
 *          type: string
 *          format: uuid
 *          example: f570a575-291f-479a-a485-e97281c889fd
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/UpdateOrderSchema'
 *    responses:
 *      '200':
 *        description: Successful operation
 *      '400':
 *        description: Bad request
 *      '401':
 *        description: Not authorized
 *  delete:
 *    tags:
 *      - orders
 *    security:
 *       - bearerAuth: []
 *    parameters:
 *      - name: orderId
 *        in: path
 *        description: Order id to delete
 *        required: true
 *        schema:
 *          type: string
 *          format: uuid
 *          example: f570a575-291f-479a-a485-e97281c889fd
 *    responses:
 *      '204':
 *        description: Successful operation
 */