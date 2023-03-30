/**
 * @openapi
 * /api/tags:
 *  get:
 *    tags:
 *      - tags
 *    description: Returns the list of tags present in the database
 *    responses:
 *      '200':
 *        description: Successful operation
 *  post:
 *    tags:
 *      - tags
 *    summary: Add a new tag to the database
 *    security:
 *       - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CreateTagSchema'
 *    responses:
 *      '200':
 *        description: Successful operation
 *      '400':
 *        description: Bad request
 *      '401':
 *        description: Not authorized
 * /api/tags/{name}:
 *  delete:
 *    tags:
 *      - tags
 *    security:
 *       - bearerAuth: []
 *    parameters:
 *      - name: name
 *        in: path
 *        description: Tag name to delete
 *        required: true
 *        schema:
 *          type: string
 *          example: SUV
 *    responses:
 *      '204':
 *        description: Successful operation
 */
