import React from 'react';
import { useApp } from '../context/AppContext';
import CartPanel from './CartPanel';
import LikesPanel from './LikesPanel';
import AccountPanel from './AccountPanel';

const SidePanel = () => {
  const { sidePanelOpen, closeSidePanel } = useApp();

  return (
    <>
      <div 
        className={`overlay ${sidePanelOpen ? 'active' : ''}`}
        onClick={closeSidePanel}
      />
      
      <div className={`side-panel ${sidePanelOpen ? 'open' : ''}`}>
        {sidePanelOpen === 'cart' && <CartPanel />}
        {sidePanelOpen === 'likes' && <LikesPanel />}
        {sidePanelOpen === 'account' && <AccountPanel />}
      </div>
    </>
  );
};

export default SidePanel;
