import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {
const query = request.nextUrl.searchParams.get("query")
// Replace the uri string with your connection string.

const uri = "mongodb+srv://Jarvis:Marvel1234!@atlascluster.rpwkswp.mongodb.net/";
const client = new MongoClient(uri);
  try {
    const database = client.db('data');
    const inventory = database.collection('inventory');



   
    const products = await inventory.aggregate([
        {
              $match: {
                  $or: [
              { slug: {$regex: query, $options: "i"} }, // Partial matching for slug field
              // {quantity: {$regex: "your_query_string", $options: "i"} }, // Partial matching for quantity field
              // { price: {$regex: "your_query_string", $options: "i"} }, // Partial matching for price field
                  ]
              }
          }
      ]).toArray()
    return NextResponse.json({success: true, products})
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
 
