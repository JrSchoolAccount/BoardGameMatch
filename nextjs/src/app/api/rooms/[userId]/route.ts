import { NextResponse } from 'next/server';
import Room from '@/models/room';

export async function GET({
    params,
}: {
    params: { userId: string };
}): Promise<NextResponse> {
    const { userId } = params;
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
