import { MongoClient } from 'mongodb';

const client = new MongoClient('mongodb+srv://abhisheksaini642794_db_user:iRYeh96NYSl69cqC@cluster0.mongodb.net/profiles?retryWrites=true&w=majority');

client.connect()
  .then(() => {
    console.log('✅ Connected successfully!');
    return client.close();
  })
  .then(() => {
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Connection failed:', err.message);
    process.exit(1);
  });
