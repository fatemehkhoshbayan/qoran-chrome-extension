import { useState } from 'react';
import Layout from '@/layouts/Layout';
import VerseBox from '@/features/verse/VerseBox';
import NavigationControls from '@/features/verse/NavigationControls';

function App() {
  const [verseKey, setVerseKey] = useState<string>('');

  return (
    <Layout>
      <div className="flex flex-1 flex-col gap-5 overflow-hidden">
        <VerseBox verseKey={verseKey} />
        <NavigationControls verseKey={verseKey} setVerseKey={setVerseKey} />
      </div>
    </Layout>
  );
}

export default App;
