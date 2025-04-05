import * as cheerio from 'cheerio';
import { NextResponse } from 'next/server';

export async function GET() {
  const start = 1049;
  const end = 1100;

  const lottoResults = await Promise.all(
    Array.from({ length: end - start + 1 }, (_, i) => start + i).map(async (round) => {
      try {
        const res = await fetch(
          `https://dhlottery.co.kr/gameResult.do?method=byWin&drwNo=${round}`,
        );
        const html = await res.text();
        const $ = cheerio.load(html);

        const winNumbers: string[] = [];
        $('.nums .num.win p span').each((_, el) => {
          winNumbers.push($(el).text());
        });

        const bonusNumber = $('.nums .num.bonus p span').text();

        return {
          round,
          winNumbers,
          bonusNumber,
        };
      } catch (e) {
        console.warn(`${round}회차 실패:`, e);
        return null;
      }
    }),
  );

  const filteredResults = lottoResults.filter(Boolean);

  return NextResponse.json({ data: filteredResults });
}
