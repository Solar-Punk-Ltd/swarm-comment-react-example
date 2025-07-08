import { PrivateKey } from "@ethersphere/bee-js";
import { useState } from "react";

import { Button } from "@/components/Button/Button";
import { CommentMessage } from "@/components/Comment/CommentMessage/CommentMessage";
import { MessageSender } from "@/components/Comment/MessageSender/MessageSender";
import { ScrollableMessageList } from "@/components/Comment/ScrollableMessageList/ScrollableMessageList";
import { ThreadView } from "@/components/Comment/ThreadView/ThreadView";
import { useSwarmComment, VisibleMessage } from "@/hooks/useSwarmComment";
import { config } from "@/utils/config";

import "./Comment.scss";

interface CommentProps {
  topic: string;
  nickname: string;
  signer: PrivateKey;
}

const profileColors = [
  "#FF6B6B", // Coral Red
  "#FFD93D", // Golden Yellow
  "#6BCB77", // Soft Green
  "#4D96FF", // Bright Blue
  "#FFAD69", // Soft Orange
  "#C084FC", // Pastel Purple
  "#F87171", // Warm Salmon
  "#34D399", // Emerald
  "#FBBF24", // Amber
  "#60A5FA", // Sky Blue
];

function getColorForName(name: string): string {
  const hash = [...name].reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return profileColors[hash % profileColors.length];
}

const privKeyPlaceholder =
  "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef";

export const Comment: React.FC<CommentProps> = ({ topic, signer, nickname }) => {
  const [selectedMessage, setSelectedMessage] = useState<VisibleMessage | null>(
    null
  );
  const [isThreadView, setIsThreadView] = useState(false);

  const {
    commentLoading,
    messagesLoading,
    groupedReactions,
    simpleMessages,
    getThreadMessages,
    sendMessage,
    sendReaction,
    sendReply,
    fetchPreviousMessages,
    hasPreviousMessages,
    retrySendMessage,
    error,
  } = useSwarmComment({
    user: {
      nickname: nickname || "",
      privateKey: signer.toHex() || privKeyPlaceholder,
    },
    infra: {
      beeUrl: config.beeUrl,
      stamp: config.commentStamp,
      topic,
    },
  });

  const handleMessageSending = async (text: string) => sendMessage(text);

  const handleEmojiReaction = (messageId: string, emoji: string) => {
    sendReaction(messageId, emoji);
  };

  const handleThreadReply = (message: VisibleMessage) => {
    setSelectedMessage(message);
    setIsThreadView(true);
  };

  const handleBackToMain = () => {
    setIsThreadView(false);
    setSelectedMessage(null);
  };

  const handleThreadMessageSending = async (text: string) => {
    if (selectedMessage) {
      await sendReply(selectedMessage.id, text);
    }
  };

  if (error) {
    return (
      <div className="comment-container">
        <div className="comment-error">
          Critical error: {error.message}. Please check node availability
          status.
        </div>
      </div>
    );
  }

  return (
    <div className="comment-container">
      {isThreadView && selectedMessage ? (
        <ThreadView
          originalMessage={selectedMessage}
          originalMessageReactions={groupedReactions[selectedMessage.id] || []}
          threadMessages={getThreadMessages(selectedMessage.id).messages}
          groupedReactions={groupedReactions}
          onBack={handleBackToMain}
          onSendMessage={handleThreadMessageSending}
          onEmojiReaction={handleEmojiReaction}
          getColorForName={getColorForName}
          currentUserAddress={signer.publicKey().address().toString()}
        />
      ) : (
        <>
          {commentLoading && (
            <div className="comment-loading-overlay">
              <div className="comment-loading">Loading comment...</div>
            </div>
          )}
          {!commentLoading && hasPreviousMessages() && (
            <Button onClick={fetchPreviousMessages} className="comment-load-more">
              Load more messages
            </Button>
          )}

          {messagesLoading && (
            <div className="comment-loading">Loading messages...</div>
          )}
          {!messagesLoading && simpleMessages.length > 0 && (
            <ScrollableMessageList
              items={simpleMessages}
              renderItem={(item) => (
                <CommentMessage
                  key={item.id}
                  message={item.message}
                  received={Boolean(item.received)}
                  error={Boolean(item.error)}
                  name={item.username}
                  profileColor={getColorForName(item.username)}
                  ownMessage={
                    item.address === signer.publicKey().address().toString()
                  }
                  reactions={groupedReactions[item.id] || []}
                  threadCount={getThreadMessages(item.id).count}
                  onRetry={() => retrySendMessage(item)}
                  onEmojiReaction={(emoji) =>
                    handleEmojiReaction(item.id, emoji)
                  }
                  onThreadReply={() => handleThreadReply(item)}
                />
              )}
            />
          )}

          {!commentLoading && <MessageSender onSend={handleMessageSending} />}
        </>
      )}
    </div>
  );
};
