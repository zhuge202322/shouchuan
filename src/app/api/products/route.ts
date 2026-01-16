import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get('category');
  const perPage = searchParams.get('per_page') || '12';

  const wpUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || "http://43.165.68.39/";

  let apiUrl = `${wpUrl}wp-json/wc/store/products?per_page=${perPage}`;
  if (category) {
    apiUrl += `&category=${category}`;
  }

  try {
    const res = await fetch(apiUrl);
    
    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to fetch from WordPress' }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
