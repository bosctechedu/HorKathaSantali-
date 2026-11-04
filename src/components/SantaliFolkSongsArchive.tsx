import React, { useState } from 'react';
import { speakWithFemaleVoice } from '../utils/speech';
import { safeLoadFromStorage } from '../utils/storage';
import {
  Music,
  Play,
  Volume2,
  Sparkles,
  Search,
  Filter,
  CheckCircle2,
  Heart,
  Radio,
  BookOpen,
  Mic
} from 'lucide-react';

export interface FolkSong {
  id: string;
  nameDevanagari?: string;
  titleDevanagari: string;
  titleRoman: string;
  titleHindi: string;
  genre: 'sohrai' | 'baha' | 'karam' | 'dasai' | 'lagre' | 'bapla';
  genreLabel: string;
  seasonOrOccasion: string;
  instrumentsUsed: string;
  lyricsSantali: string;
  lyricsRoman: string;
  meaningHindi: string;
  culturalBackground: string;
  badgeColor: string;
}

export const DEFAULT_FOLK_SONGS: FolkSong[] = [
  {
    id: 'sohrai_seren_1',
    nameDevanagari: 'सोहराय सेरेञ (गायी जगावेन)',
    titleDevanagari: 'सोहराय सेरेञ: गायी जगावेन (गोधन आराधना)',
    titleRoman: 'Sohrai Seren: Gai Jagawen',
    titleHindi: 'सोहराय गाय जगाने का मांगलिक लोकगीत',
    genre: 'sohrai',
    genreLabel: 'सोहराय पर्व गीत',
    seasonOrOccasion: 'कार्तिक अमावस्या - सोहराय महापर्व (गोधन वंदना रात)',
    instrumentsUsed: 'तुमदाक (मांदर), तामाक (नगाड़ा), घंटी',
    lyricsSantali: 'चेद् लेकाते दो गो, गायी दो लांग जगावेया?\nचेद् लेकाते दो गो, गुहाल दो लांग साजावेया?\nघांसी दाः ते दो गो, गायी दो लांग जगावेया,\nघांसी घास ते दो गो, गुहाल दो लांग साजावेया।',
    lyricsRoman: 'Ched lekate do go, gayi do lang jagaweya?\nChed lekate do go, guhal do lang sajaweya?\nGhasi dah te do go, gayi do lang jagaweya,\nGhasi ghas te do go, guhal do lang sajaweya.',
    meaningHindi: 'हे मां! हम गौ माता को किस प्रकार जगाएंगे? हम अपनी गोशाला (गुहाल) को कैसे सजाएंगे?\nपवित्र घास के जल से हम गौ माता को जगाएंगे, और हरी-भरी दूब घास से अपनी गोशाला को सजाएंगे।',
    culturalBackground: 'सोहराय पर्व की पहली रात "गायी जगावेन" गाकर युवा रात भर प्रत्येक घर के गोहाल में जाकर गौ माता और बैलों को जगाकर उनके प्रति कृतज्ञता प्रकट करते हैं।',
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
  },
  {
    id: 'baha_seren_1',
    nameDevanagari: 'बाहा सेरेञ (सरजोम बाहा)',
    titleDevanagari: 'बाहा सेरेञ: सरजोम बाहा (साल पुष्प आगमन)',
    titleRoman: 'Baha Seren: Sarjom Baha',
    titleHindi: 'बाहा पर्व: साल वृक्ष के फूलों का स्वागत',
    genre: 'baha',
    genreLabel: 'बाहा पर्व गीत',
    seasonOrOccasion: 'फाल्गुन पूर्णिमा (वसंत ऋतु, प्रकृति पूजा)',
    instrumentsUsed: 'तिरियो (बांसुरी), तुमदाक (मांदर), करताल',
    lyricsSantali: 'बिर रे दो सरजोम बाहा फुटावेना,\nदिशोम रे दो मातुआर सोय चहावेना।\nएनाय नायके गोमके बाहा एमामे,\nबोहोक रे दो साजाम, जीवी रे दो रासका!',
    lyricsRoman: 'Bir re do sarjom baha futawena,\nDishom re do matuar soy chahawena.\nEnay Naike gomke baha emame,\nBohok re do sajam, jiwi re do raska!',
    meaningHindi: 'जंगल में साल के पवित्र श्वेत फूल खिल उठे हैं, पूरे देश में महुआ और प्रकृति की सुगंध फैल गई है।\nआदरणीय नायके (पुजारी) पवित्र फूल प्रदान कर रहे हैं, सिर में फूल सजाकर मन में असीम आनंद भर गया है!',
    culturalBackground: 'बाहा पर्व संतालों का वसंत उत्सव है। जब तक जाहेर थान में नायके द्वारा साल के फूलों की पहली पूजा नहीं होती, तब तक कोई भी संताल नए फूल नहीं तोड़ता।',
    badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
  },
  {
    id: 'dasai_seren_1',
    nameDevanagari: 'दासांय सेरेञ (भुवांग धुन)',
    titleDevanagari: 'दासांय सेरेञ: हाय रे हाय दिशोम (ऐतिहासिक विरह)',
    titleRoman: 'Dasai Seren: Hay Re Hay Dishom',
    titleHindi: 'दासांय पर्व: पूर्वजों की स्मृति व खोज गीत',
    genre: 'dasai',
    genreLabel: 'दासांय गीत',
    seasonOrOccasion: 'आश्विन मास (दुर्गा पूजा के समय, पुरुष नर्तकों द्वारा)',
    instrumentsUsed: 'भुवांग (धनुष-लौकी वाद्य), झांझ, घूंघरू',
    lyricsSantali: 'हाय रे हाय, दिशोम दो चेद लेका रे!\nहाय रे हाय, गुरु दो ओकोय दिशोम रे?\nभुवांग साड़े कान भुवां-भुवां,\nहापड़ाव को लांग पांचा कोवा रे!',
    lyricsRoman: 'Hay re hay, dishom do ched leka re!\nHay re hay, guru do okoy dishom re?\nBhuwang sare kan bhuwa-bhuwa,\nHapraw ko lang pancha kowa re!',
    meaningHindi: 'हाय रे हाय! हमारा देश कैसा हो गया! हाय रे हाय, हमारे आध्यात्मिक गुरु किस देश में खो गए?\nभुवांग वाद्य भुवां-भुवां की दर्द भरी ध्वनि निकाल रहा है, हम अपने बिछड़े पूर्वजों को खोजने निकले हैं!',
    culturalBackground: 'दासांय नृत्य और गीत संथाली समाज के इतिहास का सबसे कारुणिक अध्याय है। इसमें मोरपंख लगाकर पुरुष भुवांग वाद्य बजाते हुए गांव-गांव जाकर अपने ऐतिहासिक गुरुओं की खोज का अभिनय करते हैं।',
    badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300'
  },
  {
    id: 'karam_seren_1',
    nameDevanagari: 'काराम सेरेञ (जावा सेरेञ)',
    titleDevanagari: 'काराम सेरेञ: काराम गोसांय आशीष (कर्म व भाई-बहन)',
    titleRoman: 'Karam Seren: Karam Gosane Ashish',
    titleHindi: 'काराम पर्व: जावा डालियों की पूजा व मंगल कामना',
    genre: 'karam',
    genreLabel: 'काराम गीत',
    seasonOrOccasion: 'भाद्रपद एकादशी (काराम पूजा की रात)',
    instrumentsUsed: 'तुमदाक (मांदर), तामाक (नगाड़ा), झांझ',
    lyricsSantali: 'काराम गोसांय हिजुः में अबोवाः अखड़ा,\nजावा बाहा ते लांग बोंगा बुरुवा।\nदादा लागीत सुक आर मायंजी लागीत धन,\nसानाम सांवता रे शांति दोहोय मे!',
    lyricsRoman: 'Karam Gosane hijuh me abowah akhra,\nJawa baha te lang bonga buruwa.\nDada lagit suk ar mayanji lagit dhan,\nSanam sawta re shanti dohoy me!',
    meaningHindi: 'हे काराम देवता! हमारे अखड़ा में पधारिए, अंकुरित जावा फूलों से हम आपकी पूजा करेंगे।\nभाइयों के लिए सुख और बहनों के लिए समृद्धि दीजिए, और पूरे समाज में सदा शांति बनाए रखिए!',
    culturalBackground: 'काराम पर्व बहन और भाई के अटूट स्नेह और प्रकृति के प्रति निष्ठा का प्रतीक है। युवतियां 9 दिनों तक बांस की टोकरी में जावा (अंकुरित अन्न) उगाकर यह गीत गाती हैं।',
    badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
  },
  {
    id: 'lagre_seren_1',
    nameDevanagari: 'लांगड़े सेरेञ (अखड़ा मिलन)',
    titleDevanagari: 'लांगड़े सेरेञ: अखड़ा रे रासका (सामुदायिक उल्लास)',
    titleRoman: 'Lagre Seren: Akhra Re Raska',
    titleHindi: 'लांगड़े अखड़ा: सामुदायिक समरसता व आनंद गीत',
    genre: 'lagre',
    genreLabel: 'लांगड़े लोकगीत',
    seasonOrOccasion: 'वर्षभर किसी भी शाम, चांदनी रात व सामाजिक मिलन',
    instrumentsUsed: 'तुमदाक (मांदर), तामाक (नगाड़ा), तिरियो (बांसुरी)',
    lyricsSantali: 'अतु अखड़ा रे तुमदाक साड़े,\nकुड़ी-कोड़ा को सेनोक् कान लांगड़े।\nहाते-हात साबोक काते लांग एनेचा,\nमिद मोने ते लांग सेरेञा!',
    lyricsRoman: 'Atu akhra re tumdak sare,\nKuri-kora ko senok kan Lagre.\nHate-hat sabok kate lang enecha,\nMid mone te lang serena!',
    meaningHindi: 'गांव के अखड़ा में मांदर की गूंज उठ रही है, सभी युवक-युवतियां लांगड़े नाच में जा रहे हैं।\nहाथों में हाथ डालकर हम कदम मिलाएंगे, और एक मन होकर प्रकृति के गीत गाएंगे!',
    culturalBackground: 'लांगड़े संथाली समाज का सबसे लोकप्रिय, सरल और सार्वभौमिक नृत्य-गीत है। इसमें कोई जाति या कुल का भेद नहीं होता, पूरा गांव मिलकर अखड़ा में झूमता है।',
    badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
  }
];

export const SantaliFolkSongsArchive: React.FC = () => {
  const [songs] = useState<FolkSong[]>(() =>
    safeLoadFromStorage('hor_katha_cms_folk_songs', DEFAULT_FOLK_SONGS)
  );
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const [selectedSong, setSelectedSong] = useState<FolkSong>(songs[0]);

  const filteredSongs = songs.filter((s) => {
    return selectedGenre === 'all' || s.genre === selectedGenre;
  });

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-8 -bottom-8 w-44 h-44 bg-purple-500/20 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-purple-500/30 px-3.5 py-1.5 rounded-full text-xs font-bold text-purple-200 border border-purple-400/30">
              <Music className="w-4 h-4 text-purple-300" />
              <span>सेरेञ गाबुआन • संथाली पारंपरिक लोकगीत व सेरेञ बोल आर्काइव</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              संथाली लोकगीत एवं सेरेञ संग्रह (Folk Songs & Seren Lyrics)
            </h1>
            <p className="text-purple-100/90 text-sm sm:text-base max-w-2xl leading-relaxed">
              सोहराय, बाहा, काराम, दासांय एवं लांगड़े—मांदर व तिरियो की धुन पर गाए जाने वाले संथाली समाज के पारंपरिक गीतों के मूल बोल, देवनागरी लिपि, हिंदी भावार्थ एवं गायन वाचन।
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/20 self-start md:self-auto">
            <Radio className="w-6 h-6 text-purple-300" />
            <div>
              <p className="text-xs text-purple-200">संग्रहीत सेरेञ</p>
              <p className="text-lg font-black text-white">{songs.length} लोकगीत</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 bg-white p-3 rounded-2xl border border-slate-200 shadow-xs">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 mr-2">
          <Filter className="w-3.5 h-3.5" /> पर्व शैली:
        </span>
        {[
          { id: 'all', label: 'सभी सेरेञ (All)' },
          { id: 'sohrai', label: 'सोहराय गीत' },
          { id: 'baha', label: 'बाहा गीत' },
          { id: 'dasai', label: 'दासांय गीत' },
          { id: 'karam', label: 'काराम गीत' },
          { id: 'lagre', label: 'लांगड़े गीत' }
        ].map((genre) => (
          <button
            key={genre.id}
            onClick={() => setSelectedGenre(genre.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedGenre === genre.id
                ? 'bg-purple-800 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {genre.label}
          </button>
        ))}
      </div>

      {/* 2-Column: Song Cards & Lyrics Player */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Cards */}
        <div className="lg:col-span-6 space-y-4">
          {filteredSongs.map((song) => {
            const isSelected = selectedSong.id === song.id;
            return (
              <div
                key={song.id}
                onClick={() => setSelectedSong(song)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer bg-white text-left flex flex-col justify-between shadow-xs ${
                  isSelected
                    ? 'border-purple-600 ring-2 ring-purple-500/20 shadow-md scale-[1.01]'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${song.badgeColor}`}>
                      {song.genreLabel}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        speakWithFemaleVoice(song.lyricsSantali);
                      }}
                      className="p-1 rounded-full bg-purple-50 hover:bg-purple-100 text-purple-800 cursor-pointer"
                      title="गीत बोल सुनें"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  <h3 className="text-base font-black text-slate-900 tracking-tight">
                    {song.titleDevanagari}
                  </h3>
                  <p className="text-xs font-semibold text-purple-700 mb-2">
                    {song.titleRoman} • {song.titleHindi}
                  </p>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {song.culturalBackground}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 truncate max-w-[170px]">वाद्य: {song.instrumentsUsed}</span>
                  <span className="text-purple-700 font-bold hover:underline">
                    बोल व भावार्थ →
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Active Lyrics Studio */}
        <div className="lg:col-span-6 sticky top-20 bg-white rounded-3xl border border-slate-200 shadow-lg p-6 space-y-5">
          <div className="flex items-start justify-between">
            <div>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${selectedSong.badgeColor}`}>
                {selectedSong.genreLabel}
              </span>
              <h2 className="text-xl font-black text-slate-900 mt-2">
                {selectedSong.titleDevanagari}
              </h2>
              <p className="text-xs font-bold text-purple-700">
                {selectedSong.titleRoman}
              </p>
            </div>
            <button
              onClick={() => speakWithFemaleVoice(selectedSong.lyricsSantali)}
              className="flex items-center gap-1.5 px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs hover:scale-105"
            >
              <Mic className="w-4 h-4" />
              <span>गायन / वाचन सुनें</span>
            </button>
          </div>

          {/* Quick Meta */}
          <div className="grid grid-cols-2 gap-3 bg-purple-50/50 p-3.5 rounded-2xl border border-purple-100 text-xs">
            <div>
              <p className="text-[11px] font-bold text-slate-500 uppercase">मुख्य अवसर</p>
              <p className="font-bold text-slate-800 mt-0.5 truncate">{selectedSong.seasonOrOccasion}</p>
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-500 uppercase">संगत वाद्ययंत्र</p>
              <p className="font-bold text-slate-800 mt-0.5 truncate">{selectedSong.instrumentsUsed}</p>
            </div>
          </div>

          {/* Lyrics Box */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center justify-between">
              <span>मूल संथाली बोल (देवनागरी लिपि)</span>
              <span className="text-[10px] text-purple-700 font-bold">Santali Seren Lyrics</span>
            </h4>
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 font-serif whitespace-pre-line text-sm font-bold text-slate-900 leading-relaxed shadow-2xs">
              {selectedSong.lyricsSantali}
            </div>
          </div>

          {/* Hindi Meaning */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-purple-700" /> सरल हिंदी भावार्थ
            </h4>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 whitespace-pre-line leading-relaxed">
              {selectedSong.meaningHindi}
            </div>
          </div>

          {/* Cultural Background */}
          <div className="space-y-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              ऐतिहासिक व सांस्कृतिक पृष्ठभूमि
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {selectedSong.culturalBackground}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
