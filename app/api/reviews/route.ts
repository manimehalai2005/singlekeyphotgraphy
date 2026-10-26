import { NextResponse } from 'next/server';

export async function GET() {
  const PLACE_ID = process.env.GOOGLE_PLACE_ID;
  const API_KEY = process.env.GOOGLE_MAPS_API_KEY;

  if (!PLACE_ID || !API_KEY) {
    return NextResponse.json(
      { error: 'Google Place ID or API Key is missing in environment variables' },
      { status: 400 }
    );
  }

  try {
    // Google Places API (New) call
    const response = await fetch(
      `https://places.googleapis.com/v1/places/${PLACE_ID}?fields=reviews,rating,userRatingCount`,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': API_KEY,
          'X-Goog-FieldMask': 'reviews,rating,userRatingCount',
        },
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.error?.message || 'Failed to fetch from Google Places API' },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error while fetching live reviews' },
      { status: 500 }
    );
  }
}