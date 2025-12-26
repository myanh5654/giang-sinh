import React, { useState, useEffect, useRef } from 'react';

const ChristmasMystery = () => {
  const [step, setStep] = useState(0); // 0: Warning, 1: Logs, 2: Message, 3: GiftBox
  const [logs, setLogs] = useState([]);
  const [isGiftOpened, setIsGiftOpened] = useState(false);
  const [isLogDone, setIsLogDone] = useState(false); // Biến kiểm tra xem log đã chạy xong chưa

  // --- THÊM MỚI: Tạo một cái mỏ neo để kéo màn hình xuống ---
  const logEndRef = useRef(null);

  // Kịch bản Log điều tra (Đã chỉnh delay chậm hơn)
  const logData = [
    { text: "> Đang truy xuất camera ký ức...", delay: 500 },
    { text: "> [20:00] Nhận được túi quà từ shipper.", delay: 1500 },
    { text: "> [20:05] Mở túi. Phân tích thị giác: Biutifun.", delay: 2500 },
    { text: "> [20:06] Phân tích khứu giác: thơm mùi sicula.", delay: 3000 },
    { text: "> [20:07] CẢNH BÁO: Tường lửa 'Lý trí' đang bị tấn công!", delay: 4500 },
    { text: "> [20:08] Hệ thống phòng thủ thất bại. Bắt đầu nếm thử...", delay: 5500 },
    { text: "> [20:15] Ngon không cưỡng được. Tốc độ ăn tăng 200%.", delay: 6500 },
    { text: "> [20:30] CRITICAL ERROR (404): Cake Not Found", delay: 8000 },
    { text: "> ĐIỀU TRA HOÀN TẤT. [ BẤM VÀO ĐÂY ĐỂ XEM KẾT LUẬN ]", delay: 9000 }, // Dòng cuối cùng
  ];

  // Xử lý chạy chữ dòng lệnh
  useEffect(() => {
    if (step === 1) {
      let timeouts = [];
      logData.forEach((item, index) => {
        const timeout = setTimeout(() => {
          setLogs((prev) => [...prev, item.text]);
          // Nếu là dòng cuối cùng thì bật trạng thái cho phép bấm
          if (index === logData.length - 1) {
            setIsLogDone(true);
          }
        }, item.delay);
        timeouts.push(timeout);
      });
      return () => timeouts.forEach(clearTimeout);
    }
  }, [step]);

  // --- THÊM MỚI: Tự động cuộn xuống mỗi khi có dòng log mới ---
  useEffect(() => {
    // Mỗi khi danh sách logs thay đổi, cuộn xuống cái mỏ neo (logEndRef)
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  // Hàm xử lý khi bấm vào màn hình Terminal
  const handleTerminalClick = () => {
    if (isLogDone) {
      setStep(2); // Chỉ chuyển trang khi chữ đã chạy xong
    }
  };

  return (
    <div className={`min-h-screen font-mono flex flex-col items-center justify-center p-4 transition-colors duration-1000 ${step >= 2 ? 'bg-red-900' : 'bg-black'}`}>

      {/* --- MÀN HÌNH 1: CẢNH BÁO --- */}
      {step === 0 && (
        <div className="text-center cursor-pointer animate-pulse" onClick={() => setStep(1)}>
          <div className="text-7xl mb-6">⚠️</div>
          <h1 className="text-3xl md:text-4xl font-bold text-red-500 mb-4 tracking-widest glich-effect">
            SYSTEM ALERT!
          </h1>
          <p className="text-green-400 text-lg md:text-xl border border-green-500 p-4 rounded bg-gray-900 bg-opacity-50">
            Phát hiện sự biến mất bất thường của vật thể:<br/>
            <span className="font-bold text-yellow-400">"BÁNH NOEL CỦA TRẦN MAI TRANG"</span>
          </p>
          <p className="mt-8 text-xs text-gray-500">[ Chạm vào màn hình để điều tra ]</p>
        </div>
      )}

      {/* --- MÀN HÌNH 2: TERMINAL LOGS (Đã sửa click + auto scroll) --- */}
      {step === 1 && (
        <div 
          className="w-full max-w-lg bg-gray-900 p-6 rounded-lg shadow-2xl border border-green-800 h-[60vh] overflow-y-auto font-mono text-sm md:text-base cursor-pointer"
          onClick={handleTerminalClick}
        >
          <div className="border-b border-green-800 pb-2 mb-4 text-xs text-green-600 flex justify-between">
            <span>TERMINAL - ROOT ACCESS</span>
            <span>{isLogDone ? "Paused" : "running..."}</span>
          </div>
          <div className="space-y-3 text-green-400">
            {logs.map((log, index) => (
              <p 
                key={index} 
                className={`break-words border-l-2 border-transparent pl-2 transition-all ${index === logs.length - 1 && isLogDone ? 'text-yellow-300 font-bold animate-pulse' : 'hover:border-green-500'}`}
              >
                {log}
              </p>
            ))}
            {!isLogDone && <span className="animate-pulse inline-block w-2 h-4 bg-green-500 ml-1"></span>}
            
            {/* --- THÊM MỚI: Đây là cái mỏ neo vô hình nằm dưới cùng --- */}
            <div ref={logEndRef} />
          </div>
        </div>
      )}

      {/* --- MÀN HÌNH 3: LỜI THÚ TỘI --- */}
      {step === 2 && (
        <div className="bg-white text-gray-800 p-8 rounded-xl shadow-2xl max-w-md text-center animate-fade-in-down relative overflow-hidden">
          {/* Background tuyết rơi giả */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 via-red-500 to-green-400"></div>

          <div className="text-5xl mb-4">🕵️‍♂️ 🍰</div>
          <h2 className="text-2xl font-bold mb-4 text-red-600 uppercase tracking-wide">Kết luận điều tra</h2>

          <div className="bg-red-50 p-4 rounded-lg text-left text-gray-700 mb-6 shadow-inner">
            <p className="mb-2 font-bold text-lg text-red-500">"Thủ phạm" là tớ! 🥺🥺🥺</p>
            <p className="mb-2 leading-relaxed">
              Tớ tính chụp ảnh feedback mà bánh ngon quá, ăn cái hết luôn, chẳng còn gì để check-in 😭🙉
            </p>
            <p className="font-semibold text-green-700 mt-4 border-t border-red-100 pt-3">
              Cảm ơn cậu vì món quà siu ngon, rấc tuỵt vời 💯🤤 !!!<br/>
              Giáng sinh vui vẻ! 🎄❤️
            </p>
          </div>

          <button 
            onClick={() => setStep(3)}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition transform hover:scale-105 animate-bounce"
          >
            🎁 Nhấn vào để nhận quà
          </button>
        </div>
      )}

      {/* --- MÀN HÌNH 4: HỘP QUÀ BÍ ẨN (COMING SOON) --- */}
      {step === 3 && (
        <div className="text-center w-full max-w-md px-4">
          <h1 className="text-4xl md:text-6xl font-serif text-white mb-8 drop-shadow-lg text-shadow-glow">
            Merry Christmas
          </h1>

          {!isGiftOpened ? (
            <div 
              onClick={() => setIsGiftOpened(true)}
              className="cursor-pointer transition transform hover:scale-110 duration-300"
            >
              {/* Hộp quà rung rung */}
              <div className="text-[150px] animate-[wiggle_1s_ease-in-out_infinite]">
                🎁
              </div>
              <p className="text-white mt-4 animate-pulse text-xl">Nhấn để mở quà</p>
            </div>
          ) : (
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl text-white animate-zoom-in">
              <div className="text-6xl mb-4">✨❓✨</div>
              <h2 className="text-2xl font-bold text-yellow-300 mb-2">MYSTERY GIFT</h2>
              <div className="h-1 w-20 bg-white mx-auto mb-6 opacity-50"></div>

              <p className="text-lg mb-4 font-light">
                Yên tâm, tớ ko để cậu thiệt đâu 😏❤️🎁
              </p>

              <div className="bg-black/30 p-4 rounded-lg inline-block w-full">
                <div className="flex justify-between text-sm text-gray-300 mb-2 border-b border-gray-600 pb-1">
                  <span>Trạng thái:</span>
                  <span className="text-yellow-400 font-mono">Loading...</span>
                </div>
                <div className="flex justify-between text-sm text-gray-300">
                  <span>Thời gian ra mắt:</span>
                  <span className="text-red-400 font-mono font-bold">COMING SOON</span>
                </div>
              </div>

              <p className="mt-6 text-sm italic opacity-75">
                (Spoil là không vui đâu, đợi nha 😏)
              </p>
            </div>
          )}
        </div>
      )}

      {/* CSS Animation Styles */}
      <style>{`
        @keyframes wiggle {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
        .glich-effect {
          text-shadow: 2px 0 #00ffea, -2px 0 #ff004c;
        }
        .animate-zoom-in {
          animation: zoomIn 0.5s ease-out forwards;
        }
        @keyframes zoomIn {
          from { transform: scale(0.5); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default ChristmasMystery;