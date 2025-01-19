import { NextRequest, NextResponse } from 'next/server';
import Room from '@/models/room';
import { RequestBody } from '@/types/room';

export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        const { roomId, userId }: RequestBody = await req.json();
        const room = await Room.findByIdAndUpdate(
            roomId,
            { $pull: { participants: userId } },
            { new: true }
        );
        return new NextResponse(JSON.stringify(room), { status: 200 });
    } catch (error: any) {
        return new NextResponse(JSON.stringify({ error: error.message }), {
            status: 500,
        });
    }
}
