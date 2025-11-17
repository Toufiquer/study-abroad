import { defaultData as sectionData1, ISectionData as ISectionData1 } from '@/components/all-section/section-1/data';
import { defaultData as sectionData2, ISectionData as ISectionData2 } from '@/components/all-section/section-2/data';
import { defaultData as sectionData3, ISectionData as ISectionData3 } from '@/components/all-section/section-3/data';
import { defaultData as sectionData4, ISectionData as ISectionData4 } from '@/components/all-section/section-4/data';
import { defaultData as sectionData5, ISectionData as ISectionData5 } from '@/components/all-section/section-5/data';
import { defaultData as sectionData6, ISectionData as ISectionData6 } from '@/components/all-section/section-6/data';

export type SectioinDataType = ISectionData1 | ISectionData2 | ISectionData3 | ISectionData4 | ISectionData5 | ISectionData6;

export interface SectionData {
  _id: string;
  sectionUid: string;
  title: string;
  content: SectioinDataType;
  isActive: boolean;
  picture: string;
  serialNo: number;
}
export interface IDefaltFullPageData {
  _id: string;
  pageTitle: string;
  pagePath: string;
  content: SectionData[];
  subPage: {
    _id: string;
    pageTitle: string;
    pagePath: string;
    isActive: boolean;
    content: SectionData[];
  }[];
  isActive: boolean;
}

export const initialSectionData: SectionData[] = [
  {
    _id: sectionData1.sectionUid,
    title: sectionData1.title,
    sectionUid: sectionData1.sectionUid,
    content: sectionData1,
    isActive: true,
    serialNo: 1,
    picture: '/all-section/section-1.png',
  },
  {
    serialNo: 2,
    _id: sectionData2.sectionUid,
    title: sectionData2.title,
    sectionUid: sectionData2.sectionUid,
    content: sectionData2,
    isActive: false,
    picture: '/all-section/section-2.png',
  },
  {
    serialNo: 3,
    _id: sectionData3.sectionUid,
    title: sectionData3.title,
    sectionUid: sectionData3.sectionUid,
    content: sectionData3,
    isActive: false,
    picture: '/all-section/section-3.png',
  },
  {
    serialNo: 4,
    _id: sectionData4.sectionUid,
    title: sectionData4.title,
    sectionUid: sectionData4.sectionUid,
    content: sectionData4,
    isActive: false,
    picture: '/all-section/section-4.png',
  },
  {
    serialNo: 5,
    _id: sectionData5.sectionUid,
    title: sectionData5.title,
    sectionUid: sectionData5.sectionUid,
    content: sectionData5,
    isActive: false,
    picture: '/all-section/section-5.png',
  },
  {
    serialNo: 6,
    _id: sectionData6.sectionUid,
    title: sectionData6.title,
    sectionUid: sectionData6.sectionUid,
    content: sectionData6,
    isActive: false,
    picture: '/all-section/section-6.png',
  },
];
