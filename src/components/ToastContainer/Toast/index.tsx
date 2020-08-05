import React, { useEffect } from 'react';
import {
  FiAlertCircle,
  FiCheckCircle,
  FiInfo,
  FiXCircle,
} from 'react-icons/fi';
import { ToastMessage, useToast } from '../../../hooks/toast';

import { Container } from './styles';

interface ToastProps {
  toastData: ToastMessage;
}

const icons = {
  info: <FiInfo size={24} />,
  error: <FiAlertCircle size={24} />,
  success: <FiCheckCircle size={24} />,
};

const Toast: React.FC<ToastProps> = ({ toastData }) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(toastData.id);
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [toastData.id, removeToast]);

  return (
    <Container type={toastData.type} hasDescription={!!toastData.description}>
      {icons[toastData.type || 'info']}
      <div>
        <strong>{toastData.title}</strong>
        {toastData.description && <p>{toastData.description}</p>}
      </div>
      <button type="button" onClick={() => removeToast(toastData.id)}>
        <FiXCircle size={18} />
      </button>
    </Container>
  );
};

export default Toast;
