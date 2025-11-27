import { Chat } from './chat';

export default function MedBotPage() {
  return (
    <div className="h-full flex flex-col">
       <div className="flex-1 max-h-full">
         <Chat />
       </div>
    </div>
  );
}
