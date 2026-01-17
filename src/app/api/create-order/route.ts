import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { paymentIntentId, amount, items, billingDetails } = await request.json();

    const wpUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || "http://43.165.68.39/";
    const ck = process.env.WC_CONSUMER_KEY;
    const cs = process.env.WC_CONSUMER_SECRET;

    if (!ck || !cs) {
      return NextResponse.json({ error: "Server misconfiguration: Missing WC credentials" }, { status: 500 });
    }

    // Map cart items to WooCommerce line items
    // Note: This assumes 'id' in cartItems corresponds to WC product ID.
    const line_items = items.map((item: any) => ({
      product_id: item.id,
      quantity: item.quantity,
    }));

    const orderData = {
      payment_method: "stripe",
      payment_method_title: "Credit Card (Stripe)",
      set_paid: true,
      billing: {
        first_name: billingDetails.firstName,
        last_name: billingDetails.lastName,
        address_1: billingDetails.address,
        address_2: billingDetails.apartment,
        city: billingDetails.city,
        state: billingDetails.state,
        postcode: billingDetails.zipCode,
        country: "US", // Mapping simplified
        email: billingDetails.email,
        phone: "",
      },
      shipping: {
        first_name: billingDetails.firstName,
        last_name: billingDetails.lastName,
        address_1: billingDetails.address,
        address_2: billingDetails.apartment,
        city: billingDetails.city,
        state: billingDetails.state,
        postcode: billingDetails.zipCode,
        country: "US",
      },
      line_items: line_items,
      meta_data: [
        {
          key: "_stripe_payment_intent",
          value: paymentIntentId,
        },
      ],
    };

    const auth = Buffer.from(`${ck}:${cs}`).toString("base64");

    const res = await fetch(`${wpUrl}wp-json/wc/v3/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${auth}`,
      },
      body: JSON.stringify(orderData),
    });

    const responseData = await res.json();

    if (!res.ok) {
      console.error("WooCommerce Order Error:", responseData);
      return NextResponse.json({ error: "Failed to create order in WooCommerce", details: responseData }, { status: res.status });
    }

    return NextResponse.json({ success: true, orderId: responseData.id });
  } catch (error: any) {
    console.error("Create Order Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
