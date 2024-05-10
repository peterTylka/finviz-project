import { XMLFileResponse } from "@/types/xml-file-response";
import { getSynsetsFromFile } from "@/utils";

export async function GET(request: Request) {
  return Response.json({ synsets: getSynsetsFromFile() } as XMLFileResponse);
}
