import React from 'react';
import { Button } from 'react-native';

interface JoinButtonProps {
  joined: boolean;
  onJoin: () => void;
}

const JoinButton: React.FC<JoinButtonProps> = ({ joined, onJoin }) => (
  <Button
    title={joined ? 'Joined' : 'Join Event'}
    onPress={onJoin}
    color={joined ? '#aaa' : '#14b8a6'}
    disabled={joined}
  />
);

export default JoinButton;
