import fs from "fs";
import convert from "xml-js";

export async function GET(request: Request) {
  // const res = await fetch(`https://data.mongodb-api.com/product/${id}`, {
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'API-Key': process.env.DATA_API_KEY!,
  //   },
  // })
  // const product = await res.json()

  // const parser = new XMLParser();
  // const obj = parser.parse(
  //   fs.readFileSync("./src/app/api/xml-file/data.xml").toString()
  // );

  const obj = convert.xml2json(
    fs.readFileSync("./src/app/api/xml-file/data.xml").toString(),
    {}
  );

  // const filenames = fs.readdirSync("./api/xml-file/data.xml");

  console.log("%c ROUTE", "background-color: skyblue", {});

  return Response.json(obj);
}
