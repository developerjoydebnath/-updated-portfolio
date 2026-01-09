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
    IconDeviceFloppy,
    IconDeviceMobile,
    IconEdit,
    IconExternalLink,
    IconFileCode,
    IconHash,
    IconHexagon,
    IconLayersIntersect,
    IconLetterC,
    IconPackage,
    IconPalette,
    IconPlus,
    IconRefresh,
    IconSearch,
    IconServer,
    IconShieldCheck,
    IconTerminal2,
    IconTrash,
    IconWind,
    IconWorld,
    IconX
} from '@tabler/icons-react';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { addSkill, deleteSkill, updateSkill } from '../api';
import { AppState, SkillItem } from '../types';

interface SkillsManagerProps {
  data: AppState;
  onUpdate: (newData: Partial<AppState>) => void;
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

const SkillsManager: React.FC<SkillsManagerProps> = ({ data, onUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<SkillItem | null>(null);
  const [formData, setFormData] = useState<Partial<SkillItem>>({
    name: '',
    category: 'Frontend',
    icon: 'IconCode'
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = 'Skill name is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;
    
    const promise = async () => {
      let newSkills = [...data.skills];
      if (editingSkill) {
        const updatedSkill = await updateSkill(editingSkill._id, formData);
        newSkills = newSkills.map(s => s._id === editingSkill._id ? updatedSkill : s);
      } else {
        const newSkill = await addSkill(formData);
        newSkills.push(newSkill);
      }
      onUpdate({ skills: newSkills });
      setIsModalOpen(false);
    };

    toast.promise(promise(), {
      loading: 'Saving skill...',
      success: 'Skill saved successfully!',
      error: 'Failed to save skill'
    });
  };

  const categories = ['Frontend', 'Backend', 'Database', 'Tools', 'Styling'];
  const availableIcons = Object.keys(iconMap);

  return (
    <div className="space-y-8 pb-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Technical Skills</h1>
          <p className="text-gray-400">Manage the technologies you've mastered and their proficiency levels.</p>
        </div>
        <button 
          onClick={() => {
            setEditingSkill(null);
            setFormData({ name: '', category: 'Frontend', icon: 'IconCode' });
            setErrors({});
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-cyan-500/20"
        >
          <IconPlus size={18} />
          Add Skill
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {categories.map(cat => {
          const catSkills = data.skills.filter(s => s.category === cat);
          if (catSkills.length === 0) return null;
          return (
            <div key={cat} className="bg-[#0a0a1a] rounded-2xl border border-gray-800 p-6 space-y-6">
              <h3 className="font-bold text-cyan-400 flex items-center gap-2 uppercase tracking-widest text-sm">
                <IconLayersIntersect size={16} />
                {cat}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {catSkills.map(skill => {
                  const IconComponent = iconMap[skill.icon || ''] || IconLayersIntersect;
                  return (
                    <div key={skill._id} className="group relative bg-gray-900/30 p-6 rounded-2xl border border-gray-800/50 flex flex-col items-center justify-center gap-4 hover:border-cyan-500/50 transition-all">
                      <div className="w-12 h-12 rounded-xl bg-gray-800 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                        <IconComponent size={24} />
                      </div>
                      <span className="font-bold text-white text-sm text-center">{skill.name}</span>
                      
                      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => {
                            setEditingSkill(skill);
                            setFormData(skill);
                            setErrors({});
                            setIsModalOpen(true);
                          }}
                          className="p-1.5 text-gray-500 hover:text-white"
                          title="Edit Skill"
                        >
                          <IconEdit size={16} />
                        </button>
                          <button 
                            onClick={() => {
                              if (window.confirm('Delete skill?')) {
                                toast.promise(deleteSkill(skill._id), {
                                  loading: 'Deleting skill...',
                                  success: () => {
                                    onUpdate({ skills: data.skills.filter(s => s._id !== skill._id) });
                                    return 'Skill deleted successfully!';
                                  },
                                  error: 'Failed to delete skill'
                                });
                              }
                            }}
                            className="p-1.5 text-gray-500 hover:text-red-500"
                            title="Delete Skill"
                          >
                            <IconTrash size={16} />
                          </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80" onClick={() => setIsModalOpen(false)} />
          <div className="relative bg-[#0a0a1a] w-full max-w-md rounded-3xl border border-gray-800 overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-gray-800 bg-gray-900/50 flex justify-between items-center">
              <h2 className="text-xl font-bold">{editingSkill ? 'Edit Skill' : 'New Skill'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white"><IconX size={24} /></button>
            </div>
            <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Skill Name</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: '' });
                  }}
                  className={`w-full bg-gray-900 border ${errors.name ? 'border-red-500' : 'border-gray-800'} rounded-xl px-4 py-3 focus:border-cyan-500 focus:outline-none`}
                  placeholder="e.g. React"
                />
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Category</label>
                <select 
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                  className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 focus:border-cyan-500 focus:outline-none"
                >
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Icon</label>
                <div className="grid grid-cols-6 gap-3">
                  {availableIcons.map(icon => {
                    const IconComp = iconMap[icon] || IconLayersIntersect;
                    return (
                      <button 
                        key={icon}
                        onClick={() => setFormData({ ...formData, icon })}
                        className={`p-3 rounded-xl border-2 transition-all flex items-center justify-center ${
                          formData.icon === icon ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400' : 'border-gray-800 text-gray-500 hover:border-gray-700'
                        }`}
                        title={icon}
                      >
                        <IconComp size={20} />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-800 bg-gray-900/50 flex justify-end gap-4">
              <button onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 rounded-xl font-bold text-gray-400">Cancel</button>
              <button onClick={handleSave} className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2">
                <IconDeviceFloppy size={18} />
                Save Skill
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillsManager;
