import {component$} from '@builder.io/qwik';
import type {DocumentHead} from '@builder.io/qwik-city';
import {MUIButton} from '~/integrations/react/mui';
import {SafeAuthKit, SafeAuthProviderType} from '@spiritbro1/auth-kit'
import {server$} from '@builder.io/qwik-city';


export async function panda() {
    const safeAuthKit = await SafeAuthKit.init(SafeAuthProviderType.Web3Auth, {
        chainId: '0x5',
        authProviderConfig: {
            rpcTarget: "https://goerli.blockpi.network/v1/rpc/public",
            clientId: 'BF1Htzuyp_M9JJz1GD8ee0_2adbqswS9zEW1qbbnY7xC4jp962lVy3C564kHQRnag0eeZHuiXy6SgoQ3MToO80w',
            network: 'testnet',
            theme: 'light'  // The theme to use for the Web3Auth modal
        }
    })
    await safeAuthKit?.signIn();
}

export default component$(() => {


    return (
        <>
            <MUIButton client:only host:onClick$={server$(() => console.log("dsa"))}>server only</MUIButton>

            <MUIButton client:only host:onClick$={() => panda()}>
                sadsajdjsak
            </MUIButton>

        </>
    );
});

export const head: DocumentHead = {
    title: 'Qwik React',
};
