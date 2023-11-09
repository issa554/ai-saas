import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
    
  ) {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    await prismadb.proUser.create({
      data :{ userId : userId }
  })

   return new NextResponse("Done", { status: 200 });;
  }