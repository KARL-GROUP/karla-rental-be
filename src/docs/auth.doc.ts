/**
 * @openapi
 * /api/auth/register:
 *  post:
 *    tags:
 *      - auth
 *    summary: Create new user
 *    description: Create new user
 *    operationId: Register
 *    requestBody:
 *      description: Create new user
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CreateUserSchema'
 *      required: true
 *    responses:
 *      '201':
 *        description: Successful operation
 * /api/auth/login:
 *  post:
 *    tags:
 *      - auth
 *    summary: Login user
 *    description: Login new user
 *    operationId: Login
 *    requestBody:
 *      description: Login info
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/LoginUserSchema'
 *      required: true
 *    responses:
 *      '201':
 *        description: Successful operation
 * /api/auth/changePassword:
 *  put:
 *    tags:
 *      - auth
 *    summary: Changed password
 *    security:
 *       - bearerAuth: []
 *    description: Changed logged in user password
 *    operationId: ChangePassword
 *    requestBody:
 *      description: Password info
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/ChangePasswordSchema'
 *      required: true
 *    responses:
 *      '201':
 *        description: Successful operation
 * /api/auth/logout:
 *  get:
 *    tags:
 *      - auth
 *    summary: logout user
 *    security:
 *       - bearerAuth: []
 *    description: Logout current user
 *    operationId: Logout
 *    responses:
 *      '204':
 *        description: Successful operation
 * /api/auth/refresh:
 *  get:
 *    tags:
 *      - auth
 *    summary: Refresh user token
 *    description: Refresh user token
 *    operationId: RefreshToken
 *    responses:
 *      '204':
 *        description: Successful operation
 */
