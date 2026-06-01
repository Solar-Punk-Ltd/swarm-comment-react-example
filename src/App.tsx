import { useState } from 'react';
import { PrivateKey } from '@ethersphere/bee-js';

import { getSigner } from '@/utils/wallet';

import { Comment } from '@/components/Comment/Comment';

import './App.scss';

interface CommentData {
  topic: string;
  nickname: string;
  signer: PrivateKey;
}

function App() {
  const [showUserModal, setShowUserModal] = useState<boolean>(true);
  const [commentData, setCommentData] = useState<CommentData>();

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const topic = formData.get('topic') as string;
    const nickname = formData.get('name') as string;
    const signer = getSigner(nickname);

    setCommentData({ topic, nickname, signer });
    setShowUserModal(false);
  };

  const isSubmitDisabled = !commentData?.topic || !commentData?.signer || !commentData?.nickname;

  return (
    <>
      {showUserModal || isSubmitDisabled ? (
        <form onSubmit={handleFormSubmit}>
          <div>
            <label>
              Topic:
              <input name="topic" type="text" required defaultValue="DOOMSDAYTOPIC3" />
            </label>
          </div>
          <div>
            <label>
              Name:
              <input name="name" type="text" required />
            </label>
          </div>
          <button type="submit">Submit</button>
        </form>
      ) : (
        <Comment topic={commentData.topic} signer={commentData.signer} nickname={commentData.nickname} />
      )}
    </>
  );
}

export default App;
