import { NextRequest, NextResponse } from 'next/server';
import Room from '@/models/room';
import connectDB from '@/config/db';

export async function GET(req: NextRequest): Promise<NextResponse> {
    const roomName = req.nextUrl.searchParams.get('roomName'); // Extract roomName query parameter

    await connectDB();

    if (!roomName) {
        return new NextResponse(
            JSON.stringify({ error: 'roomName query parameter is required' }),
            { status: 400 }
        );
    }

    try {
        const room = await Room.findOne({ name: roomName })
            .select('_id')
            .exec();

        if (!room) {
            return new NextResponse(
                JSON.stringify({ error: 'Room not found' }),
                { status: 404 }
            );
        }

        return new NextResponse(JSON.stringify({ roomId: room._id }), {
            status: 200,
        });
    } catch (error: any) {
        return new NextResponse(JSON.stringify({ error: error.message }), {
            status: 500,
        });
    }
}
