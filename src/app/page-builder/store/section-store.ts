import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { SectionData } from './data-index';

interface SectionStore {
  sectionList: SectionData[];
  addSection: (section: SectionData) => void;
  removeSection: (id: string) => void;
  updateSection: (id: string, updatedSection: SectionData) => void;
  toggleActive: (id: string) => void;
  reorderSections: (oldIndex: number, newIndex: number) => void;
  setSections: (sections: SectionData[]) => void;
}

export const useSectionStore = create<SectionStore>()(
  persist(
    set => ({
      sectionList: [],

      addSection: section =>
        set(state => ({
          sectionList: [...state.sectionList, section],
        })),

      removeSection: id =>
        set(state => ({
          sectionList: state.sectionList.filter(s => s._id !== id),
        })),

      updateSection: (id, updatedSection) =>
        set(state => ({
          sectionList: state.sectionList.map(s => (s._id === id ? updatedSection : s)),
        })),

      toggleActive: id =>
        set(state => ({
          sectionList: state.sectionList.map(s => (s._id === id ? { ...s, isActive: !s.isActive } : s)),
        })),

      reorderSections: (oldIndex, newIndex) =>
        set(state => {
          const newList = [...state.sectionList];
          const [removed] = newList.splice(oldIndex, 1);
          newList.splice(newIndex, 0, removed);
          return { sectionList: newList };
        }),

      setSections: sections => set({ sectionList: sections }),
    }),
    {
      name: 'section-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
