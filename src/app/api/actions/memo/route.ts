import {
  ActionPostResponse,
  // createPostResponse,
  // MEMO_PROGRAM_ID,
  ActionGetResponse,
  createActionHeaders,
  ACTIONS_CORS_HEADERS,
} from '@solana/actions';

// create the standard headers for this route (including CORS)
const headers = createActionHeaders({
  chainId: "mainnet", // or chainId: "devnet"
  actionVersion: "2.1.3", // the desired spec version
});



export const GET = async (req: Request) => {

  const tweetBaseUrl = `https://twitter.com/intent/tweet`;
 

  const payload: ActionGetResponse = {
    type: 'action',
    title: 'Actions Example - Simple On-chain Memo',
    icon: 'https://ucarecdn.com/7aa46c85-08a4-4bc7-9376-88ec48bb1f43/-/preview/880x864/-/quality/smart/-/format/auto/',
    label: 'Send Sol',
    description: 'Send a message on-chain using a Memo',
    links: {
      actions: [
        {
          type: 'external-link',
          label: "Login Twitter",
          href: `/api/actions/memo`,
        },
        {
          type: "external-link",
          label: "Send Post", // button text
          href: `${tweetBaseUrl}?text={tweetContent}`,
          parameters: [
              {
                  name: "tweetContent", // parameter name in the `href` above
                  label: "Share Post!", // placeholder of the text input
                  required: true,
              },
          ],
      },
      ]
    }
  };

  return Response.json(payload, {
    headers: ACTIONS_CORS_HEADERS
  });
};

// DO NOT FORGET TO INCLUDE THE `OPTIONS` HTTP METHOD
// THIS WILL ENSURE CORS WORKS FOR BLINKS
export const OPTIONS = async () => {
  return new Response(null, { headers });
};
export const POST = async (req: Request) => {

  const payload: ActionPostResponse = {
    type: 'external-link',
    externalLink: `https://twitter.com/intent/tweet?text=${"text is here"}`, 
  };

  return Response.json(payload, {
    headers: ACTIONS_CORS_HEADERS
  });
};
