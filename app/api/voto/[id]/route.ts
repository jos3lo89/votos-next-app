import { NextResponse } from "next/server";

type Params = { params: Promise<{ id: string }> };

export const GET = async (request: NextResponse, { params }: Params) => {
  try {
    const { id } = await params;

    return NextResponse.json({ id });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error });
  }
};
