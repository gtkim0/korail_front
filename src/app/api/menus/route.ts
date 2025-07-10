import { NextResponse } from 'next/server';
import {dummyMenu} from "@/data/dummyMenu";

export async function GET() {
  try {
    // const menus = await getMenus();
    const menus = dummyMenu;

    return NextResponse.json(menus);
  } catch (error) {
    console.error('[GET /api/menus]', error);
    return NextResponse.json(
      { message: 'Failed to fetch menu' },
      { status: 500 }
    );
  }
}