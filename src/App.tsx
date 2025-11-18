import Layout from './Layout';
import { Box, Button } from './ui';

function App() {
  return (
    <Layout>
      <Box className="relative flex-1 flex-col">
        <div className="sticky top-0 bg-teal-300 p-4 text-3xl">
          <p>Al-Baqarah</p>
        </div>
        <hr className="my-4 w-full border-t border-gray-300" />
        <div className="min-h-0 flex-1 flex-col overflow-y-auto scroll-smooth">
          <p className="text-2xl">
            اللّهُ لاَ إِلَهَ إِلاَّ هُوَ الْحَیُّ الْقَیُّومُ لاَ تَأْخُذُهُ سِنَهٌ وَلاَ نَوْمٌ
            لَّهُ مَا فِی السَّمَاوَاتِ وَمَا فِی الأَرْضِ مَن ذَا الَّذِی یَشْفَعُ عِنْدَهُ إِلاَّ
            بِإِذْنِهِ یَعْلَمُ مَا بَیْنَ أَیْدِیهِمْ وَمَا خَلْفَهُمْ وَلاَ یُحِیطُونَ بِشَیْءٍ
            مِّنْ عِلْمِهِ إِلاَّ بِمَا شَاء وَسِعَ کُرْسِیُّهُ السَّمَاوَاتِ وَالأَرْضَ وَلاَ
            یَؤُودُهُ حِفْظُهُمَا وَهُوَ الْعَلِیُّ الْعَظِیمُ ۲۵۵ لاَ إِکْرَاهَ فِی الدِّینِ قَد
            تَّبَیَّنَ الرُّشْدُ مِنَ الْغَیِّ فَمَنْ یَکْفُرْ بِالطَّاغُوتِ وَیُؤْمِن بِاللّهِ
            فَقَدِ اسْتَمْسَکَ بِالْعُرْوَهِ الْوُثْقَىَ لاَ انفِصَامَ لَهَا وَاللّهُ سَمِیعٌ
            عَلِیمٌ ۲۵۶ اللّهُ وَلِیُّ الَّذِینَ آمَنُواْ یُخْرِجُهُم مِّنَ الظُّلُمَاتِ إِلَى
            النُّوُرِ وَالَّذِینَ کَفَرُواْ أَوْلِیَآؤُهُمُ الطَّاغُوتُ یُخْرِجُونَهُم مِّنَ
            النُّورِ إِلَى ۲۵۷ الظُّلُمَاتِ أُوْلَئِکَ أَصْحَابُ النَّارِ هُمْ فِیهَا خَالِدُونَ
          </p>
          <hr className="my-4 w-full border-t border-gray-300" />
          <p className="text-2xl">
            Allah,there is no god except He,the Living , the Everlasting,Neither dozing ,nor sleep
            overtakes HimTo Him belongs all that is in the heavens and the earth Who is He that
            shall intercede with Him except by His permission He knows what will be before their
            hands and what was behind them , and they do not comprehend anything of His knowledge
            except what He willed His seat embraces the heavens and the earth ,and the preserving of
            them does not wearing Him.He is the High,the Great. 255 There is no compultion in
            religion .Righteosness is now distinct from error.He who disbelieves in the idol and
            believes in Allah has grasped the firmest tie that will never break.Allah is hearing
            ,knowing. 256 Allah is the guardian of those who believe he brings them out from
            darkness into light. As for those who disbelieve,their guides are idols, they bring
            them. out from the light into darkness,they are the companions of the Fire and shall
            live in it for ever 257
          </p>
        </div>
      </Box>
      <Box className="flex-row">
        <Button text="prev" />
        <Button text="play" />
        <Button text="next" />
      </Box>
    </Layout>
  );
}

export default App;
