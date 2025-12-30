// 🔥 FIXED VERSION

export async function POST(req) {
  try {
    const body = await req.json();
    const { url } = body;

    if (!url || !isValidURL(url)) {
      return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
    }

    if (isBlockedURL(url)) {
      return NextResponse.json(
        { error: "Local URLs not allowed" },
        { status: 400 }
      );
    }

    // ✅ FIX HERE
    const analysis = await analyzeWebsite(body);

    let aiMessage = null;

    if (shouldUseGemini(analysis)) {
      aiMessage = await getGeminiResponse(analysis.issues);
    }

    return NextResponse.json({
      score: analysis.score,
      issues: analysis.issues,
      aiMessage,
    });

  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
