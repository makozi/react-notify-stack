import React, { useRef } from 'react';
import { useNotify } from './NotifyContext';
import { Toast } from './Toast';
import { Position, ToastProps } from './types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './toast-animations.css';

const positionStyles: Record<Position, React.CSSProperties> = {
  'top-right': { top: '1rem', right: '1rem', flexDirection: 'column' },
  'top-left': { top: '1rem', left: '1rem', flexDirection: 'column' },
  'bottom-right': { bottom: '1rem', right: '1rem', flexDirection: 'column-reverse' },
  'bottom-left': { bottom: '1rem', left: '1rem', flexDirection: 'column-reverse' },
};

export const ToastContainer = () => {
  const { toasts, remove } = useNotify();

  return (
    <>
      {(['top-right', 'top-left', 'bottom-right', 'bottom-left'] as Position[]).map((pos) => (
        <div
          key={pos}
          style={{
            position: 'fixed',
            display: 'flex',
            ...positionStyles[pos],
            gap: '8px',
            zIndex: 9999,
          }}
        >
          <TransitionGroup>
            {toasts
              .filter((toast) => toast.position === pos)
              .map((toast) => {
                const nodeRef = useRef(null);
                return (
                  <CSSTransition
                    key={toast.id}
                    nodeRef={nodeRef}
                    timeout={300}
                    classNames="toast"
                  >
                    <div ref={nodeRef}>
                      <Toast {...toast} onClose={() => remove(toast.id)} />
                    </div>
                  </CSSTransition>
                );
              })}
          </TransitionGroup>
        </div>
      ))}
    </>
  );
};
