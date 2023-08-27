import express from "express";
const router = express.Router();
import { MongoClient } from "mongodb";
import { DateTime } from "luxon";
router.use(express.json());
import dotenv from "dotenv";

dotenv.config();

const url= process.env.MONGOURL;
const client = new MongoClient(url, { maxIdleTimeMS: 80000,
  serverSelectionTimeoutMS: 80000,
  socketTimeoutMS: 0,
  connectTimeoutMS: 0, useNewUrlParser: true,useUnifiedTopology: true });



router.get("/", async (req, res) => {
  try {
    const bankNames = JSON.parse(req.query.bankNames);
    const date = req.query.date;
    const mindate = req.query.mindate;
    const maxdate = req.query.maxdate;
    const dateStr = date;
    console.log(mindate,maxdate);
    await client.connect();
    const result = await findMaxInterestRateUntilDate(mindate,maxdate,dateStr,bankNames);
    res.send(result);
  } catch (error) {
    console.log(`Error in fetching data in result: ${error}`);
    res.status(500).send({ error: "Internal Server Error" });
  } finally {
    // Close the MongoDB connection
    await client.close();
  }
});

async function findMaxInterestRateUntilDate(mindate,maxdate,dateStr, bankNames) {
  const db = client.db("FD_project");
  const collection = db.collection("interest_rate");

  // Convert the date string to a Date object
  const dateS = new Date(dateStr);
  const minDate = new Date(mindate);
  const maxDate = new Date(maxdate);

  const pipeline = [
    { $unwind: "$interest_rates" },
    {
      $match: {
        bank: { $in: bankNames },
        $or: [
          {
            "interest_rates.min": { $gte: minDate },
            "interest_rates.max": { $lte: maxDate }
          },
          {
            "interest_rates.min": { $lte: maxDate },
            "interest_rates.max": { $gte: maxDate }
          },
          {
            "interest_rates.min": { $lte: minDate },
            "interest_rates.max": { $gte: minDate }
          }
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
    console.log(
      `Bank ID: ${bankId}, Maximum Interest Rate until ${dateStr}: ${maxInterestRate} and maturity is ${maturity} in resultbtw`
    );

    final.push({
      bank_id: bankId,
      maximuminterestrate: maxInterestRate,
      Maturity: maturity
    });
  });

  final.sort((a, b) => b.maximuminterestrate - a.maximuminterestrate);
  return final;
}

export { router as bankrouternew };
