// TODO: turn all of those imported scripts into more lightweight react components
// change 503941a9939a4337d9aef7b92323c353441cb5ebe79f13fed77aeac615116354 to the correct event (once posted)

import Script from 'next/script'

export default function RepoDiscussionsPage() {
  return (
    <>
      <Script src="https://nostrocket.org/verifyBitcoinSignedMessage.js" />
      <Script src="https://unpkg.com/nostr-tools/lib/nostr.bundle.js" />
      <Script src="https://nostrocket.org/nostr.js" />
      <Script src="https://nostrocket.org/comments.js" />
      <link rel="stylesheet" href="https://nostrocket.org/comments.css" />
      <Script
        id="comments-init"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `let relay = comments_init("503941a9939a4337d9aef7b92323c353441cb5ebe79f13fed77aeac615116354")`,
        }}
      />
      <div id="comments" className="mt-4 max-w-5xl">loading comments...</div>
      <div className="border border-gray rounded-md w-full max-w-5xl mb-32">
        <div className="flex text-sm bg-[#171B21] rounded-md rounded-bl-none rounded-br-none border-gray h-11 border-b pt-2 pl-2">
          <div className="relative -bottom-px border-t border-l border-r bg-[#0F1116] rounded-md rounded-bl-none rounded-br-none border-gray h-full max-w-min flex items-center p-4">Write</div>
          <div className="relative -bottom-px text-slate-400 h-full max-w-min flex items-center p-4">Preview</div>
        </div>
        <a href="https://snort.social/e/note12qu5r2vnnfpn0kdw77ujxg7r2dzped0tu7038lkh0t4vv9g3vd2qjxr9c7" target="_blank" className="p-2 block">
          <textarea rows={4} className="w-full bg-black border border-gray rounded-md min-h-full flex h-full" />
        </a>
      </div>
    </>
  );
}
