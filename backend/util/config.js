/*MONGODB_URL: process.env.MONGODB_URL || 'mongodb+srv://amazona:amazona@cluster0.mmjph.mongodb.net/amazona?retryWrites=true&w=majority', */

export default { 
    MONGODB_URL: process.env.MONGODB_URL || 'mongodb://localhost/amazona',
    JWT_SECRET: process.env.JWT_SECRET || 'somethingsecret',
    NODE_ENV: process.env.DEVELOPMENT || 'production',
    GOOGLE_MAP_API_KEY: process.env.GOOGLE_MAP_API_KEY || 'AIzaSyCBd9VZZB04FDJ3kflA28TX9sYcim8sYAM',
    NODE_MAILER_USER_ID: process.env.NODE_MAILER_USER_ID || 'real_email_',
    NODE_MAILER_PASSWORD: process.env.NODE_MAILER_PASSWORD || 'real_password',
    PORT: process.env.PORT || 5000
  
}
 // AIzaSyDgSeS_t664A8JSnOGLd9ao36PFvELMDS0 [google map api key]