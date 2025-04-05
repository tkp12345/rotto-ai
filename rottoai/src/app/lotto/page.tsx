'use client';

import { useEffect, useState } from 'react';

type LottoItem = {
  round: number;
  winNumbers: string[];
  bonusNumber: string;
};

export default function LottoPage() {
  const [lottoList, setLottoList] = useState<LottoItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/lotto/api')
      .then((res) => res.json())
      .then((json) => {
        setLottoList(json.data);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>로딩 중...</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">최근 1년간 로또 당첨 번호</h1>
      {lottoList.map(({ round, winNumbers, bonusNumber }) => (
        <div key={round} className="mb-2">
          <strong>{round}회:</strong> {winNumbers.join(', ')} + 보너스: {bonusNumber}
        </div>
      ))}
    </div>
  );
}
