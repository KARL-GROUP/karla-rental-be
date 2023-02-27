import cloudinary from 'cloudinary';
import config from 'config';

export default cloudinary.v2.config({
  cloud_name: config.get<string>('cloudinaryName'),
  api_key: config.get<string>('cloudinaryAPIKey'),
  api_secret: config.get<string>('cloudinaryAPISecret'),
})