import express from "express";
const router = express.Router();
import { MongoClient } from "mongodb";
import { DateTime } from "luxon";
router.use(express.json());
// Connection URL
const url =
  "mongodb+srv://Maverick123:Arunesh123@cluster0.ufox0de.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url, { useUnifiedTopology: true });

// Connect to the MongoDB server
client.connect((err) => {
  if (err) {
    console.error("Error connecting to MongoDB:", err);
    return;
  }
});

console.log("Connected to MongoDB");

router.get("/", async (req, res) => {
  try {
    const bankNames = JSON.parse(req.query.bankNames);
    const date = req.query.date;
    const dateStr = date;
    findMaxInterestRateUntilDate(dateStr);
    async function findMaxInterestRateUntilDate(dateStr) {
      // Connect to MongoDB
      const client = await MongoClient.connect(
        "mongodb+srv://Maverick123:Arunesh123@cluster0.ufox0de.mongodb.net/?retryWrites=true&w=majority",
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
      );
      const db = client.db("newproject");
      const collection = db.collection("banksdata");

      // Convert the date string to a Date object
      const date = new Date(dateStr);

      // Get a list of all unique bank IDs
      const bankIds = bankNames;
      const final = [];

      // Iterate over bank IDs and find the maximum interest rate until the specified date
      for (const bankId of bankIds) {
        const pipeline = [
          { $match: { bank_id: bankId, min: { $lte: date } } }, // Filter documents for the given bank and dates until the specified date
          {
            $group: {
              _id: "$bank_id",
              max_interest_rate: { $max: { $toDouble: "$General Public" } },
              maturity_values: { $push: "$Maturity" },
              interest_rates: { $push: { $toDouble: "$General Public" } },
            },
          },
          {
            $project: {
              max_interest_rate: 1,
              maturity: {
                $arrayElemAt: [
                  "$maturity_values",
                  {
                    $indexOfArray: [
                      "$interest_rates",
                      { $max: "$interest_rates" },
                    ],
                  },
                ],
              },
            },
          },
        ];

        const result = await collection.aggregate(pipeline).toArray();

        // Print the result
        result.forEach((doc) => {
          const bankId = doc._id;
          const maxInterestRate = doc.max_interest_rate;
          const maturity = doc.maturity;
          console.log(
            `Bank ID: ${bankId}, Maximum Interest Rate until ${dateStr}: ${maxInterestRate} and maturity is ${maturity}`
          );
          console.log("");
          final.push({
            bank_id: bankId,
            maximuminterestrate: maxInterestRate,
            Maturity: maturity,
          });
        });
      }
      final.sort((a, b) => b.maximuminterestrate - a.maximuminterestrate);
      res.send(final);

      // Close the MongoDB connection
      client.close();
     
      

    }
  }catch(e){
    console.log(`the error in result is ${e}`);
  }
  // Usage example
  
});

export { router as bankrouter };
