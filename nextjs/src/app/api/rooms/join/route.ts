import { NextRequest, NextResponse } from 'next/server';
import Room from '@/models/room';

interface RequestBody {
    roomId: string;
    userId: string;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        const { roomId, userId }: RequestBody = await req.json(); // Parse the request body with type definition
        const room = await Room.findByIdAndUpdate(
            roomId,
            { $addToSet: { participants: userId } },
            { new: true }
        );
        return new NextResponse(JSON.stringify(room), { status: 200 });
    } catch (error: any) {
        return new NextResponse(JSON.stringify({ error: error.message }), {
            status: 500,
        });
    }
}
