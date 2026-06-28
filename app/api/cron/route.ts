import { NextResponse } from 'next/server';

// This function will run every night at 12 AM (0 0 * * *) as configured in vercel.json
export async function GET(request: Request) {
  // Validate authorization (Vercel automatically sends a CRON_SECRET header if configured in env variables)
  const authHeader = request.headers.get('authorization');
  
  // Note: For production, you should verify the CRON_SECRET
  // if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
  //   return new Response('Unauthorized', { status: 401 });
  // }

  console.log("Nightly maintenance cron job executed successfully at 12 AM.");
  
  // Future implementation: daily cleanup, email triggers, or cache invalidation logic can go here.

  return NextResponse.json({ success: true, message: "Nightly cron executed successfully." });
}
