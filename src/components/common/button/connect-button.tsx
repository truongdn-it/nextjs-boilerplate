'use client';

import React, { useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';

import ConnectedButton from './connected-button';
import NotConnectButton from './not-connect-button';

function ConnectButton() {
  const { connected, publicKey, wallet, disconnect } = useWallet();
  useEffect(() => {
    let provider = null;
    const walletName = wallet?.adapter?.name;
    const anyWindow: any = window;

    switch (walletName) {
      case 'Phantom':
        provider = anyWindow?.solana;
        break;
      case 'Solflare':
        provider = anyWindow?.solflare;
        break;
      case 'Backpack':
        provider = anyWindow?.backpack;
        break;
      default:
        break;
    }

    if (!provider || !publicKey) {
      return;
    }

    if (provider) {
      provider.on('accountChanged', async (newPublicKey: PublicKey | null) => {
        if (newPublicKey) {
          switch (walletName) {
            case 'Phantom':
              {
                if (!newPublicKey.equals(publicKey)) {
                  wallet?.adapter.emit('connect', newPublicKey);
                }
              }
              break;
            case 'Solflare':
              {
                if (!newPublicKey.equals(publicKey)) {
                  wallet?.adapter.emit('connect', newPublicKey);
                }
              }
              break;
            case 'Backpack':
              {
                if ((newPublicKey as any)?.publicKey !== publicKey.toBase58()) {
                  wallet?.adapter.emit(
                    'connect',
                    new PublicKey((newPublicKey as any)?.publicKey),
                  );
                }
              }
              break;
            default:
              break;
          }
        } else {
          /**
           * In this case dApps could...
           *
           * 1. Not do anything
           * 2. Only re-connect to the new account if it is trusted
           *
           * ```
           * provider.connect({ onlyIfTrusted: true }).catch((err) => {
           *  // fail silently
           * });
           * ```
           *
           * 3. Always attempt to reconnect
           */
          disconnect();
        }
      });
    }
  }, [disconnect, publicKey, wallet?.adapter]);

  return connected && publicKey ? <ConnectedButton /> : <NotConnectButton />;
}

export default ConnectButton;
