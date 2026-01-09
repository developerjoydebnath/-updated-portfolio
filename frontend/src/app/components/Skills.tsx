import {
  IconBolt,
  IconBox,
  IconBraces,
  IconBrandAdobe,
  IconBrandAdobeIllustrator,
  IconBrandAngular,
  IconBrandAws,
  IconBrandAzure,
  IconBrandBitbucket,
  IconBrandBootstrap,
  IconBrandCloudflare,
  IconBrandCpp,
  IconBrandCSharp,
  IconBrandCss3,
  IconBrandDjango,
  IconBrandDocker,
  IconBrandDribbble,
  IconBrandFacebook,
  IconBrandFigma,
  IconBrandFirebase,
  IconBrandFramer,
  IconBrandFramerMotion,
  IconBrandGithub,
  IconBrandGolang,
  IconBrandGraphql,
  IconBrandHtml5,
  IconBrandInstagram,
  IconBrandJavascript,
  IconBrandLaravel,
  IconBrandLinkedin,
  IconBrandMongodb,
  IconBrandMysql,
  IconBrandNextjs,
  IconBrandNodejs,
  IconBrandNpm,
  IconBrandOpenai,
  IconBrandPhp,
  IconBrandPnpm,
  IconBrandPrisma,
  IconBrandPython,
  IconBrandReact,
  IconBrandRedux,
  IconBrandSass,
  IconBrandStorybook,
  IconBrandSupabase,
  IconBrandSymfony,
  IconBrandTailwind,
  IconBrandTwitter,
  IconBrandTypescript,
  IconBrandVercel,
  IconBrandVite,
  IconBrandVscode,
  IconBrandVue,
  IconBrandYarn,
  IconBrandYoutube,
  IconCloud,
  IconCode,
  IconCpu,
  IconDatabase,
  IconDeviceDesktop,
  IconDeviceMobile,
  IconExternalLink,
  IconFileCode,
  IconHash,
  IconHexagon,
  IconLayersIntersect,
  IconLetterC,
  IconPackage,
  IconPalette,
  IconRefresh,
  IconSearch,
  IconServer,
  IconShieldCheck,
  IconTerminal2,
  IconWind,
  IconWorld
} from '@tabler/icons-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import GradientBorderCard from './GradientBorderCard';

interface SkillsProps {
  data: {
    name: string;
    category: string;
    icon?: string;
  }[];
  proficientIn?: string[];
}

const iconMap: any = {
  IconBrandReact,
  IconBrandRedux,
  IconBrandTypescript,
  IconBrandJavascript,
  IconBrandGraphql,
  IconBrandNodejs,
  IconBrandFigma,
  IconBrandAdobe,
  IconBrandAdobeIllustrator,
  IconDatabase,
  IconBrandMysql,
  IconBrandMongodb,
  IconLetterC,
  IconBrandSupabase,
  IconCloud,
  IconBrandSass,
  IconBrandTailwind,
  IconBrandBootstrap,
  IconBrandCss3,
  IconBrandHtml5,
  IconBrandNextjs,
  IconBrandVue,
  IconBrandAngular,
  IconBrandPhp,
  IconBrandLaravel,
  IconBrandGolang,
  IconBrandDocker,
  IconRefresh,
  IconBrandGithub,
  IconBrandBitbucket,
  IconBrandVscode,
  IconBrandDribbble,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconBrandInstagram,
  IconBrandFacebook,
  IconBrandYoutube,
  IconBrandFramer,
  IconBrandFramerMotion,
  IconBrandFirebase,
  IconBrandVite,
  IconBrandVercel,
  IconBrandPython,
  IconBrandCpp,
  IconBrandCSharp,
  IconBrandDjango,
  IconBrandSymfony,
  IconBrandAws,
  IconBrandAzure,
  IconBrandCloudflare,
  IconBrandOpenai,
  IconBrandNpm,
  IconBrandPnpm,
  IconBrandYarn,
  IconBrandStorybook,
  IconBrandPrisma,
  IconCode,
  IconTerminal2,
  IconDeviceDesktop,
  IconDeviceMobile,
  IconSearch,
  IconWorld,
  IconPalette,
  IconServer,
  IconShieldCheck,
  IconBolt,
  IconLayersIntersect,
  IconCpu,
  IconPackage,
  IconHexagon,
  IconWind,
  IconHash,
  IconFileCode,
  IconBraces,
  IconBox,
  IconExternalLink
};

export default function Skills({ data, proficientIn }: SkillsProps) {
  const [activeCategory, setActiveCategory] = useState('all');

  const displaySkills = data.length > 0 ? data.map(s => ({
    name: s.name,
    category: s.category.toLowerCase(),
    icon: s.icon || 'IconBolt',
    color: s.category === 'Frontend' ? 'from-blue-400 to-cyan-400' : 'from-green-500 to-emerald-600'
  })) : [
    {
      name: 'React',
      category: 'frontend',
      icon: 'IconBrandReact',
      color: 'from-blue-400 to-cyan-400',
    },
    {
      name: 'TypeScript',
      category: 'frontend',
      icon: 'IconBrandTypescript',
      color: 'from-blue-500 to-blue-600',
    },
    {
      name: 'Next.js',
      category: 'frontend',
      icon: 'IconBrandNextjs',
      color: 'from-gray-700 to-gray-900',
    },
    {
      name: 'Tailwind CSS',
      category: 'styling',
      icon: 'IconBrandTailwind',
      color: 'from-cyan-400 to-blue-500',
    },
    {
      name: 'CSS/SCSS',
      category: 'styling',
      icon: 'IconBrandCss3',
      color: 'from-pink-500 to-purple-500',
    },
    {
      name: 'Node.js',
      category: 'backend',
      icon: 'IconBrandNodejs',
      color: 'from-green-500 to-emerald-600',
    },
    {
      name: 'Express',
      category: 'backend',
      icon: 'IconServer',
      color: 'from-gray-600 to-gray-800',
    },
    {
      name: 'MongoDB',
      category: 'database',
      icon: 'IconBrandMongodb',
      color: 'from-green-500 to-green-700',
    },
    {
      name: 'PostgreSQL',
      category: 'database',
      icon: 'IconBrandMysql',
      color: 'from-blue-600 to-indigo-600',
    },
    {
      name: 'Git',
      category: 'tools',
      icon: 'IconBrandGithub',
      color: 'from-orange-500 to-red-500',
    },
    {
      name: 'Docker',
      category: 'tools',
      icon: 'IconBrandDocker',
      color: 'from-blue-400 to-blue-600',
    },
    {
      name: 'Figma',
      category: 'tools',
      icon: 'IconBrandFigma',
      color: 'from-purple-500 to-pink-500',
    },
  ];

  const categories = [
    { id: 'all', label: 'All Skills' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'styling', label: 'Styling' },
    { id: 'backend', label: 'Backend' },
    { id: 'database', label: 'Database' },
    { id: 'tools', label: 'Tools' },
  ];

  const filteredSkills = activeCategory === 'all' 
    ? displaySkills 
    : displaySkills.filter(skill => skill.category === activeCategory);

  return (
    <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-14 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12 sm:mb-10"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Technical <span className="text-emerald-400">Skills</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 mx-auto rounded-full mb-4" />
          <p className="text-gray-400 max-w-2xl mx-auto">
            My expertise across various technologies and frameworks
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 md:mb-16 sm:mb-12 mb-10"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`relative px-6 py-2 cursor-pointer rounded-full font-medium transition-all overflow-hidden group ${
                activeCategory === category.id
                  ? 'text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {/* Background */}
              <div className={`absolute inset-0 transition-opacity ${
                activeCategory === category.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`}>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-cyan-500" />
                <div className="absolute inset-[2px] bg-slate-900 rounded-full" />
              </div>
              
              {/* Border for active state */}
              {activeCategory === category.id && (
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full" />
              )}
              
              {/* Content */}
              <span className="relative z-10">{category.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {filteredSkills.map((skill: any, index: number) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              layout
            >
              <GradientBorderCard className="h-full group">
                <div className="p-8 flex flex-col items-center justify-center text-center gap-4">
                  {/* Icon */}
                  <motion.div
                    initial={{ scale: 0.7 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                    className="text-cyan-400 [&_svg]:size-12 sm:[&_svg]:size-16 group-hover:scale-110 transition-transform duration-300"
                  >
                    {(() => {
                      const IconComponent = iconMap[skill.icon] || IconBolt;
                      return <IconComponent />;
                    })()}
                  </motion.div>
                  
                  {/* Name */}
                  <h3 className="font-bold text-base sm:text-lg text-white group-hover:text-cyan-400 transition-colors">
                    {skill.name}
                  </h3>
                </div>
              </GradientBorderCard>
            </motion.div>
          ))}
        </div>

        {/* Additional Technologies */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <h3 className="text-center text-xl font-bold mb-6 text-gray-300">Also proficient in</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {(proficientIn && proficientIn.length > 0 ? proficientIn : ['Redux', 'GraphQL', 'Jest', 'Webpack', 'Prisma', 'AWS', 'Vercel', 'CI/CD']).map((tech, index) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + index * 0.05 }}
                className="relative cursor-pointer group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative px-5 py-2 bg-white/5 border border-white/10 rounded-full hover:border-emerald-500/50 transition-all">
                  {tech}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}