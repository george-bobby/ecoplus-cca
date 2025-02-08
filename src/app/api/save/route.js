import clientPromise from "../../../dbConnect";

export async function POST(req) {
  try {
    const client = await clientPromise;
    const db = client.db("carbo");
    const data = await req.json();

    if (!data.clerkId || !data.monthlyData) {
      return new Response(JSON.stringify({ error: "Invalid payload" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { clerkId, monthlyData, ...restData } = data;

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Fetch existing document
    const existingDocument = await db
      .collection("overall")
      .findOne({ clerkId });

    // Initialize monthly data with default values or use existing data
    const existingMonthlyData = existingDocument?.monthlyData || {};
    const initialMonthlyData = Object.fromEntries(
      months.map((month) => [month, 0])
    );

    // Merge the current month's data
    const mergedMonthlyData = {
      ...initialMonthlyData,
      ...existingMonthlyData,
      ...monthlyData,
    };

    // Update the document
    const result = await db.collection("overall").findOneAndUpdate(
      { clerkId },
      {
        $set: {
          ...restData,
          updatedAt: new Date(restData.updatedAt),
          monthlyData: mergedMonthlyData, // Include the merged monthly data
        },
        $setOnInsert: {
          createdAt: new Date(),
        },
      },
      { upsert: true, returnDocument: "after" }
    );

    return new Response(
      JSON.stringify({
        message: "Document saved successfully",
        data: result.value,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in /api/save route:", error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
