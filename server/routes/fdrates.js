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
    await client.connect();
    const result = await fdrates(bankNames);
    res.send(result);
  } catch (error) {
    console.log(`Error in fetching data in fdrates: ${error}`);
    res.status(500).send({ error: "Internal Server Error" });
  } finally {
    
    await client.close();
  }
});

async function fdrates(bankNames) {
  const db = client.db("FD_project");
  const collection = db.collection("interest_rate");

  // Convert the date string to a Date object
  

  const pipeline = [
    { $unwind: "$interest_rates" }, // Deconstruct the interest_rates array
    {
      $match: {
        bank: { $in: bankNames },
      }
    },
    {
      $group: {
        _id: "$bank",
        maturityRates: {
          $push: {
            maturity: "$interest_rates.Maturity",
            "General Public": { $toDouble: "$interest_rates.General Public" },
          },
        },
      },
    },
    {
      $project: {
        _id: 0, // Exclude the _id field
        bank: "$_id", // Include the bank field
        maturityRates: 1, // Include the maturityRates field
      },
    },
  ];
  
  const result = await collection.aggregate(pipeline).toArray();
  const final = [];

  result.forEach((doc) => {
    const bank = doc.bank; // Bank name
  const maturityRates = doc.maturityRates; // Array of maturity periods and General Public interest rates for the bank

  console.log(`Bank: ${bank}`);

  // Create a container to hold all the maturity periods and interest rates for the bank
  const bankData = {
    bank: bank,
    maturityRates: [],
  };

  // Push the data for each maturity period and General Public interest rate
  maturityRates.forEach((maturityRate) => {
    const maturity = maturityRate.maturity;
    const maximumInterestRate = maturityRate["General Public"]; // Accessing the General Public rate using bracket notation

   

    // Push the maturity period and interest rate to the bankData container
    bankData.maturityRates.push({
      maturity: maturity,
      InterestRate: maximumInterestRate,
    });
  });

  // Push the bankData container to the final array
  final.push(bankData);
  });
  
  return final;
}

export { router as fdratesrouter };
