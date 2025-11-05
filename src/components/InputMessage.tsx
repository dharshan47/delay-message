import { useState } from "react";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const InputMessage = () => {
  const [message, setMessage] = useState<string>("");
  const [delay, setDelay] = useState<number>(0);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [time, setTime] = useState<NodeJS.Timeout | null>(null);
  const [sendMessage, setSendMessage] = useState<string>("");
  
  const handleSend = () => {
    setIsSending(true);
    const timer = setTimeout(() => {
      setSendMessage(message);
      setMessage("");
      setDelay(0)
      setIsSending(false);
    }, delay * 1000);
    setTime(timer);
  };
  const handleCancel = () => {
    if (time) clearTimeout(time);
    setIsSending(false);
  };

  return (
    <div className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto border rounded-xl mt-20 p-6 shadow-xl space-y-4 bg-white dark:bg-white">
      <h2 className="text-2xl font-bold text-gray-900 text-center ">
        Delay Message
      </h2>
      <Textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter your message"
      />
      <Input
        type="number"
        value={delay}
        onChange={(e) => setDelay(Number(e.target.value))}
        disabled={isSending}
      />
      {!isSending ? (
        <Button className="w-full cursor-pointer" onClick={handleSend}>
          Send Message
        </Button>
      ) : (
        <Button
          variant="destructive"
          className="w-full cursor-pointer"
          onClick={handleCancel}
        >
          Cancel Sending
        </Button>
      )}
      {sendMessage && (
        <div className="bg-green-100 text-green-800 border rounded p-3">
          <p className="font-semibold">Message Sent:</p>
          <p>{sendMessage}</p>
        </div>
      )}
    </div>
  );
};

export default InputMessage;
