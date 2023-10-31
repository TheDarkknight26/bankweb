import express from "express";
const router = express.Router();
import { MongoClient } from "mongodb";
import { DateTime } from "luxon";
router.use(express.json());
import dotenv from "dotenv";

dotenv.config();

const url = process.env.MONGOURL;
const client = new MongoClient(url, {
  maxIdleTimeMS: 80000,
  serverSelectionTimeoutMS: 80000,
  socketTimeoutMS: 0,
  connectTimeoutMS: 0,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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

  

  const pipeline = [
    { $unwind: "$interest_rates" }, 
    {
      $match: {
        bank: { $in: bankNames },
      },
    },
    {
      $group: {
        _id: "$bank",
        maturityRates: {
          $push: {
            maturity: "$interest_rates.Maturity",
            "General Public": { $toDouble: "$interest_rates.General Public" },
            "Senior Citizen": { $toDouble: "$interest_rates.Senior Citizen" },
          },
        },
      },
    },
    {
      $project: {
        _id: 0, 
        bank: "$_id", 
        maturityRates: 1, 
      },
    },
  ];

  const result = await collection.aggregate(pipeline).toArray();
  const final = [];

  result.forEach((doc) => {
    const bank = doc.bank; 
    const maturityRates = doc.maturityRates; 

    console.log(`Bank: ${bank}`);

   
    const bankData = {
      bank: bank,
      maturityRates: [],
    };

    
    maturityRates.forEach((maturityRate) => {
      const maturity = maturityRate.maturity;
      const generalInterestRate = maturityRate["General Public"]; 
      const seniorCitizenInterestRate = maturityRate["Senior Citizen"];

      bankData.maturityRates.push({
        maturity: maturity,
        GeneralInterestRate: generalInterestRate,
        SeniorCitizenInterestRate: seniorCitizenInterestRate,
      });
    });

    
    final.push(bankData);
  });

  return final;
}

export { router as fdratesrouter };
