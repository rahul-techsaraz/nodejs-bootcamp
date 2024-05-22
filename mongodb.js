/**
 * MONGODB: MongoDB is a document database with the scalibility and
 * flexibility that you want with the querying and indexing that you need
 *
 * Key Features:
 *
 * Doument Based: Mongodb store the data in documents (Field value pair data structures, NoSql), E.g Json
 *
 * Scalable: Veru easy to distribute data across multiple machine as your users and amount of data grows
 *
 * Flexible: No document data schema required , so each document can have different number and type of fields.
 *
 * Performant: Embedded data models , indexing , sharding , flexible document, native duplications etc.
 *
 * Free and opened source , published under the SSPL license
 *
 * Document Structure:
 *
 * BSON: Data format MongoDB uses for data storage Like json but typed. So MongoDB documents are typed
 *
 * Create DB: use DBNAME (it will switch to the given db if exist already else it will create new one and switch)
 *
 * INSERT RECORD:
 * db.COLLECTION_NAME.insertOne(json object you want to insert)
 *
 * GET THE RECORD FROM
 * db.COLLECTION_NAME.find()
 *
 * SHOW ALL THE COLLECTION
 *
 * show collection
 *
 * QUERY DOCUMENT
 *
 * db.COLLECTION_NAME.find({pass the filter criteria})
 *
 * CHECK THE PRICE LESS THAN 500
 *
 * db.COLLECTION_NAME.find({price:{$lte:500}})
 *
 * IF CHECKS 2 CONDITION IS TRUE
 * db.COLLECTION_NAME.find({price:{$lte:500}},rating:{$gte:4.8}})
 *
 * IF CHECKS any CONDITION IS TRUE
 * db.COLLECTION_NAME.find({$or:[{price:{$lte:500}},rating:{$gte:4.8}}]})
 *
 * UPDATE QUERY
 * db.COLLECTION_NAME.updateOne({pass the filter criteria},{$set:{New value in key value}})
 *
 *
 *
 *  
 *
 *
 */