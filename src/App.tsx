import React, { useState, useEffect, useMemo } from "react";

// --- Types ---
interface GameQuestion {
  id: number;
  imageUrl: string;
  options: string[];
  correctAnswer: string;
}

interface ShuffledQuestion extends GameQuestion {
  shuffledOptions: string[];
}

// --- Game Data ---
// Points system - each question has different point values that total 50
const questionPoints: { [key: number]: number } = {
  1: 3,
  2: 3,
  3: 3,
  4: 3,
  5: 3,
  6: 3,
  7: 3,
  8: 3,
  9: 3,
  10: 3,
  11: 3,
  12: 3,
  13: 3,
  14: 3,
  15: 4,
  16: 4,
}; // Total: 42 + 8 = 50 points

// Name pool for the quiz options
const namePool = [
  "Md rifat",
  "Zoldy",
  "Spy4ok",
  "Lumin",
  "Hyper",
  "Lowchi",
  "Lukas",
  "Unicode",
  "Tanoy",
  "Shinori",
  "Localhost",
  "Joey",
  "Kokemono",
  "Sunex",
  "Sunflower",
  "Hodlking",
  "Oluseyix",
  "Icey",
  "Vicky",
  "Peter",
  "Zktug",
  "Seyisol",
  "Valen",
  "Na2me",
  "Kuznets",
  "L1ndle",
  "Kwesi",
  "Wtf4uk",
  "Blink",
  "Keyvank",
  "Momo",
  "Yuu yu",
  "Cryptolab",
  "LjngLjng",
  "Ira",
  "Tuong",
  "Twinkle",
  "Ponta",
  "Islandgreedster",
  "Chaz",
];

// Function to get random options including the correct answer
const getRandomOptions = (
  correctAnswer: string,
  count: number = 4
): string[] => {
  const options = new Set([correctAnswer]);
  const availableNames = namePool.filter((name) => name !== correctAnswer);

  while (options.size < count && availableNames.length > 0) {
    const randomIndex = Math.floor(Math.random() * availableNames.length);
    options.add(availableNames[randomIndex]);
    availableNames.splice(randomIndex, 1);
  }

  return Array.from(options);
};

// Using placeholder images. Replace with your own image URLs.
const gameQuestions: GameQuestion[] = [
  {
    id: 1,
    imageUrl:
      "https://cdn.discordapp.com/attachments/1437398875416821793/1438462932437700758/-mtxu60.jpg?ex=6918f2c0&is=6917a140&hm=85cdb61b548552369462e78ef081e1d0a949ef0118dd4eaf4c610aaaf8969613&",
    options: getRandomOptions("Twinkle"),
    correctAnswer: "Twinkle",
  },
  {
    id: 2,
    imageUrl:
      "https://cdn.discordapp.com/attachments/1437398875416821793/1438462492694151228/20251113_142629.jpg?ex=6918f257&is=6917a0d7&hm=c74a2a9b0f0c669aa54c33ed672a3ec973845e00b83423bcf67f79969690ad9e&",
    options: getRandomOptions("Oluseyix"), // Update this with the correct answer
    correctAnswer: "Oluseyix", // Update this with the correct answer
  },
  {
    id: 3,
    imageUrl:
      "https://cdn.discordapp.com/attachments/1437398875416821793/1438462493646258297/20251113_142526.jpg?ex=6918f257&is=6917a0d7&hm=b0ca97a174201e7bd81eb3d73534167da8eebe477f4e8a4d944021fffc7014c7&", // Replace with actual image
    options: getRandomOptions("Peter"), // Update this with the correct answer
    correctAnswer: "Peter", // Update this with the correct answer
  },
  {
    id: 4,
    imageUrl:
      "https://cdn.discordapp.com/attachments/1437398875416821793/1438462493298135171/20251113_142551.jpg?ex=6918f257&is=6917a0d7&hm=8866884b2fb27924217b41ef0b53c427ad4f4b09df4e731f8fcaa5929d556a95&", // Replace with actual image
    options: getRandomOptions("Vicky"), // Update this with the correct answer
    correctAnswer: "Vicky", // Update this with the correct answer
  },
  {
    id: 5,
    imageUrl:
      "https://cdn.discordapp.com/attachments/1437398875416821793/1438462514382901318/20251113_141602.jpg?ex=6918f25c&is=6917a0dc&hm=6558d4d4cf6d4490a158340bd635f628675e59b44d8705434c69fd62176bd04d&", // Replace with actual image
    options: getRandomOptions("Cryptolab"), // Update this with the correct answer
    correctAnswer: "Cryptolab", // Update this with the correct answer
  },
  {
    id: 6,
    imageUrl:
      "https://cdn.discordapp.com/attachments/1437398875416821793/1438462514697605175/20251113_141553.jpg?ex=6918f25c&is=6917a0dc&hm=d434550ae68178a96dd0f5d3e11b9881e3526b47591a747ad156bf4880329300&", // Replace with actual image
    options: getRandomOptions("LjngLjng"), // Update this with the correct answer
    correctAnswer: "LjngLjng", // Update this with the correct answer
  },
  {
    id: 7,
    imageUrl:
      "https://media.discordapp.net/attachments/1437398875416821793/1438462512080224266/20251113_141644.jpg?ex=6918f25c&is=6917a0dc&hm=368ba846ad704a7282c1e56f8765193f103b48f4512a55171c38b9d968e3966b&=&format=webp&width=500&height=500", // Replace with actual image
    options: getRandomOptions("Keyvank"), // Update this with the correct answer
    correctAnswer: "Keyvank", // Update this with the correct answer
  },
  {
    id: 8,
    imageUrl:
      "https://cdn.discordapp.com/attachments/1437398875416821793/1439179936819576954/20251113_142917.jpg?ex=69199443&is=691842c3&hm=94aa757e65e9595d64f45375315dcdf035e376cc336fe39f02bda454fdf7473e&", // Replace with actual image
    options: getRandomOptions("Ponta"), // Update this with the correct answer
    correctAnswer: "Ponta", // Update this with the correct answer
  },
  {
    id: 9,
    imageUrl:
      "https://cdn.discordapp.com/attachments/1437398875416821793/1439180175085535354/20251115_132643.jpg?ex=6919947c&is=691842fc&hm=651329b0af2557927c57cb570ed46aff297cdab88a84db89cefa48d5ebfba8d5&", // Replace with actual image
    options: getRandomOptions("Islandgreedster"), // Update this with the correct answer
    correctAnswer: "Islandgreedster", // Update this with the correct answer
  },
  {
    id: 10,
    imageUrl:
      "https://cdn.discordapp.com/attachments/1437398875416821793/1439180401674289332/20251113_145029.jpg?ex=691994b2&is=69184332&hm=a10e3ca647d2900cde04d3486a918a9524848fafa66d21efbad304ffbe568f6e&", // Replace with actual image
    options: getRandomOptions("Lumin"), // Update this with the correct answer
    correctAnswer: "Lumin", // Update this with the correct answer
  },
  {
    id: 11,
    imageUrl:
      "https://cdn.discordapp.com/attachments/1437398875416821793/1438462495000891443/20251113_142308.jpg?ex=6918f258&is=6917a0d8&hm=4e5788f492a41982aa40e610d531bd330eac2a5677834afe4ec022204f4b110c&", // Replace with actual image
    options: getRandomOptions("Na2me"), // Update this with the correct answer
    correctAnswer: "Na2me", // Update this with the correct answer
  },
  {
    id: 12,
    imageUrl:
      "https://cdn.discordapp.com/attachments/1437398875416821793/1439181137321656462/20251113_145006.jpg?ex=69199561&is=691843e1&hm=d073b7866c4d85367130a803616d91e8c29bd616b99186b8fcbdeebe6305c7e1&", // Replace with actual image
    options: getRandomOptions("Zoldy"), // Update this with the correct answer
    correctAnswer: "Zoldy", // Update this with the correct answer
  },
  {
    id: 13,
    imageUrl:
      "https://cdn.discordapp.com/attachments/1437398875416821793/1439181639900070002/20251113_143002.jpg?ex=691995d9&is=69184459&hm=999c31850344a97b8427d754cbc79686c2ea44d3a22fe345041d494fda99075f&", // Replace with actual image
    options: getRandomOptions("Localhost"), // Update this with the correct answer
    correctAnswer: "Localhost", // Update this with the correct answer
  },
  {
    id: 14,
    imageUrl:
      "https://cdn.discordapp.com/attachments/1437398875416821793/1439181913838583928/20251113_142839.jpg?ex=6919961a&is=6918449a&hm=0701faba72c942e6c57172a58e86a96bd728b3f0cefa034df87ee24ae7347c01&", // Replace with actual image
    options: getRandomOptions("Sunflower"), // Update this with the correct answer
    correctAnswer: "Sunflower", // Update this with the correct answer
  },
  {
    id: 15,
    imageUrl:
      "https://cdn.discordapp.com/attachments/1437398875416821793/1439182766125088838/20251027_114209.jpg?ex=691996e6&is=69184566&hm=2f83af28a2ed6467da15c4f978987f8ad2f6be72a08f37e2d6eca5a0f4d58807&", // Replace with actual image
    options: getRandomOptions("Chaz"), // Update this with the correct answer
    correctAnswer: "Chaz", // Update this with the correct answer
  },
  {
    id: 16,
    imageUrl:
      "https://cdn.discordapp.com/attachments/1437398875416821793/1439184138325327882/20251113_143021.jpg?ex=6919982d&is=691846ad&hm=4ac79061d8e91e005777721968b394869b21b40e07529b752f6a9466dbffd497&", // Replace with actual image
    options: getRandomOptions("Shinori"), // Update this with the correct answer
    correctAnswer: "Shinori", // Update this with the correct answer
  },
];

/**
 * Utility function to shuffle an array (Fisher-Yates shuffle)
 * @param {Array<T>} array - The array to shuffle.
 * @returns {Array<T>} A new, shuffled array.
 */
const shuffleArray = <T,>(array: T[]): T[] => {
  let newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

/**
 * Main application component.
 */
export default function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false); // For entry animation

  // Shuffle questions once at the start and memoize
  const shuffledQuestions = useMemo<ShuffledQuestion[]>(() => {
    // First shuffle the order of questions, then shuffle options for each question
    const shuffledGameQuestions = shuffleArray(gameQuestions);
    return shuffledGameQuestions.map((q) => ({
      ...q,
      // Shuffle options for each question
      shuffledOptions: shuffleArray(q.options),
    }));
  }, []);

  const totalQuestions = shuffledQuestions.length;
  const currentQuestion = shuffledQuestions[currentQuestionIndex];

  // Effect for entry animation
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Auto-advance to next question after a delay
  useEffect(() => {
    let autoAdvanceTimeout: NodeJS.Timeout | undefined;
    if (selectedAnswer !== null) {
      // Set a timeout to move to the next question or end game
      autoAdvanceTimeout = setTimeout(() => {
        const nextQuestionIndex = currentQuestionIndex + 1;
        if (nextQuestionIndex < totalQuestions) {
          setCurrentQuestionIndex(nextQuestionIndex);
          setSelectedAnswer(null); // Reset for the next question
        } else {
          setGameOver(true); // End the game
        }
      }, 2000); // 2-second delay
    }
    // Cleanup timeout on component unmount or if dependencies change
    return () => {
      if (autoAdvanceTimeout) {
        clearTimeout(autoAdvanceTimeout);
      }
    };
  }, [selectedAnswer, currentQuestionIndex, totalQuestions]);

  /**
   * Handles the user clicking an answer option.
   * @param {string} option - The answer option the user selected.
   */
  const handleAnswerClick = (option: string): void => {
    if (selectedAnswer !== null) return; // Prevent multiple clicks

    setSelectedAnswer(option);
    const correct = option === currentQuestion.correctAnswer;
    if (correct) {
      const pointsForThisQuestion = questionPoints[currentQuestion.id] || 3;
      setScore((prevScore) => prevScore + pointsForThisQuestion);
    }
  };

  /**
   * Resets the game to the starting state.
   */
  const handlePlayAgain = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setGameOver(false);
    // Note: shuffledQuestions remain the same, which is fine for a restart.
  };

  /**
   * Determines the CSS classes for an answer button based on its state.
   * @param {string} option - The answer option for the button.
   * @returns {string} The Tailwind CSS classes for the button.
   */
  const getButtonClass = (option: string): string => {
    // Base class for buttons, new "glass" aesthetic
    const baseClass =
      "w-full font-bold py-3 px-4 rounded-lg shadow-md transition-all duration-300 ease-in-out transform scale-100 hover:scale-105 backdrop-blur-sm";

    // Default glass state - translucent dark purple with white text
    const defaultState = `${baseClass} bg-[#9400D3]/30 text-white border border-white/50 hover:bg-[#9400D3]/50`;

    if (selectedAnswer !== null) {
      // An answer has been selected
      if (option === currentQuestion.correctAnswer) {
        // This is the correct answer: solid green
        return `${baseClass} bg-green-500 border border-green-500 text-white ring-4 ring-green-300 scale-105`;
      }
      if (option === selectedAnswer) {
        // This is the incorrect answer that was selected: solid red
        return `${baseClass} bg-red-500 border border-red-500 text-white ring-4 ring-red-300`;
      }
      // This is an unselected, incorrect option: glass but opaque
      return `${defaultState} opacity-50`;
    }

    // Default state (no answer selected)
    return defaultState;
  };

  /**
   * Renders the final game-over screen.
   */
  const renderGameOver = () => (
    // Card styling
    <div
      className={`
        w-full max-w-2xl p-6 sm:p-8 rounded-2xl shadow-xl 
        bg-[#D3D3FF]/70 backdrop-blur-lg border border-white/30
        transition-all duration-500 ease-in-out
        ${isMounted ? "opacity-100 scale-100" : "opacity-0 scale-95"}
        text-center flex flex-col justify-center
      `}
      style={{ minHeight: "500px" }}
    >
      <h2 className="text-4xl font-bold mb-4 text-[#9400D3]">Game Over!</h2>
      <p className="text-2xl text-[#9400D3] mb-8">
        You scored {score} out of 50 points!
      </p>
      <button
        onClick={handlePlayAgain}
        className="px-8 py-3 bg-[#9400D3]/30 text-white border border-white/50 hover:bg-[#9400D3]/50 font-bold text-lg rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
      >
        Play Again
      </button>

      {/* Credits section for Game Over screen */}
      <div className="text-center text-white/80 text-xs mt-6">
        <p>
          Designed by{" "}
          <a
            href="https://x.com/twinkle2089"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold hover:text-white"
            style={{ color: "#E6E6FA" }}
          >
            @Twinkle
          </a>
        </p>
        <p>
          Crafted by{" "}
          <a
            href="https://x.com/Skyairei"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold hover:text-white"
            style={{ color: "#E6E6FA" }}
          >
            @Light
          </a>
        </p>
      </div>
    </div>
  );

  /**
   * Renders the active game screen (question, image, options).
   */
  const renderGame = () => {
    if (!currentQuestion) return null; // Handle loading state briefly
    return (
      // Made card translucent with backdrop blur and entry animation
      <div
        className={`
          w-full max-w-2xl p-6 sm:p-8 rounded-2xl shadow-xl 
          bg-[#D3D3FF]/70 backdrop-blur-lg border border-white/30
          transition-all duration-500 ease-in-out
          ${isMounted ? "opacity-100 scale-100" : "opacity-0 scale-95"}
          flex flex-col justify-between
        `}
        style={{ minHeight: "500px" }}
      >
        <div>
          {" "}
          {/* This div wraps content above credits */}
          {/* Animated Title - made semibold for clarity */}
          <h1
            className="text-4xl sm:text-5xl font-semibold text-center mb-2"
            style={{
              textShadow:
                "0 0 5px #00c6ff, 0 0 10px #00c6ff, 0 0 20px #00c6ff, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
            }}
          >
            {"Guess who? xD".split("").map((char, index) => (
              <span
                key={index}
                className="jumpy-char inline-block"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  color: "#00c6ff",
                }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h1>
          {/* --- Score & Question Count --- */}
          <div className="flex justify-between text-lg font-semibold text-[#9400D3] mb-4">
            <span>Score: {score}/50</span>
            <span>
              Question: {currentQuestionIndex + 1} / {totalQuestions}
            </span>
          </div>
          {/* --- Image --- */}
          <div className="mb-6 flex justify-center">
            <img
              src={currentQuestion.imageUrl}
              alt="Guessing game visual"
              className="w-80 h-80 object-contain rounded-lg shadow-lg border border-white/20"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src =
                  "https://placehold.co/600x400/cccccc/ffffff?text=Image+Error";
              }}
            />
          </div>
          {/* --- Options --- */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {currentQuestion.shuffledOptions.map((option) => (
              <button
                key={option}
                onClick={() => handleAnswerClick(option)}
                disabled={selectedAnswer !== null}
                className={getButtonClass(option)}
              >
                {option}
              </button>
            ))}
          </div>
          {/* --- Feedback text & auto-advance placeholder --- */}
          <div className="text-center h-10"></div>
        </div>{" "}
        {/* End of content above credits */}
        {/* Credits section - moved to be at the very bottom and centered */}
        <div className="text-center text-white/80 text-xs mt-4">
          <p>
            Designed by{" "}
            <a
              href="https://x.com/twinkle2089"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:text-white"
              style={{ color: "#6f5193" }}
            >
              @Twinkle
            </a>
          </p>
          <p>
            Crafted by{" "}
            <a
              href="https://x.com/Skyairei"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:text-white"
              style={{ color: "#6f5193" }}
            >
              @Light
            </a>
          </p>
        </div>
      </div>
    );
  };

  return (
    // Changed main background back to the image
    <div
      className="min-h-screen w-full flex items-center justify-center p-4 font-inter"
      style={{
        backgroundImage: `url('https://cdn.discordapp.com/attachments/1437398875416821793/1438450648353083492/rH7QD4L.png?ex=6918e74f&is=691795cf&hm=57f95bc06baf7ea81f8aa29d81c2ce16c8e48fdca2af6a00a86dc92477de7fe6&')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed", // Keeps background stationary on scroll
      }}
    >
      {/* We add the keyframes for the jumping animation here.
          Tailwind doesn't support custom keyframes inline,
          so a <style> tag is the cleanest way in a single file.
          We also add a custom text-shadow for the neon glow
          and the .jumpy-char class used in the title.
      */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
          body {
            font-family: 'Inter', sans-serif;
          }
          @keyframes jump {
            0%, 50%, 100% {
              transform: translateY(0);
            }
            25% {
              transform: translateY(-10px);
            }
          }
          .jumpy-char {
            animation: jump 0.5s ease-in-out;
          }
        `}
      </style>

      {gameOver ? renderGameOver() : renderGame()}
    </div>
  );
}
