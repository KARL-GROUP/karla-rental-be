/**
 * @openapi
 * /api/cars:
 *  get:
 *    tags:
 *      - cars
 *    description: Returns the list of cars present in the database
 *    responses:
 *      '200':
 *        description: Successful operation
 *  post:
 *    tags:
 *      - cars
 *    summary: Add a new car to the database
 *    security:
 *       - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            $ref: '#/components/schemas/CreateCarSchema'
 *    responses:
 *      '200':
 *        description: Successful operation
 *      '400':
 *        description: Bad request
 *      '401':
 *        description: Not authorized
 * /api/cars/{id}:
 *  put:
 *    tags:
 *      - cars
 *    summary: Edit car details
 *    security:
 *       - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/UpdateCarSchema'
 *    responses:
 *      '200':
 *        description: Successful operation
 *      '400':
 *        description: Bad request
 *      '401':
 *        description: Not authorized
 *  get:
 *    tags:
 *      - cars
 *    parameters:
 *      - name: id
 *        in: path
 *        description: Car id to retrieve
 *        required: true
 *        schema:
 *          type: string
 *          format: uuid
 *          example: f570a575-291f-479a-a485-e97281c889fd
 *    description: Returns the list of cars present in the database
 *    responses:
 *      '200':
 *        description: Successful operation
 *  delete:
 *    tags:
 *      - cars
 *    security:
 *       - bearerAuth: []
 *    parameters:
 *      - name: id
 *        in: path
 *        description: Car id to delete
 *        required: true
 *        schema:
 *          type: string
 *          format: uuid
 *          example: f570a575-291f-479a-a485-e97281c889fd
 *    responses:
 *      '204':
 *        description: Successful operation
 * /api/cars/{id}/images:
 *  post:
 *    tags:
 *      - images
 *    security:
 *       - bearerAuth: []
 *    parameters:
 *      - name: id
 *        in: path
 *        description: Car id to add images
 *        required: true
 *        schema:
 *          type: string
 *          format: uuid
 *          example: f570a575-291f-479a-a485-e97281c889fd
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            type: object
 *            properties:
 *              carImages:
 *                type: array
 *                items:
 *                  type: string
 *                  format: binary
 *    responses:
 *      '204':
 *        description: Successful operation
 *  delete:
 *    tags:
 *      - images
 *    security:
 *       - bearerAuth: []
 *    parameters:
 *      - name: id
 *        in: path
 *        description: Car id to delete images
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
 *            type: object
 *            properties:
 *              carImages:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/ImageSchema'
 *    responses:
 *      '204':
 *        description: Successful operation
 */
