import { useState, useEffect, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";
import { 
  Globe, 
  Hammer, 
  Satellite, 
  Monitor, 
  Brain, 
  Clock, 
  Calendar, 
  ExternalLink,
  Zap,
  Layout,
  Shield,
  Users,
  Info,
  Share2,
  FileText,
  Map as MapIcon,
  Database,
  Cpu,
  Activity,
  CloudSun,
  Quote,
  ChevronDown,
  ChevronUp,
  RefreshCw
} from 'lucide-react';

interface LinkItem {
  title: string;
  url: string;
}

interface DashboardCard {
  title: string;
  icon: ReactNode;
  links: LinkItem[];
}

export default function App() {
  const [time, setTime] = useState(new Date());
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [inspiration, setInspiration] = useState<{ quote: string; reference: string }>({
    quote: "The grass withers, the flower fades, but the word of our God will stand forever.",
    reference: "Isaiah 40:8 (ESV)"
  });
  const [loadingInspiration, setLoadingInspiration] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    fetchInspiration();
    return () => clearInterval(timer);
  }, []);

  const fetchInspiration = async () => {
    setLoadingInspiration(true);
    try {
      // Note: On GitHub Pages, you'll need to set up an Environment Variable 
      // or use a secure way to access your API key.
      const apiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || (process.env as any).GEMINI_API_KEY || '';
      if (!apiKey) throw new Error("API Key missing");
      
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: "Provide one inspirational Bible verse from the ESV translation. Format your response exactly like this: \"[Verse Body]\" — [Reference] (ESV)",
        config: {
          systemInstruction: "You are an inspirational assistant. Your goal is to provide a single, uplifting Bible verse from the English Standard Version (ESV).",
        }
      });

      const text = response.text;
      if (text) {
        const parts = text.split(" — ");
        if (parts.length === 2) {
          setInspiration({
            quote: parts[0].replace(/"/g, ""),
            reference: parts[1]
          });
        }
      }
    } catch (error) {
      console.error("Failed to fetch inspiration:", error);
    } finally {
      setLoadingInspiration(false);
    }
  };

  const toggleCategory = (title: string) => {
    setExpandedCategories(prev => 
      prev.includes(title) 
        ? prev.filter(t => t !== title) 
        : [...prev, title]
    );
  };

  const dashboardData: DashboardCard[] = [
    {
      title: "Explore GIS Environment",
      icon: <Globe className="w-5 h-5 text-opelika-red" />,
      links: [
        { title: "Explore Environment", url: "https://explore.opelika-al.gov/portal/sharing/oauth2/authorize?client_id=arcgisonline&response_type=code&state=%7B%22portalUrl%22%3A%22https%3A%2F%2Fexplore.opelika-al.gov%2Fportal%22%2C%22uid%22%3A%22xmVF5yr0PEr4vLm3G9wP5N47x5Z08wvV_rTPSsa49ZE%22%2C%22returnUrl%22%3A%22https%3A%2F%2Fexplore.opelika-al.gov%2Fportal%2Fhome%2Findex.html%22%2C%22useLandingPage%22%3Afalse%2C%22clientId%22%3A%22arcgisonline%22%7D&expiration=20160&locale=en-us&redirect_uri=https%3A%2F%2Fexplore.opelika-al.gov%2Fportal%2Fhome%2Faccountswitcher-callback.html&code_challenge=gNY3bxrjUTXaXmVRiOKTcIzdTYEgNpQhTjpMrQjsZvA&code_challenge_method=S256&display=default&force_login=false&hideCancel=true&showSignupOption=true&canHandleCrossOrgSignIn=true&signuptype=esri" },
        { title: "City of Opelika Enterprise GIS", url: "https://explore.opelika-al.gov/portal/home/index.html" },
        { title: "Opelika GIS Data Hub", url: "https://explore.opelika-al.gov/portal/apps/sites/#/city-of-opelika-gis-data-hub" },
        { title: "ArcGIS Monitor", url: "https://gismonitor:30443/arcgis/monitor/signin" },
        { title: "ArcGIS Server Manager", url: "https://explore.opelika-al.gov/server/manager/#" },
        { title: "MachAlert Issue Report", url: "https://survey123.arcgis.com/share/56f6401f76214a2dadf74b2ec4472c82?portalUrl=https://explore.opelika-al.gov/portal" },
      ]
    },
    {
      title: "ArcGIS Online",
      icon: <Layout className="w-5 h-5 text-opelika-red" />,
      links: [
        { title: "ArcGIS Experience Builder", url: "https://experience.arcgis.com/builder/?id=ffb4dbe2235a451ba07129d86f8448cf" },
        { title: "Automating Workflows (Pro 3.4)", url: "https://www.esri.com/training/Engine/defaultui/player/modern.html?configuration=&preventRightClick=False&cc=en-US&cache=22.16.365.0&playerConfUrl=n&registration=ApiRegistrationId%7C57957ed130a990c02999b51c-176991-tcooper_OpelikaGIS%21InstanceId%7C0&package=ApiCourseId%7C57957ed130a990c02999b51c-176991%21VersionId%7C0&tracking=True&forceReview=False" },
        { title: "Enterprise Quick Start Guide", url: "https://www.esri.com/training/Engine/defaultui/player/modern.html?configuration=&preventRightClick=False&cc=en-US&cache=22.16.365.0&playerConfUrl=n&registration=ApiRegistrationId%7C5cacfe1461a32c31b715f724-105851-tcooper_OpelikaGIS%21InstanceId%7C0&package=ApiCourseId%7C5cacfe1461a32c31b715f724-105851%21VersionId%7C1&tracking=True&forceReview=False" },
        { title: "ArcGIS Solutions Gallery", url: "https://www.arcgis.com/apps/solutions/index.html?gallery=true&sortField=relevance&sortOrder=desc#home" },
        { title: "AGO Home Search", url: "https://opelikagis.maps.arcgis.com/home/search.html?restrict=true&sortField=relevance&sortOrder=desc&searchTerm=01+Snow+plowing+routes+for+police+and+fire#content" },
        { title: "Esri Learning Plans", url: "https://www.esri.com/training/learning-plans/" },
        { title: "Esri Community", url: "https://community.esri.com/" },
        { title: "ArcGIS Living Atlas", url: "https://livingatlas.arcgis.com/en/home/" },
      ]
    },
    {
      title: "Experience Builders",
      icon: <Hammer className="w-5 h-5 text-opelika-red" />,
      links: [
        { title: "ESG Waste Water Field Map", url: "https://explore.opelika-al.gov/portal/apps/experiencebuilder/template/?id=e2a4d394bd5a4207877ced8155f3982a" },
        { title: "Road Closure Management", url: "https://explore.opelika-al.gov/portal/apps/experiencebuilder/experience/?id=e2e38199e4324b618f7406efd0d60dff" },
        { title: "Road Closure Viewer", url: "https://explore.opelika-al.gov/portal/apps/experiencebuilder/experience/?id=f63838ce1a3549e3a0582761c4c98c9d" },
        { title: "Community Development LH", url: "https://explore.opelika-al.gov/portal/apps/experiencebuilder/experience/?id=623f11129a85469e8f3527e24fe56580" },
        { title: "Opelika Use Zones", url: "https://explore.opelika-al.gov/portal/apps/experiencebuilder/experience/?id=eb9f121281cb473e9e7d0f2314017669" },
        { title: "Stormwater Viewer", url: "https://explore.opelika-al.gov/portal/apps/experiencebuilder/experience/?id=b13976dd2de243e48093780903a28abb" },
        { title: "Street Finder Companion", url: "https://experience.arcgis.com/experience/4a38cfffcc6c4360a16576549cc3c0f5?draft=true" },
        { title: "Code Compliance Zones", url: "https://explore.opelika-al.gov/portal/apps/experiencebuilder/experience/?draft=true&id=eb2a1842ca344d84ab964e5fdf00f6e7&page=Code-Compliance-Zones#widget_26=active_datasource_id:dataSource_4,center:-9504264.465991165%2C3848375.101884966%2C102100,scale:9360.2069794656,rotation:0,viewpoint:%7B%22rotation%22%3A0%2C%22scale%22%3A9360.2069794656%2C%22targetGeometry%22%3A%7B%22spatialReference%22%3A%7B%22latestWkid%22%3A2%22%3A3857%22%2C%22wkid%22%3A22%3A102100%7D%2C%22x%22%3A-9504264.465991165%2C%22y%22%3A3848375.101884966%7D%7D" },
        { title: "Cemetery Management", url: "https://explore.opelika-al.gov/portal/apps/experiencebuilder/experience/?id=5087e1bb03554f799426e3d90e9ed62e&draft=true" },
      ]
    },
    {
      title: "IT Support",
      icon: <Monitor className="w-5 h-5 text-opelika-red" />,
      links: [
        { title: "Zendesk Dashboard", url: "https://opelika.zendesk.com/agent/dashboard" },
        { title: "Zendesk Admin Center", url: "https://opelika.zendesk.com/admin/home" },
        { title: "LogMeIn Resolve", url: "https://console.gotoresolve.com/devices" },
        { title: "Tyler Client Support", url: "https://www.tylertech.com/client-support" },
        { title: "Cisco Webx User Portal", url: "https://var-bc.broadcloudpbx.com/myphonenext/" },
        { title: "BlueBeam ADMIN", url: "https://org-admin.bluebeam.com/BBOAC/s/" },
        { title: "Bluebeam Sign In", url: "https://signin.bluebeam.com/" },
        { title: "Placer.ai Analytics", url: "https://analytics.placer.ai/explore?params=%7B%22type%22:%22venues%252Ccomplexes%22,%22center%22:%7B%22lat%22:32.646930501095014,%22lng%22:-85.38021479733882%7D,%22ne%22:%2232.64803946804672,-85.37679473165107%22,%22sw%22:%2232.645821520391536,-85.3836348630272%22,%22zoom%22:17.705981159288694%7D" },
        { title: "Discord | Opelika GIS", url: "https://discord.com/channels/1401959637464514663/1401959639284846636" },
        { title: "Thor Guard Dashboard", url: "https://360.thormobile.net/opelika-al/" },
        { title: "Web Rep Console", url: "https://connect.opelika-al.gov/console" },
        { title: "SysAid Help Desk", url: "https://cityofopelika.sysaidit.com/HelpDesk.jsp?fromId=IncidentsList&showFirstPage=true" },
        { title: "Hub - Permitting & Licensing", url: "https://hubtest.opelika-al.gov/Page/Display/0fa4068b-6559-4d7c-9358-d10764f2df5e" },
      ]
    },
    {
      title: "Map Services",
      icon: <Satellite className="w-5 h-5 text-opelika-red" />,
      links: [
        { title: "Samsara Fleet (Live)", url: "https://cloud.samsara.com/signin" },
        { title: "USGS Lidar Explorer", url: "https://apps.nationalmap.gov/lidar-explorer/#/" },
        { title: "GEBCO Data Download", url: "https://download.gebco.net/" },
        { title: "AL Link Node Viewer", url: "https://linknodeviewer.aladata.com/" },
        { title: "Maps Content Partners", url: "https://contentpartners.maps.google.com/portal/home?a=2003174551" },
        { title: "Google Maps", url: "https://www.google.com/maps/@32.6588829,-85.3759966,15z?authuser=0&entry=ttu&g_ep=EgoyMDI1MTEwMy4wIKXMDSoASAFQAw%3D%3D" },
      ]
    },
    {
      title: "City Employee Info",
      icon: <Users className="w-5 h-5 text-opelika-red" />,
      links: [
        { title: "MUNIS OnLine ESS", url: "https://ss.opelika-al.gov/ess/default.aspx" },
        { title: "American Benefit Admin", url: "https://americanbenefitadministrators.com/" },
        { title: "MOS - Home", url: "https://mso.rsa-al.gov/Common/Pages/MWelcome.aspx" },
        { title: "Employee Navigator", url: "https://www.employeenavigator.com/employee/Home" },
        { title: "BCBS Alabama", url: "https://www.bcbsal.org/web/index.html" },
        { title: "Financial Calculators", url: "https://www.fncalculator.com/financialcalculator?type=salaryIncreaseCalculator" },
        { title: "The FSA Store", url: "https://fsastore.com/" },
        { title: "Prime Therapeutics", url: "https://www.myprime.com/en.html" },
      ]
    },
    {
      title: "Street & Asset Info",
      icon: <Info className="w-5 h-5 text-opelika-red" />,
      links: [
        { title: "Postal Street Suffix Guide", url: "https://pe.usps.com/text/pub28/28apc_002.htm" },
        { title: "Zoning Ordinance (Updated)", url: "https://www.opelika-al.gov/DocumentCenter/View/5639/ZONING-ORDINANCE----Updated-12062022" },
        { title: "Munis Live Assets", url: "https://munisapp.opelika-al.gov/prod/munis/gas/app/ua/r/mugwc/wmastmnt" },
        { title: "Active CFS Viewer Fire", url: "https://opelikagis.maps.arcgis.com/apps/instant/interactivelegend/index.html?appid=1ef8540b252244948c4fde553750145c&locale=en&center=-85.3794%3B32.6482&level=18" },
        { title: "E911 Dashboard", url: "https://opelikagis.maps.arcgis.com/apps/dashboards/bb302dadf0374078bbff2e2e87d96a67" },
      ]
    },
    {
      title: "Social Media & AI",
      icon: <Share2 className="w-5 h-5 text-opelika-red" />,
      links: [
        { title: "ChatGPT", url: "https://chatgpt.com/" },
        { title: "Google Gemini", url: "https://gemini.google.com/app?utm_source=app_launcher&utm_medium=owned&utm_campaign=base_all" },
        { title: "AI Studio", url: "https://aistudio.google.com/apps" },
        { title: "Bitmoji Account", url: "https://www.bitmoji.com/account_v2/" },
        { title: "Unsplash Images", url: "https://unsplash.com/" },
        { title: "what3words Location", url: "https://what3words.com/downward.riches.incomes" },
      ]
    },
    {
      title: "Lucidpages",
      icon: <FileText className="w-5 h-5 text-opelika-red" />,
      links: [
        { title: "GIS Project Management", url: "https://lucid.app/lucidspark/d035b345-3641-4ab7-8e87-3ab0e1b71545/edit?page=0_0&invitationId=inv_28393241-1803-485f-8a61-76b4f7b01097#" },
        { title: "Enterprise GIS Diagram", url: "https://lucid.app/lucidchart/fd80d64b-7106-49d7-9c67-106f199be787/edit?page=0_0#" },
        { title: "3D Notes: Lucidchart", url: "https://lucid.app/lucidchart/ce6dff79-0110-42c6-9358-d10764f2df5e/edit?invitationId=inv_a439d547-509e-411d-887a-4e05d2b71545&page=0_0#" },
        { title: "Lucid Documents Home", url: "https://lucid.app/documents#/documents?folder_id=home" },
        { title: "Lucid Recent Home", url: "https://lucid.app/documents#/home?folder_id=recent" },
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <div 
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <header className="w-full bg-card-bg px-6 py-4 shadow-md border-b-2 border-slate-200 flex flex-col md:flex-row justify-between items-center z-10 gap-4">
        <div className="flex items-center gap-6">
          <div className="header-logo">
            <img 
              src="https://i.ibb.co/L5rK39z/Opelika-Logo-Placeholder.png" 
              alt="Opelika Logo" 
              className="h-14 object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl font-bold text-main-black uppercase tracking-wider">GIS Command Center</h1>
            <p className="text-xs text-slate-500 font-medium">Enterprise Geospatial Infrastructure | Opelika GIS Analyst Workbench</p>
          </div>
        </div>

        <div className="flex items-center gap-6 text-right">
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-2 text-opelika-red font-bold text-2xl">
              <Clock className="w-6 h-6" />
              <span>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 text-sm font-semibold">
              <Calendar className="w-4 h-4" />
              <span>{time.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto p-6 md:p-10 z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Weather Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/20 flex flex-col items-center text-center"
          >
            <div className="bg-opelika-red/10 p-4 rounded-full mb-4">
              <CloudSun className="w-10 h-10 text-opelika-red" />
            </div>
            <h2 className="text-2xl font-bold text-main-black mb-2">Today's Weather</h2>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-4xl font-bold text-slate-800">72°F</span>
              <div className="text-left">
                <p className="text-sm font-semibold text-slate-600 uppercase tracking-wider">Opelika, AL</p>
                <p className="text-xs text-slate-400">Mostly Sunny</p>
              </div>
            </div>
            <a 
              href="https://www.foxweather.com/local-weather/alabama/opelika"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-100 text-slate-700 px-8 py-3 rounded-full font-bold uppercase tracking-widest hover:bg-opelika-red hover:text-white transition-all flex items-center gap-2 text-xs"
            >
              <ExternalLink className="w-4 h-4" />
              Detailed Forecast
            </a>
          </motion.div>

          {/* Inspiration Section */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/20 flex flex-col items-center text-center h-full justify-between group"
          >
            <div className="flex justify-between w-full items-start mb-4">
              <div className="w-10" />
              <div className="bg-opelika-red/10 p-4 rounded-full">
                <Quote className="w-10 h-10 text-opelika-red" />
              </div>
              <button 
                onClick={fetchInspiration}
                disabled={loadingInspiration}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-opelika-red disabled:opacity-50"
                title="Get New Inspiration"
              >
                <RefreshCw className={`w-5 h-5 ${loadingInspiration ? 'animate-spin' : ''}`} />
              </button>
            </div>
            
            <div className="flex flex-col flex-1 justify-center min-h-[160px]">
              <h2 className="text-2xl font-bold text-main-black mb-4">Inspiration for Today</h2>
              <AnimatePresence mode="wait">
                <motion.blockquote 
                  key={inspiration.quote}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-slate-700 italic text-lg mb-6 leading-relaxed px-4"
                >
                  "{inspiration.quote}"
                  <cite className="block not-italic text-sm font-bold text-opelika-red mt-3 uppercase tracking-tighter">— {inspiration.reference}</cite>
                </motion.blockquote>
              </AnimatePresence>
            </div>
            <a 
              href="https://biblehub.com/esv/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-100 text-slate-700 px-8 py-3 rounded-full font-bold uppercase tracking-widest hover:bg-opelika-red hover:text-white transition-all flex items-center gap-2 text-xs"
            >
              <FileText className="w-4 h-4" />
              Explore the Word
            </a>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          {dashboardData.map((card, index) => {
            const isExpanded = expandedCategories.includes(card.title);
            return (
              <motion.div 
                key={card.title}
                className="bg-card-bg/95 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200 overflow-hidden hover:border-opelika-red transition-all flex flex-col group"
              >
                <button 
                  onClick={() => toggleCategory(card.title)}
                  className="w-full bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between group-hover:bg-opelika-red/5 transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    {card.icon}
                    <h3 className="font-bold text-lg text-main-black">{card.title}</h3>
                  </div>
                  {isExpanded ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                </button>
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                      <div className="p-4 flex flex-col gap-2 max-h-[400px] overflow-y-auto custom-scrollbar">
                        {card.links.map((link) => (
                          <a key={link.title} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 rounded-xl bg-slate-50/50 hover:bg-white hover:border-opelika-red transition-all group/link">
                            <span className="text-sm font-medium text-slate-700 truncate pr-2">{link.title}</span>
                            <ExternalLink className="w-4 h-4 text-slate-400 group-hover/link:text-opelika-red opacity-0 group-hover/link:opacity-100 transition-all flex-shrink-0" />
                          </a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </main>

      <footer className="w-full py-6 text-center text-slate-400 text-xs z-10 border-t border-slate-200 bg-white/50 backdrop-blur-sm">
        <p>© {new Date().getFullYear()} City of Opelika, AL | Enterprise GIS Division</p>
      </footer>
    </div>
  );
}
