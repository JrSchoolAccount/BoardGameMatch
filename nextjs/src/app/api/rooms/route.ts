import { NextRequest, NextResponse } from 'next/server';
import Room from '@/models/room';
import connectDB from '@/config/db';

export async function GET(req: NextRequest): Promise<NextResponse> {
    const userId = req.nextUrl.searchParams.get('userId');

    await connectDB();

    if (!userId) {
        return new NextResponse(
            JSON.stringify({ error: 'userId query parameter is required' }),
            { status: 400 }
        );
    }

    try {
        const rooms = await Room.find({ participants: userId })
            .populate('lastMessage')
            .exec();

        return new NextResponse(JSON.stringify(rooms), { status: 200 });
    } catch (error: any) {
        return new NextResponse(JSON.stringify({ error: error.message }), {
            status: 500,
        });
    }
}
