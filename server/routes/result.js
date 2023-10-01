import express from "express";
const router = express.Router();
import { MongoClient } from "mongodb";
import { DateTime } from "luxon";
router.use(express.json());
import dotenv from "dotenv";

dotenv.config();

const url= "mongodb+srv://theanishk:sXDNAjLpOZvPdAQa@fdproject.qwukrev.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url, { maxIdleTimeMS: 80000,
  serverSelectionTimeoutMS: 80000,
  socketTimeoutMS: 0,
  connectTimeoutMS: 0, useNewUrlParser: true,useUnifiedTopology: true });

router.get("/", async (req, res) => {
  try {
    const bankNames = JSON.parse(req.query.bankNames);
    const date = req.query.date;
    const dateStr = date;
    await client.connect();
    const result = await findMaxInterestRateUntilDate(dateStr, bankNames);
   
    console.log(dateStr);
    res.send(result);
  } catch (error) {
    console.log(`Error in fetching data in result: ${error}`);
    res.status(500).send({ error: "Internal Server Error" });
  } finally {
    // Close the MongoDB connection
    await client.close();
  }
});

async function findMaxInterestRateUntilDate(dateStr, bankNames) {
  const db = client.db("FD_project");
  const collection = db.collection("interest_rate");

  const dateS = new Date(dateStr);
  console.log(dateS,"newdate");
  
  const pipeline = [
    { $unwind: "$interest_rates" },
    {
      $match: {
        bank: { $in: bankNames },
        $and: [
          { "interest_rates.min": { $lte: dateS } },
          { "interest_rates.max": { $gte: dateS } }
        ]
      }
    },
  {
    $group: {
      _id: "$bank",
      max_interest_rate: {
        $max: { $toDouble: "$interest_rates.General Public" }
      },
      maturity_values: { $push: "$interest_rates.Maturity" },
      interest_rates: {
        $push: { $toDouble: "$interest_rates.General Public" }
      },
      banksRemainingAfterGroup: {
        $addToSet: "$bank" // Collect bank names after the $group stage
      }
    }
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
              { $max: "$interest_rates" }
            ]
          }
        ]
      },
      banksRemainingAfterProject: {
        $ifNull: ["$banksRemainingAfterGroup", ["$bank"]] // Collect bank names after the $project stage
      }
    }
  }
];

const result = await collection.aggregate(pipeline).toArray();
  const final = [];

  // Print the result and add to the final array
  result.forEach((doc) => {
    const bankId = doc._id;
    const maxInterestRate = doc.max_interest_rate;
    const maturity = doc.maturity;
    // console.log(
    //   `Bank ID: ${bankId}, Maximum Interest Rate until ${dateStr}: ${maxInterestRate} and maturity is ${maturity} in result`
    // );
    
    final.push({
      bank_id: bankId,
      maximuminterestrate: maxInterestRate,
      Maturity: maturity
    });
  });

  final.sort((a, b) => b.maximuminterestrate - a.maximuminterestrate);
  return final;
}


export { router as bankrouter };
