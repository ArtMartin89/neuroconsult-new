import { NextResponse } from "next/server";

const N8N_WEBHOOK_URL = "https://clecucuci.beget.app/webhook/c35da7d0-2308-4de6-8f3d-d6fd93b29b96";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message, sessionId } = body;

    // Валидация сообщения
    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json(
        { error: "Сообщение не может быть пустым" },
        { status: 400 }
      );
    }

    // Генерация sessionId если не передан
    const chatId = sessionId || `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    // Формируем payload как в рабочем проекте
    const payload = {
      message: message.trim(),
      sessionId: chatId,
      chatId: chatId,
      userId: chatId,
      timestamp: new Date().toISOString(),
    };

    // Отправка сообщения в n8n webhook
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    // Получаем сырой ответ от n8n
    const rawBody = await response.text();

    if (!response.ok) {
      console.error("n8n webhook error:", response.status, response.statusText, rawBody);
      return NextResponse.json(
        {
          error: "Ошибка при отправке сообщения",
          status: response.status,
          details: rawBody,
        },
        { status: response.status }
      );
    }

    // Логируем сырой ответ для отладки
    console.log("n8n raw response:", rawBody.substring(0, 500)); // Первые 500 символов

    // Пытаемся распарсить как JSON
    let parsedData: any;
    try {
      parsedData = JSON.parse(rawBody);
      console.log("n8n parsed data:", JSON.stringify(parsedData, null, 2).substring(0, 1000));
    } catch {
      // Если ответ не JSON, оборачиваем в reply (как в routeAS.ts)
      console.log("n8n returned non-JSON response");
      return NextResponse.json({ reply: rawBody });
    }

    // Функция для извлечения reply из данных
    const extractReply = (data: any): string | null => {
      if (!data) return null;

      // Если это строка, возвращаем её
      if (typeof data === 'string') return data;

      // Если есть поле reply, возвращаем его
      if (data.reply) return typeof data.reply === 'string' ? data.reply : String(data.reply);

      // Если это массив, обрабатываем последний элемент
      if (Array.isArray(data) && data.length > 0) {
        const lastItem = data[data.length - 1];
        // Проверяем поле json в элементе массива (стандартный формат n8n)
        const itemData = lastItem?.json || lastItem;
        return extractReply(itemData);
      }

      // Если это объект, ищем reply или другие возможные поля
      if (typeof data === 'object') {
        return data.output || data.text || data.message || data.response || data.answer || null;
      }

      return null;
    };

    // Извлекаем reply
    const reply = extractReply(parsedData);

    if (reply) {
      console.log("Extracted reply:", reply);
      return NextResponse.json({ reply });
    }

    // Если не удалось извлечь reply, возвращаем данные как есть
    // (возможно, n8n уже вернул правильный формат)
    console.log("No reply found, returning data as-is:", parsedData);
    return NextResponse.json(parsedData);
  } catch (error) {
    console.error("Chat API error:", error);

    return NextResponse.json(
      {
        error: "Ошибка при обработке сообщения",
        details: error instanceof Error ? error.message : "Неизвестная ошибка",
      },
      { status: 500 }
    );
  }
}