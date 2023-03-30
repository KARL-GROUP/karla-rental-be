/**
 * @openapi
 * components:
 *  schemas:
 *    CreateUserSchema:
 *      type: object
 *      required:
 *        - userName
 *        - email
 *        - password
 *        - passwordConfirm
 *      properties:
 *        userName:
 *          type: string
 *        email:
 *          type: string
 *          format: email
 *        password:
 *          type: string
 *          minLength: 8
 *          maxLength: 32
 *        passwordConfirm:
 *          type: string
 *          minLength: 8
 *          maxLength: 32
 * 
 *    LoginUserSchema:
 *      type: object
 *      required:
 *        - email
 *        - password
 *      properties:
 *        email:
 *          type: string
 *          format: email
 *        password:
 *          type: string
 * 
 *    ChangePasswordSchema:
 *      type: object
 *      required:
 *        - password
 *        - passwordConfirm
 *      properties:
 *        password:
 *          type: string
 *          minLength: 8
 *          maxLength: 32
 *        passwordConfirm:
 *          type: string
 *          minLength: 8
 *          maxLength: 32
 */