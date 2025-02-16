import { Mic, Sparkles } from "lucide-react";
import { useCallback } from "react";
import { useDaily } from "@daily-co/daily-react";
import {
  DailyVideo,
  useMeetingState,
  DailyAudio,
  useParticipantIds,
} from "@daily-co/daily-react";
import axios from "axios";

function Video() {
//   const [isMicOn, setIsMicOn] = useState(true);
//   const [isCameraOn, setIsCameraOn] = useState(true);
  const meetingState = useMeetingState();
  console.log(meetingState);
  const remoteParticipantIds = useParticipantIds({ filter: "remote" });
  const daily = useDaily();
  const handleClick = async () => {
    try {
      const createConversation = await axios.post(
        "https://tavusapi.com/v2/conversations",
        {
          // replica_id: "r3fbe3834a3e",
          persona_id: "p2fbd605",
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "eecb0510afb8499085a9b220dc1a28d0",
          },
        }
      );
      const url = createConversation.data.conversation_url;
      console.log(createConversation.data.conversation_url);
      await daily
        ?.join({
          url: url,
          startVideoOff: false,
          startAudioOff: true,
        })
        .then(() => {
          daily?.setLocalAudio(true);
        });
    } catch (error) {}
  };

  const handleEnd = async () => {
    await daily?.leave();
  };

  const handleResize = useCallback(
    (dimensions: { width: 1280; height: 720; aspectRatio: 1.777 }) => {
      console.log("Video resized:", dimensions);
    },
    []
  );

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6 flex items-center justify-center">
        <div className="w-full max-w-4xl aspect-video bg-white rounded-3xl shadow-xl relative overflow-hidden backdrop-blur-sm bg-opacity-80">
          {/* Status Badge */}
          {/* <div className="absolute top-6 left-6 z-10">
            <div className="flex items-center gap-2 bg-white/90 px-4 py-2 rounded-full shadow-sm">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-green-600">
                Live & Ready
              </span>
            </div>
          </div> */}

          {/* Center Icon */}
          <div className=" h-full w-full flex justify-center items-center">
            {meetingState === "joined-meeting" ? (
              <DailyVideo
                className="size-full"
                fit="contain"
                type="video"
                sessionId={remoteParticipantIds[0]}
                onResize={handleResize}
              />
            ) : (
              <div className="w-24 h-24 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                <Sparkles className="w-12 h-12 text-white" />
              </div>
            )}
          </div>

          {/* Bottom Controls */}
          <div className="absolute bottom-0 left-0 right-0 p-6 flex items-center justify-between bg-gradient-to-t from-black/10 to-transparent">
            <div className="flex gap-4">
              <button className="p-4 bg-white/90 rounded-full hover:bg-white transition-colors">
                <Mic className="w-6 h-6 text-gray-700" />
              </button>
              {/* <button className="p-4 bg-white/90 rounded-full hover:bg-white transition-colors">
                <Video className="w-6 h-6 text-gray-700" />
              </button> */}
            </div>

            {meetingState === "joined-meeting" ? (
              <button
                onClick={handleEnd}
                className="px-6 py-3 bg-gradient-to-r from-violet-600 to-blue-600 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-shadow flex items-center gap-2"
              >
                <span>End talk</span>
                <Sparkles className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleClick}
                className="px-6 py-3 bg-gradient-to-r from-violet-600 to-blue-600 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-shadow flex items-center gap-2"
              >
                <span>Talk to Kartik Aaryan</span>
                <Sparkles className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
      <div>
        {/* <button onClick={handleClick}>Start </button>
        <button onClick={handleEnd}>end </button> */}
        <DailyAudio />
      </div>
    </>
  );
}

export default Video;
