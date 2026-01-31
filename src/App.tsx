import React, { useState, useEffect } from 'react';

// --- VERİTABANI ---
const FISH_DB = [
  {
    id: 1,
    name: 'Ahtapot',
    img: 'ahtapot.png',
    fact: 'Ahtapotlar çok zeki hayvanlardır ve üç kalpleri vardır.',
  },
  {
    id: 2,
    name: 'Akya',
    img: 'akya.png',
    fact: 'Güçlü bir avcı olan Akya, genellikle sıcak denizlerde bulunur.',
  },
  {
    id: 3,
    name: 'Alabalık',
    img: 'alabalik.png',
    fact: 'Tatlı sularda ve soğuk nehirlerde yaşayan Alabalık, pullarındaki beneklerle tanınır.',
  },
  {
    id: 4,
    name: 'Barbun',
    img: 'barbun.png',
    fact: 'Pembe rengi ve lezzetli etiyle bilinen Barbun, Ege ve Akdeniz\'s popülerdir.',
  },
  {
    id: 5,
    name: 'Çipura',
    img: 'cipura.png',
    fact: 'Yanlarındaki altın sarısı şerit nedeniyle "altınbaş" olarak da bilinir.',
  },
  {
    id: 6,
    name: 'Granyoz',
    img: 'granyoz.png',
    fact: 'Büyük ve yırtıcı bir balık olan Granyoz, "gölge balığı" olarak da anılır.',
  },
  {
    id: 7,
    name: 'Hamsi',
    img: 'hamsi.png',
    fact: 'Karadeniz\'s simgesi olan Hamsi, sürüler halinde yaşar ve kış aylarının vazgeçilmezidir.',
  },
  {
    id: 8,
    name: 'İstavrit',
    img: 'istavrit.png',
    fact: 'Marmara Denizi\'sde bolca bulunan İstavrit, genellikle tavada kızartılarak tüketilir.',
  },
  {
    id: 9,
    name: 'Kalamar',
    img: 'kalamar.png',
    fact: 'On kolu olan Kalamar, mürekkep püskürterek kendini savunur.',
  },
  {
    id: 10,
    name: 'Karides',
    img: 'karides.png',
    fact: 'Lezzetli bir kabuklu olan Karides, hem tatlı hem de tuzlu sularda yaşayabilir.',
  },
  {
    id: 11,
    name: 'Kerevit',
    img: 'kerevit.png',
    fact: 'Tatlı su ıstakozu olarak da bilinen Kerevit, temiz akarsularda yaşar.',
  },
  {
    id: 12,
    name: 'Kırmızı Karides',
    img: 'kirmizi-karides.png',
    fact: 'Derin ve soğuk sularda yaşayan bu karides türü, parlak kırmızı rengiyle dikkat çeker.',
  },
  {
    id: 13,
    name: 'Kolyoz',
    img: 'kolyoz.png',
    fact: 'Uskumruya benzeyen Kolyoz, daha küçük ve daha az yağlıdır.',
  },
  {
    id: 14,
    name: 'Kupes',
    img: 'kupes.png',
    fact: 'Sıcak ve ılıman denizlerin kıyı bölgelerinde yaşayan gümüş renkli bir balıktır.',
  },
  {
    id: 15,
    name: 'Levrek',
    img: 'levrek.png',
    fact: 'Hem acı hem tatlı suda yaşayabilen Levrek, avcı ve yırtıcı bir balıktır.',
  },
  {
    id: 16,
    name: 'Lüfer',
    img: 'lufer.png',
    fact: 'Boğaz\'s incisi olarak bilinen Lüfer, keskin dişleri ve lezzetli etiyle ünlüdür.',
  },
  {
    id: 17,
    name: 'Mantis Karidesi',
    img: 'mantis-karidesi.png',
    fact: 'Peygamberdevesine benzediği için bu adı alan Mantis Karidesi, çok güçlü pençelere sahiptir.',
  },
  {
    id: 18,
    name: 'Mezgit',
    img: 'mezgit.png',
    fact: 'Soğuk denizlerin dip balığı olan Mezgit, beyaz ve lezzetli etiyle bilinir.',
  },
  {
    id: 19,
    name: 'Palamut',
    img: 'palamut.png',
    fact: 'Sonbahar aylarında Karadeniz\'den Marmara\'ya göç eden Palamut, torik balığının küçüğüdür.',
  },
  {
    id: 20,
    name: 'Sardalya',
    img: 'sardalya.png',
    fact: 'Genellikle konserve olarak tüketilen Sardalya, sürü halinde gezen küçük bir balıktır.',
  },
  {
    id: 21,
    name: 'Somon',
    img: 'somon.png',
    fact: 'Pembe etiyle ünlü Somon, yumurtlamak için doğduğu nehirlere geri döner.',
  },
  {
    id: 22,
    name: 'Tombik',
    img: 'tombik.png',
    fact: 'Orkinos familyasından gelen Tombik, genellikle konserve ton balığı yapımında kullanılır.',
  },
  {
    id: 23,
    name: 'Türk Somonu',
    img: 'turk-somonu.png',
    fact: 'Karadeniz\'de yetiştirilen ve "Karadeniz Somonu" olarak da bilinen bir alabalık türüdür.',
  },
  {
    id: 24,
    name: 'Uskumru',
    img: 'uskumru.png',
    fact: 'Mavi-yeşil sırt deseniyle tanınan Uskumru, göçmen bir balıktır ve dolması meşhurdur.',
  },
];

const TOTAL_ROUNDS = 5;

// --- YARDIMCI KOMPONENTLER (SVG) ---

const FishermanSVG = ({ rodRotation }) => (
  <svg viewBox="0 0 200 200" className="w-64 h-64 drop-shadow-lg">
    {/* Balıkçı Gövde */}
    <path
      d="M80,140 Q70,190 60,200 L120,200 Q110,190 100,140 Z"
      fill="#F59E0B"
    />
    <circle cx="90" cy="120" r="20" fill="#FCD34D" />
    <path
      d="M70,125 Q50,150 40,140"
      fill="none"
      stroke="#F59E0B"
      strokeWidth="8"
      strokeLinecap="round"
    />

    {/* Olta Kamışı (Dinamik Rotasyon) */}
    <g
      transform={`rotate(${rodRotation}, 90, 140)`}
      style={{ transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}
    >
      {/* Kamış */}
      <line
        x1="90"
        y1="140"
        x2="180"
        y2="50"
        stroke="#4B5563"
        strokeWidth="4"
        strokeLinecap="round"
      />
      {/* Makara */}
      <circle cx="100" cy="130" r="5" fill="#1F2937" />
    </g>
  </svg>
);

const MedalIcon = ({ type }) => {
  const colors = {
    gold: {
      text: 'text-yellow-400',
      bg: 'bg-yellow-100',
      border: 'border-yellow-400',
    },
    silver: {
      text: 'text-gray-400',
      bg: 'bg-gray-100',
      border: 'border-gray-400',
    },
    bronze: {
      text: 'text-orange-700',
      bg: 'bg-orange-100',
      border: 'border-orange-700',
    },
  };
  const style = colors[type];

  return (
    <div
      className={`w-24 h-24 rounded-full flex items-center justify-center border-4 ${style.border} ${style.bg} shadow-xl mb-4`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={`w-12 h-12 ${style.text}`}
      >
        <path
          fillRule="evenodd"
          d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 00-.584.859 6.753 6.753 0 006.138 5.6 6.73 6.73 0 002.743 1.346A6.707 6.707 0 019.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a2.25 2.25 0 00-2.25 2.25c0 .414.336.75.75.75h15a.75.75 0 00.75-.75 2.25 2.25 0 00-2.25-2.25h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.706 6.706 0 01-1.612-3.179 6.73 6.73 0 002.743-1.347 6.753 6.753 0 006.139-5.6.75.75 0 00-.585-.858 47.077 47.077 0 00-3.07-.543V2.62a.75.75 0 00-.658-.744 49.22 49.22 0 00-6.093-.377c-2.063 0-4.096.128-6.093.377a.75.75 0 00-.657.744zm0 2.629c0 1.196.312 2.32.857 3.294A5.266 5.266 0 013.16 5.337a45.6 45.6 0 012.006-.348zm13.668.348a5.265 5.265 0 01-2.863 3.178c.545-.973.858-2.098.858-3.294 0-.116-.003-.23-.008-.345.67.091 1.334.208 1.996.349z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
};

// --- ANA OYUN KOMPONENTİ ---

export default function FishingGame() {
  // Oyun Durumları: 'start', 'casting', 'quiz', 'feedback', 'end'
  const [gameState, setGameState] = useState('start');
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [currentFish, setCurrentFish] = useState(null);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);

  // Animasyon Durumları
  const [rodRotation, setRodRotation] = useState(0);
  const [hookPosition, setHookPosition] = useState({ x: 0, y: 0 }); // Relative position
  const [showSplash, setShowSplash] = useState(false);
  const [showHook, setShowHook] = useState(false);

  // --- OYUN MEKANİKLERİ ---

  const startGame = () => {
    setScore(0);
    setRound(1);
    prepareRound();
  };

  const prepareRound = () => {
    setGameState('casting');
    setRodRotation(0);
    setHookPosition({ x: 0, y: 0 });
    setShowSplash(false);
    setShowHook(false);
    setSelectedOption(null);
  };

  const startCastingAnimation = () => {
    // 1. Hazırlık (Geriye Çekme)
    setRodRotation(-45);

    setTimeout(() => {
      // 2. Atış (Öne Savurma)
      setRodRotation(30);
      setShowHook(true);

      // 3. İğne Hareketi (Parabolik)
      // Basit CSS transition kullanmak yerine JS ile frame frame set etmek daha güvenli olabilir ama
      // burada CSS class manipülasyonu ile yapacağız.
      // Hook konumu CSS ile yönetilecek (translate).

      setTimeout(() => {
        // 4. Suya İniş ve Sıçrama
        setShowSplash(true);

        setTimeout(() => {
          // 5. Balık Yakalama
          pickRandomFish();
        }, 1000); // Sıçramadan 1sn sonra balık gelir
      }, 800); // İğnenin havada kalma süresi
    }, 500); // Geri çekme süresi
  };

  const pickRandomFish = () => {
    // Rastgele balık seç
    const fish = FISH_DB[Math.floor(Math.random() * FISH_DB.length)];
    setCurrentFish(fish);

    // Seçenekleri hazırla (Doğru cevap + 3 yanlış)
    const otherFishes = FISH_DB.filter((f) => f.id !== fish.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    const quizOptions = [...otherFishes, fish].sort(() => 0.5 - Math.random());

    setOptions(quizOptions);
    setGameState('quiz');
  };

  const handleAnswer = (option) => {
    if (selectedOption) return; // Zaten cevaplandıysa engelle

    setSelectedOption(option);
    const correct = option.id === currentFish.id;
    setIsCorrect(correct);

    if (correct) setScore((s) => s + 20); // Her soru 20 puan (toplam 100)

    setTimeout(() => {
      setGameState('feedback');
    }, 1000);
  };

  const nextRound = () => {
    if (round < TOTAL_ROUNDS) {
      setRound((r) => r + 1);
      prepareRound();
    } else {
      setGameState('end');
    }
  };

  // --- RENDER YARDIMCILARI ---

  const getMedal = () => {
    if (score === 100)
      return {
        type: 'gold',
        label: 'ALTIN MADALYA',
        text: 'Mükemmel bir balıkçısın!',
      };
    if (score >= 60)
      return {
        type: 'silver',
        label: 'GÜMÜŞ MADALYA',
        text: 'Gayet iyi iş çıkardın!',
      };
    if (score >= 20)
      return {
        type: 'bronze',
        label: 'BRONZ MADALYA',
        text: 'Biraz daha pratik yapmalısın.',
      };
    return {
      type: 'bronze',
      label: 'PASLI TENEKE',
      text: 'Sanırım balıklar bugün aç değil.',
    };
  };

  // --- EKRANLAR ---

  // 1. Başlangıç Ekranı
  if (gameState === 'start') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-sky-400 to-blue-900 text-white p-4">
        <h1 className="text-5xl font-bold mb-4 drop-shadow-md text-center">
          Rastgele Balıkçı 🎣
        </h1>
        <p className="text-xl mb-8 text-blue-100 text-center max-w-md">
          Denizlerimize açıl, tuttuğun balıkları tanı ve madalyaları topla!
        </p>
        <button
          onClick={startGame}
          className="px-8 py-4 bg-yellow-500 hover:bg-yellow-400 text-yellow-900 font-bold rounded-full text-xl shadow-lg transition transform hover:scale-105"
        >
          Oltayı At!
        </button>
      </div>
    );
  }

  // 2. Oyun/Animasyon Ekranı
  if (gameState === 'casting') {
    return (
      <div className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-sky-300 via-sky-500 to-blue-900">
        {/* Bulutlar */}
        <div className="absolute top-10 left-10 opacity-80 animate-pulse">
          ☁️
        </div>
        <div className="absolute top-20 right-20 opacity-60 animate-bounce">
          ☁️
        </div>

        {/* Skor Paneli */}
        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm p-3 rounded-lg text-white">
          <p className="font-bold">
            Tur: {round} / {TOTAL_ROUNDS}
          </p>
          <p>Puan: {score}</p>
        </div>

        {/* Aksiyon Butonu (Sadece animasyon başlamadıysa) */}
        {rodRotation === 0 && !showSplash && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
            <button
              onClick={startCastingAnimation}
              className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-full shadow-lg animate-bounce"
            >
              Salla!
            </button>
          </div>
        )}

        {/* Sahne */}
        <div className="absolute bottom-0 w-full h-1/3 bg-blue-800/50 backdrop-blur-sm z-10 overflow-hidden">
          {/* Su Dalgaları */}
          <div className="absolute bottom-0 w-[200%] h-full bg-blue-600/40 rounded-[50%] animate-[spin_10s_linear_infinite] -left-1/2 translate-y-1/2"></div>
          <div className="absolute bottom-0 w-[200%] h-full bg-blue-500/40 rounded-[45%] animate-[spin_15s_linear_infinite] -left-1/2 translate-y-1/2 delay-75"></div>
        </div>

        {/* Balıkçı ve Olta */}
        <div className="absolute bottom-16 left-10 z-20">
          <FishermanSVG rodRotation={rodRotation} />
        </div>

        {/* Uçan İğne ve Misina (Basit Simülasyon) */}
        {showHook && !showSplash && (
          <div
            className="absolute w-4 h-4 bg-gray-200 rounded-full z-10"
            style={{
              left: '180px', // Olta ucundan başla
              bottom: '200px',
              animation:
                'castCurve 0.8s forwards cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
          />
        )}

        {/* Su Sıçraması */}
        {showSplash && (
          <div className="absolute left-[60%] bottom-[30%] z-20">
            <span className="text-4xl animate-ping absolute">💦</span>
            <span className="text-6xl text-white/50 animate-pulse absolute -left-4 -top-4">
              ⚪
            </span>
          </div>
        )}

        <style>{`
          @keyframes castCurve {
            0% { transform: translate(0, 0); }
            50% { transform: translate(30vw, -150px); }
            100% { transform: translate(50vw, 200px); }
          }
        `}</style>
      </div>
    );
  }

  // 3. Soru Ekranı
  if (gameState === 'quiz') {
    return (
      <div className="min-h-screen bg-blue-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-lg w-full">
          <div className="bg-blue-600 p-4 text-white text-center font-bold text-xl">Bir Balık Yakaladın! Bu hangisi?</div>

          <div className="p-6">
            <div className="w-full h-64 bg-gray-200 mb-6 rounded-lg overflow-hidden shadow-inner relative group">
              {/* Resim Yeri - Local dosya sistemi */}
              <img
                src={`/fish/${currentFish.img}`}
                alt="Yakaladığın Balık"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    'https://via.placeholder.com/400x300?text=Balık+Resmi+Bulunamadı';
                }}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {options.map((opt, idx) => {
                let btnClass =
                  'p-4 text-lg font-semibold rounded-xl border-2 transition-all ';

                if (selectedOption) {
                  if (opt.id === currentFish.id) {
                    btnClass += 'bg-green-100 border-green-500 text-green-700'; // Doğruyu göster
                  } else if (
                    opt.id === selectedOption.id &&
                    opt.id !== currentFish.id
                  ) {
                    btnClass += 'bg-red-100 border-red-500 text-red-700'; // Yanlış seçimi göster
                  } else {
                    btnClass += 'bg-gray-50 border-gray-200 text-gray-400'; // Diğerleri
                  }
                } else {
                  btnClass +=
                    'bg-white border-blue-100 hover:border-blue-500 hover:bg-blue-50 text-gray-700';
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(opt)}
                    disabled={!!selectedOption}
                    className={btnClass}
                  >
                    {opt.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 4. Geri Bildirim Ekranı
  if (gameState === 'feedback') {
    return (
      <div className="min-h-screen bg-blue-900/90 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center animate-[fadeIn_0.5s_ease-out]">
          <div className="mb-6">
            {isCorrect ? (
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">✅</span>
              </div>
            ) : (
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">❌</span>
              </div>
            )}
            <h2
              className={`text-3xl font-bold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}
            >
              {isCorrect ? 'Doğru Bildin!' : 'Maalesef Yanlış.'}
            </h2>
            {!isCorrect && (
              <p className="text-gray-500 mt-2">
                Doğru cevap:{' '}
                <span className="font-bold">{currentFish.name}</span>
              </p>
            )}
          </div>

          <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 mb-6">
            <h3 className="font-bold text-blue-800 mb-1">Biliyor muydun?</h3>
            <p className="text-blue-900/80 italic">"{currentFish.fact}"</p>
          </div>

          <button
            onClick={nextRound}
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md transition transform active:scale-95"
          >
            {round < TOTAL_ROUNDS ? 'Devam Et →' : 'Sonuçları Gör'}
          </button>
        </div>
      </div>
    );
  }

  // 5. Oyun Sonu Ekranı
  if (gameState === 'end') {
    const medal = getMedal();

    return (
      <div className="min-h-screen bg-gradient-to-t from-blue-900 to-sky-700 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full text-center relative overflow-hidden">
          {/* Konfetiler (Basit CSS noktaları) */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500"></div>

          <div className="flex flex-col items-center">
            <MedalIcon type={medal.type} />
            <h2 className="text-3xl font-extrabold text-gray-800 mb-2">
              {medal.label}
            </h2>
            <p className="text-gray-500 mb-6">{medal.text}</p>

            <div className="flex items-center justify-center space-x-4 mb-8 w-full bg-gray-50 p-4 rounded-xl">
              <div className="text-center">
                <p className="text-sm text-gray-400 uppercase font-bold">
                  Puan
                </p>
                <p className="text-3xl font-black text-blue-600">{score}</p>
              </div>
              <div className="w-px h-10 bg-gray-300"></div>
              <div className="text-center">
                <p className="text-sm text-gray-400 uppercase font-bold">
                  Doğruluk
                </p>
                <p className="text-3xl font-black text-blue-600">
                  %{(score / (TOTAL_ROUNDS * 20)) * 100}
                </p>
              </div>
            </div>

            <button
              onClick={startGame}
              className="w-full py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl shadow-lg transition transform hover:-translate-y-1"
            >
              Tekrar Oyna 🔄
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}