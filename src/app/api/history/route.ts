import { NextRequest, NextResponse } from 'next/server';
import { getRunHistory } from '@/lib/store';

// GET /api/history - Get run history
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const limitParam = searchParams.get('limit');
        const limit = limitParam ? Math.min(parseInt(limitParam, 10), 20) : 5;

        const history = getRunHistory(limit);
        return NextResponse.json({ history });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch run history' },
            { status: 500 }
        );
    }
}
