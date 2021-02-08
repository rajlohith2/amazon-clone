/*MONGODB_URL: process.env.MONGODB_URL || 'mongodb+srv://amazona:amazona@cluster0.mmjph.mongodb.net/amazona?retryWrites=true&w=majority', */

export default { 
    MONGODB_URL: process.env.MONGODB_URL || 'mongodb://localhost/amazona',
    JWT_SECRET: process.env.JWT_SECRET || 'somethingsecret',
    NODE_ENV: process.env.DEVELOPMENT || 'production'
}