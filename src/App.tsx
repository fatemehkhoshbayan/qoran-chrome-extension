import Layout from './Layout';
import { useFetchRandomVerse } from './services/verse/verse.hooks';
import { Box, Button } from './ui';

function App() {
  const { data, isPending, error } = useFetchRandomVerse();

  return (
    <Layout>
      <div className="flex flex-1 flex-col gap-5 overflow-hidden">
        <Box className="flex min-h-0 flex-1 flex-col overflow-hidden">
          {/* Chapter Badge */}
          <div className="flex shrink-0 justify-center">
            <span className="rounded-full bg-emerald-50 px-5 py-2 text-xs font-semibold tracking-[0.15em] text-emerald-700 uppercase">
              {data?.chapter_id ? `Chapter ${data.chapter_id}` : '…'}
            </span>
          </div>

          <div className="flex flex-1 flex-col overflow-y-auto px-2 py-4 text-center">
            {error && (
              <div className="flex flex-col items-center justify-center gap-4 py-8 text-center">
                <span className="text-3xl opacity-60">⚠️</span>
                <p className="max-w-[220px] text-sm text-slate-600">
                  We couldn't load the verse. Check your connection and try again.
                </p>
                <Button
                  onClick={() => window.location.reload()}
                  text="Try Again"
                  className="bg-emerald-600! text-white hover:bg-emerald-700!"
                />
              </div>
            )}

            {isPending && <p className="animate-pulse text-base text-slate-400">Seeking verse…</p>}

            {data && (
              <div className="flex max-w-md flex-col gap-5">
                <p
                  className="font-arabic text-2xl leading-loose text-slate-800 sm:text-3xl"
                  dir="rtl"
                >
                  {data.text_uthmani}
                </p>
                <div className="mx-auto h-1 w-25 rounded-full bg-slate-200" />
                <p className="text-sm leading-relaxed text-slate-500 italic">
                  "{data.translations?.[0]?.text}"
                </p>
              </div>
            )}
          </div>
        </Box>

        {/* Navigation Controls */}
        <div className="flex shrink-0 gap-3">
          <Button text="prev" />
          <Button text="play" />
          <Button text="next" />
        </div>
      </div>
    </Layout>
  );
}

export default App;
