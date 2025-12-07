import { NextResponse } from "next/server";
import { readdirSync, statSync } from "fs";
import { join } from "path";

interface DemoPage {
  name: string;
  path: string;
  description: string;
}

// Функция для преобразования kebab-case в читаемое название
function formatDemoName(folderName: string): string {
  // Убираем префикс "demo-" если есть
  const name = folderName.startsWith('demo-') ? folderName.substring(5) : folderName;

  // Преобразуем kebab-case в Title Case
  return name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Функция для генерации описания на основе названия
function generateDescription(demoName: string): string {
  const descriptions: Record<string, string> = {
    'floor1': 'Демонстрация работы с первым этажом',
    'nps': 'Демонстрация системы NPS',
    'reglament': 'Демонстрация регламентных процессов',
  };

  // Ищем совпадения по ключевым словам
  for (const [key, desc] of Object.entries(descriptions)) {
    if (demoName.toLowerCase().includes(key)) {
      return desc;
    }
  }

  // Дефолтное описание
  return `Демонстрация ${demoName.toLowerCase()}`;
}

export async function GET() {
  try {
    const demosDir = join(process.cwd(), 'app', 'demos');

    // Получаем список подпапок в demos
    const folders = readdirSync(demosDir)
      .filter(item => {
        const itemPath = join(demosDir, item);
        return statSync(itemPath).isDirectory();
      })
      .filter(folder => {
        // Проверяем, что в папке есть page.tsx
        try {
          statSync(join(demosDir, folder, 'page.tsx'));
          return true;
        } catch {
          return false;
        }
      });

    // Создаем массив демо-страниц
    const demoPages: DemoPage[] = folders.map(folder => ({
      name: formatDemoName(folder),
      path: `/demos/${folder}`,
      description: generateDescription(folder),
    }));

    return NextResponse.json({ demos: demoPages });
  } catch (error) {
    console.error('Error scanning demos directory:', error);
    return NextResponse.json(
      { error: 'Ошибка при получении списка демо' },
      { status: 500 }
    );
  }
}