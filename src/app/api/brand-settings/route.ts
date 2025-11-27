import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const SETTINGS_FILE = path.join(process.cwd(), 'brand-settings.json');

const defaultSettings = {
    brandName: 'TestPrep',
    logoUrl: null,
    showText: true,
    showLogo: false,
    logoWidth: 40,
};

export async function GET() {
    try {
        if (fs.existsSync(SETTINGS_FILE)) {
            const data = fs.readFileSync(SETTINGS_FILE, 'utf-8');
            return NextResponse.json(JSON.parse(data));
        }
        return NextResponse.json(defaultSettings);
    } catch {
        return NextResponse.json(defaultSettings);
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        // Validate body if needed
        fs.writeFileSync(SETTINGS_FILE, JSON.stringify(body, null, 2));
        return NextResponse.json({ success: true, settings: body });
    } catch {
        return NextResponse.json({ success: false, error: 'Failed to save settings' }, { status: 500 });
    }
}
